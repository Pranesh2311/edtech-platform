import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Trash2, FileText, Eye, Calendar, Award } from "lucide-react";
import { deleteAssignment, getAllAssignments, searchAssignments } from "../services/assignmentApi";

const AssignmentList = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [assignments, setAssignments] = useState<any[]>([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => { fetchAssignments(); }, []);

    const fetchAssignments = async () => {
        const res = await getAllAssignments(); setAssignments(res.data);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Delete this assignment?")) {
            await deleteAssignment(id); fetchAssignments();
        }
    };

    const handleSearch = async () => {
        if (keyword.trim() === "") { fetchAssignments(); return; }
        const res = await searchAssignments(keyword); setAssignments(res.data);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Assignments</h2>
                    <p>{assignments.length} assignment{assignments.length !== 1 ? 's' : ''} total</p>
                </div>
                <div className="page-header-actions">
                    {(role === "ADMIN" || role === "TEACHER") && (
                        <button className="btn-premium btn-filled" onClick={() => navigate("/create-assignment")}>
                            <Plus size={16} /> Create Assignment
                        </button>
                    )}
                </div>
            </div>

            <div className="search-filter-bar">
                <div className="search-field">
                    <Search size={16} />
                    <input type="text" placeholder="Search assignments..." value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                </div>
                <button className="btn-premium btn-outline" onClick={handleSearch}>Search</button>
            </div>

            {assignments.length > 0 ? (
                <div className="premium-table-wrapper">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Batch</th>
                                <th>Deadline</th>
                                <th>Max Marks</th>
                                <th>Submissions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((a, i) => (
                                <tr key={a.id}>
                                    <td>{i + 1}</td>
                                    <td style={{ fontWeight: 500 }}>{a.title}</td>
                                    <td>{a.batchName}</td>
                                    <td>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            <Calendar size={14} style={{ color: 'var(--text-tertiary)' }} />
                                            {a.deadline}
                                        </span>
                                    </td>
                                    <td>{a.maxMarks}</td>
                                    <td>
                                        <span className="status-badge info">{a.submissionCount}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            {(role === "ADMIN" || role === "TEACHER") && (
                                                <>
                                                    <button className="btn-premium btn-outline btn-sm" onClick={() => navigate(`/assignment-submissions/${a.id}`)}>
                                                        <Eye size={13} /> Submissions
                                                    </button>
                                                    <button className="btn-premium btn-danger btn-sm" onClick={() => handleDelete(a.id)}>
                                                        <Trash2 size={13} />
                                                    </button>
                                                </>
                                            )}
                                            {role === "STUDENT" && (
                                                <button className="btn-premium btn-filled btn-sm" onClick={() => navigate(`/submit-assignment/${a.id}`)}>
                                                    <FileText size={13} /> Submit
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon"><FileText size={28} /></div>
                    <div className="empty-state-title">No assignments yet</div>
                    <div className="empty-state-desc">Create your first assignment</div>
                </div>
            )}
        </motion.div>
    );
};

export default AssignmentList;