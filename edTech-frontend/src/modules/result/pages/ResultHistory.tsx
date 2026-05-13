import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

import axios from "../../../services/axiosConfig";

const ResultHistory = () => {
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        loadResults();
    }, []);

    const loadResults = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/results"
            );
            setResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Result History</h2>
                    <p>{results.length} result{results.length !== 1 ? 's' : ''} total</p>
                </div>
            </div>

            {/* Table */}
            {results.length > 0 ? (
                <div className="premium-table-wrapper">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Exam ID</th>
                                <th>Correct Answers</th>
                                <th>Total Questions</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((r, index) => (
                                <tr key={r.id}>
                                    <td>{index + 1}</td>
                                    <td style={{ fontWeight: 500 }}>{r.studentName}</td>
                                    <td>{r.studentEmail}</td>
                                    <td>{r.examId}</td>
                                    <td>{r.correctAnswers}</td>
                                    <td>{r.totalQuestions}</td>
                                    <td>
                                        <span className="status-badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                                            {r.score}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon"><ClipboardList size={28} /></div>
                    <div className="empty-state-title">No results found</div>
                    <div className="empty-state-desc">
                        Results will appear here once students complete their exams
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ResultHistory;