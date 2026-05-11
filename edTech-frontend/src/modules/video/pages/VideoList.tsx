import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Play, Trash2, ToggleLeft, Video as VideoIcon, Clock } from "lucide-react";
import { deleteVideo, getAllVideos, searchVideos, toggleVideoStatus } from "../services/videoApi";

const VideoList = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [videos, setVideos] = useState<any[]>([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => { fetchVideos(); }, []);

    const fetchVideos = async () => {
        const res = await getAllVideos(); setVideos(res.data);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Delete this video?")) {
            await deleteVideo(id); fetchVideos();
        }
    };
    const handleToggle = async (id: number) => { await toggleVideoStatus(id); fetchVideos(); };
    const handleSearch = async () => {
        if (keyword.trim() === "") { fetchVideos(); return; }
        const res = await searchVideos(keyword); setVideos(res.data);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Video Library</h2>
                    <p>{videos.length} video{videos.length !== 1 ? 's' : ''} available</p>
                </div>
                <div className="page-header-actions">
                    {(role === "ADMIN" || role === "TEACHER") && (
                        <button className="btn-premium btn-filled" onClick={() => navigate("/create-video")}>
                            <Plus size={16} /> Upload Video
                        </button>
                    )}
                </div>
            </div>

            <div className="search-filter-bar">
                <div className="search-field">
                    <Search size={16} />
                    <input type="text" placeholder="Search videos..." value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                </div>
                <button className="btn-premium btn-outline" onClick={handleSearch}>Search</button>
            </div>

            {videos.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
                    {videos.map(video => (
                        <motion.div
                            key={video.id}
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-primary)',
                                borderRadius: 'var(--radius-xl)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                            whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
                            onClick={() => navigate(`/watch-video/${video.id}`, { state: video })}
                        >
                            <div style={{ position: 'relative', height: 180, background: 'var(--bg-tertiary)' }}>
                                {video.thumbnailUrl ? (
                                    <img src={video.thumbnailUrl} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
                                        <VideoIcon size={36} />
                                    </div>
                                )}
                                <div style={{
                                    position: 'absolute', bottom: 10, right: 10,
                                    background: 'rgba(0,0,0,0.75)', color: 'white',
                                    padding: '3px 10px', borderRadius: 'var(--radius-sm)',
                                    fontSize: '12px', fontWeight: 500,
                                    display: 'flex', alignItems: 'center', gap: '4px'
                                }}>
                                    <Clock size={12} /> {video.duration} min
                                </div>
                                <div style={{
                                    position: 'absolute', top: 10, right: 10,
                                }}>
                                    <span className={`status-badge ${video.active ? 'success' : 'danger'}`}>
                                        {video.active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                            <div style={{ padding: 'var(--space-4)' }}>
                                <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {video.title}
                                </h3>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)', margin: '0 0 var(--space-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {video.description || 'No description'}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                                        {video.batchName}
                                    </span>
                                    <div style={{ display: 'flex', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
                                        <button className="btn-premium btn-filled btn-sm" onClick={() => navigate(`/watch-video/${video.id}`, { state: video })}>
                                            <Play size={12} /> Watch
                                        </button>
                                        {(role === "ADMIN" || role === "TEACHER") && (
                                            <>
                                                <button className="btn-premium btn-outline btn-sm" onClick={() => handleToggle(video.id)}>
                                                    <ToggleLeft size={13} />
                                                </button>
                                                <button className="btn-premium btn-danger btn-sm" onClick={() => handleDelete(video.id)}>
                                                    <Trash2 size={13} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon"><VideoIcon size={28} /></div>
                    <div className="empty-state-title">No videos yet</div>
                    <div className="empty-state-desc">Upload your first video to get started</div>
                </div>
            )}
        </motion.div>
    );
};

export default VideoList;