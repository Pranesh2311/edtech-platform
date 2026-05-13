import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, MessageCircle, CheckCircle, Clock } from "lucide-react";

import { getAllDoubts } from "../services/doubtApi";

const DoubtList = () => {
    const navigate = useNavigate();
    const [doubts, setDoubts] = useState<any[]>([]);

    useEffect(() => {
        fetchDoubts();
    }, []);

    const fetchDoubts = async () => {
        try {
            const response = await getAllDoubts();
            console.log(response.data);

            if (Array.isArray(response.data)) {
                setDoubts(response.data);
            } else {
                setDoubts([]);
            }
        } catch (error) {
            console.log(error);
            setDoubts([]);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Doubts</h2>
                    <p>{doubts.length} doubt{doubts.length !== 1 ? 's' : ''} total</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-premium btn-filled" onClick={() => navigate("/create-doubt")}>
                        <Plus size={16} /> Ask Doubt
                    </button>
                </div>
            </div>

            {/* Doubt Cards */}
            {Array.isArray(doubts) && doubts.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {doubts.map((doubt) => (
                        <motion.div
                            key={doubt.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="premium-card"
                            style={{ padding: '20px 24px' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <h5 style={{ margin: 0, fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>
                                    {doubt.title}
                                </h5>
                                {doubt.solved ? (
                                    <span className="status-badge" style={{ background: 'rgba(34,197,94,0.12)', color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                        <CheckCircle size={12} /> Solved
                                    </span>
                                ) : (
                                    <span className="status-badge" style={{ background: 'rgba(234,179,8,0.12)', color: '#ca8a04', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                        <Clock size={12} /> Pending
                                    </span>
                                )}
                            </div>

                            <p style={{ margin: '0 0 16px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                {doubt.question}
                            </p>

                            <button
                                className="btn-premium btn-outlined btn-sm"
                                onClick={() => navigate(`/doubts/${doubt.id}`)}
                            >
                                <MessageCircle size={13} /> View Discussion
                            </button>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon"><MessageCircle size={28} /></div>
                    <div className="empty-state-title">No doubts posted yet</div>
                    <div className="empty-state-desc">
                        Ask your first doubt and get help from your peers and instructors
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default DoubtList;