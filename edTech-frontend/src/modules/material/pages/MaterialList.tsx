import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Trash2, BookOpen, FileText, Video } from "lucide-react";

import {
    deleteMaterial,
    getAllMaterials,
    searchMaterials
} from "../services/materialApi";

const MaterialList = () => {
    const [materials, setMaterials] = useState<any[]>([]);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await getAllMaterials();
            setMaterials(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await searchMaterials(keyword);
            setMaterials(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this material?")) {
            try {
                await deleteMaterial(id);
                fetchMaterials();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Study Materials</h2>
                    <p>{materials.length} material{materials.length !== 1 ? 's' : ''} total</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-premium btn-filled" onClick={() => navigate("/create-material")}>
                        <Plus size={16} /> Upload Material
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="search-filter-bar" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="search-field" style={{ flex: 1 }}>
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search materials..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <button className="btn-premium btn-filled" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {/* Table */}
            {materials.length > 0 ? (
                <div className="premium-table-wrapper">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Batch</th>
                                <th>Resources</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materials.map((material, index) => (
                                <tr key={material.id}>
                                    <td>{index + 1}</td>
                                    <td style={{ fontWeight: 500 }}>{material.title}</td>
                                    <td>
                                        <span className="status-badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                                            {material.materialType}
                                        </span>
                                    </td>
                                    <td>{material.batchName}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            {material.fileUrl && (
                                                <a href={material.fileUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--primary-color)', textDecoration: 'none', fontSize: '13px' }}>
                                                    <FileText size={14} /> File
                                                </a>
                                            )}
                                            {material.videoUrl && (
                                                <a href={material.videoUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--primary-color)', textDecoration: 'none', fontSize: '13px' }}>
                                                    <Video size={14} /> Video
                                                </a>
                                            )}
                                            {!material.fileUrl && !material.videoUrl && (
                                                <span style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>-</span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button className="btn-premium btn-danger btn-sm" onClick={() => handleDelete(material.id)}>
                                                <Trash2 size={13} /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon"><BookOpen size={28} /></div>
                    <div className="empty-state-title">No materials found</div>
                    <div className="empty-state-desc">
                        Upload your first study material to get started
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default MaterialList;