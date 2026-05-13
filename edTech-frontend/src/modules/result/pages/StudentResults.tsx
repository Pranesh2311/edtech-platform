import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ClipboardList } from "lucide-react";

import axios from "../../../services/axiosConfig";

const StudentResults = () => {
    const [email, setEmail] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const searchResults = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/results/student/${email}`
            );
            setResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            searchResults();
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Student Results</h2>
                    <p>{results.length} result{results.length !== 1 ? 's' : ''} found</p>
                </div>
            </div>

            {/* Search */}
            <div className="search-filter-bar" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="search-field" style={{ flex: 1 }}>
                    <Search size={16} />
                    <input
                        type="email"
                        placeholder="Enter student email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <button className="btn-premium btn-filled" onClick={searchResults}>
                    Search
                </button>
            </div>

            {/* Table */}
            {results.length > 0 ? (
                <div className="premium-table-wrapper">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>#</th>
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
                                    <td style={{ fontWeight: 500 }}>{r.examId}</td>
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
                        Enter a student email above and press Search to view their results
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default StudentResults;