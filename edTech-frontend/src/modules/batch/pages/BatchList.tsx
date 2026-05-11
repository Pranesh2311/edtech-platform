import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Edit3, Trash2, ToggleLeft, Users as UsersIcon, UserPlus } from "lucide-react";
import { getAllBatches, deleteBatch, searchBatches, toggleBatchStatus } from "../services/batchApi";

const BatchList = () => {
    const navigate = useNavigate();
    const [batches, setBatches] = useState<any[]>([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => { fetchBatches(); }, []);

    const fetchBatches = async () => {
        try { const res = await getAllBatches(); setBatches(res.data); } catch (e) { console.log(e); }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Delete this batch?")) {
            await deleteBatch(id); fetchBatches();
        }
    };

    const handleSearch = async () => {
        if (keyword.trim() === "") { fetchBatches(); return; }
        try { const res = await searchBatches(keyword); setBatches(res.data); } catch (e) { console.log(e); }
    };

    const handleToggle = async (id: number) => {
        await toggleBatchStatus(id); fetchBatches();
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Batches</h2>
                    <p>{batches.length} batch{batches.length !== 1 ? 'es' : ''} total</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-premium btn-filled" onClick={() => navigate("/create-batch")}>
                        <Plus size={16} /> Create Batch
                    </button>
                </div>
            </div>

            <div className="search-filter-bar">
                <div className="search-field">
                    <Search size={16} />
                    <input type="text" placeholder="Search batches..." value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                </div>
                <button className="btn-premium btn-outline" onClick={handleSearch}>Search</button>
            </div>

            {batches.length > 0 ? (
                <div className="premium-table-wrapper">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Batch Name</th>
                                <th>Course</th>
                                <th>Teacher</th>
                                <th>Fees</th>
                                <th>Students</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches.map((batch, i) => (
                                <tr key={batch.id}>
                                    <td>{i + 1}</td>
                                    <td style={{ fontWeight: 500 }}>{batch.batchName}</td>
                                    <td>{batch.courseName}</td>
                                    <td>{batch.teacherName}</td>
                                    <td>₹{batch.fees}</td>
                                    <td>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            <UsersIcon size={14} style={{ color: 'var(--text-tertiary)' }} />
                                            {batch.studentCount}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${batch.active ? 'success' : 'danger'}`}>
                                            {batch.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button className="btn-premium btn-outline btn-sm" onClick={() => navigate(`/edit-batch/${batch.id}`)}>
                                                <Edit3 size={13} />
                                            </button>
                                            <button className="btn-premium btn-outline btn-sm" onClick={() => navigate(`/batch-students/${batch.id}`)}>
                                                <UserPlus size={13} />
                                            </button>
                                            <button className="btn-premium btn-outline btn-sm" onClick={() => handleToggle(batch.id)}>
                                                <ToggleLeft size={13} />
                                            </button>
                                            <button className="btn-premium btn-danger btn-sm" onClick={() => handleDelete(batch.id)}>
                                                <Trash2 size={13} />
                                            </button>

                                            <button className="btn btn-success btn-sm me-2"
                                                onClick={() => navigate("/buy-batch", { state: batch })}>Buy
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
                    <div className="empty-state-icon"><UsersIcon size={28} /></div>
                    <div className="empty-state-title">No batches yet</div>
                    <div className="empty-state-desc">Create your first batch to organize students</div>
                </div>
            )}
        </motion.div>
    );
};

export default BatchList;