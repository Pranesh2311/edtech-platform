import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, CheckCircle, Clock, ClipboardList } from "lucide-react";

import { getAssignmentSubmissions } from "../services/assignmentApi";

const ViewSubmissions = () => {
    const { assignmentId } = useParams();
    const [submissions, setSubmissions] = useState<any[]>([]);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        const response = await getAssignmentSubmissions(Number(assignmentId));
        setSubmissions(response.data);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Assignment Submissions</h2>
                    <p>{submissions.length} submission{submissions.length !== 1 ? 's' : ''} received</p>
                </div>
            </div>

            {/* Table */}
            {submissions.length > 0 ? (
                <div className="premium-table-wrapper">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student</th>
                                <th>Answer File</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((s, index) => (
                                <tr key={s.id}>
                                    <td>{index + 1}</td>
                                    <td style={{ fontWeight: 500 }}>{s.studentName}</td>
                                    <td>
                                        
                                            href={s.answerFileUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--primary-color)', textDecoration: 'none', fontSize: '13px' }}
                                        <a>
                                            <FileText size={13} /> View File
                                        </a>
                                    </td>
                                    <td>
                                        {s.submitted ? (
                                            <span className="status-badge" style={{ background: 'rgba(34,197,94,0.12)', color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                <CheckCircle size={12} /> Submitted
                                            </span>
                                        ) : (
                                            <span className="status-badge" style={{ background: 'rgba(234,179,8,0.12)', color: '#ca8a04', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                <Clock size={12} /> Pending
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon"><ClipboardList size={28} /></div>
                    <div className="empty-state-title">No submissions yet</div>
                    <div className="empty-state-desc">
                        Student submissions will appear here once they submit their answers
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ViewSubmissions;