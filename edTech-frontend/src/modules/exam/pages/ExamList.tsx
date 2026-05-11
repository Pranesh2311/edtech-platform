import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Edit3, Trash2, HelpCircle, Play, Clock, Award } from "lucide-react";
import { getAllExams, deleteExam } from "../services/examService";

const ExamList = () => {
    const [exams, setExams] = useState<any[]>([]);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    useEffect(() => { fetchExams(); }, []);

    const fetchExams = async () => {
        try {
            const response = await getAllExams();
            setExams(response.data);
        } catch (error) { console.error(error); }
    };

    const handleDelete = async (id: string | number) => {
        if (window.confirm("Are you sure you want to delete this exam?")) {
            await deleteExam(id);
            fetchExams();
        }
    };

    const filtered = keyword.trim()
        ? exams.filter(e => e.title?.toLowerCase().includes(keyword.toLowerCase()))
        : exams;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Exams</h2>
                    <p>{exams.length} exam{exams.length !== 1 ? 's' : ''} total</p>
                </div>
                <div className="page-header-actions">
                    {(role === "ADMIN" || role === "TEACHER") && (
                        <button className="btn-premium btn-filled" onClick={() => navigate("/create")}>
                            <Plus size={16} /> Create Exam
                        </button>
                    )}
                </div>
            </div>

            {/* Search */}
            <div className="search-filter-bar">
                <div className="search-field">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search exams..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            {filtered.length > 0 ? (
                <div className="premium-table-wrapper">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Duration</th>
                                <th>Total Marks</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((exam, index) => (
                                <tr key={exam.id}>
                                    <td>{index + 1}</td>
                                    <td style={{ fontWeight: 500 }}>{exam.title}</td>
                                    <td>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={14} style={{ color: 'var(--text-tertiary)' }} />
                                            {exam.duration} mins
                                        </span>
                                    </td>
                                    <td>{exam.totalMarks}</td>
                                    <td>
                                        <span className={`status-badge ${exam.active !== false ? 'success' : 'danger'}`}>
                                            {exam.active !== false ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            {(role === "ADMIN" || role === "TEACHER") && (
                                                <>
                                                    <button className="btn-premium btn-outline btn-sm" onClick={() => navigate(`/edit/${exam.id}`)}>
                                                        <Edit3 size={13} /> Edit
                                                    </button>
                                                    <button className="btn-premium btn-outline btn-sm" onClick={() => navigate(`/questions/${exam.id}`)}>
                                                        <HelpCircle size={13} /> Questions
                                                    </button>
                                                    <button className="btn-premium btn-danger btn-sm" onClick={() => handleDelete(exam.id)}>
                                                        <Trash2 size={13} />
                                                    </button>
                                                </>
                                            )}
                                            {(role === "STUDENT") && (
                                                <button className="btn-premium btn-filled btn-sm" onClick={() => navigate(`/attempt/${exam.id}`)}>
                                                    <Play size={13} /> Attempt
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
                    <div className="empty-state-icon"><Award size={28} /></div>
                    <div className="empty-state-title">No exams found</div>
                    <div className="empty-state-desc">
                        {(role === "ADMIN" || role === "TEACHER") ? "Create your first exam to get started" : "No exams available at the moment"}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ExamList;