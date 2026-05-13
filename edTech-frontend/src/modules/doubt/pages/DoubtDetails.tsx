import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, CheckCircle, MessageCircle, User } from "lucide-react";

import { getReplies, replyDoubt, markSolved } from "../services/doubtApi";

const DoubtDetails = () => {
    const { id } = useParams();

    const [replies, setReplies] = useState<any[]>([]);
    const [reply, setReply] = useState("");

    const userId = Number(localStorage.getItem("userId"));

    useEffect(() => {
        fetchReplies();
    }, []);

    const fetchReplies = async () => {
        const response = await getReplies(Number(id));
        setReplies(response.data);
    };

    const handleReply = async () => {
        await replyDoubt(Number(id), { reply, userId });
        setReply("");
        fetchReplies();
    };

    const handleSolved = async () => {
        await markSolved(Number(id));
        alert("Marked Solved");
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Discussion</h2>
                    <p>{replies.length} repl{replies.length !== 1 ? 'ies' : 'y'}</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-premium btn-filled" onClick={handleSolved}>
                        <CheckCircle size={16} /> Mark Solved
                    </button>
                </div>
            </div>

            {/* Reply Box */}
            <div className="premium-card" style={{ padding: '24px', marginBottom: '24px' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Write a Reply
                </p>
                <textarea
                    rows={4}
                    placeholder="Write your reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    style={{
                        width: '100%',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        fontSize: '14px',
                        color: 'var(--text-primary)',
                        resize: 'vertical',
                        outline: 'none',
                        marginBottom: '14px',
                        boxSizing: 'border-box',
                    }}
                />
                <button className="btn-premium btn-filled" onClick={handleReply}>
                    <Send size={14} /> Reply
                </button>
            </div>

            {/* Replies List */}
            {replies.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {replies.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="premium-card"
                            style={{ padding: '18px 24px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={14} color="var(--text-secondary)" />
                                </div>
                                <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
                                    {item.user?.fullName}
                                </span>
                            </div>
                            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                {item.reply}
                            </p>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon"><MessageCircle size={28} /></div>
                    <div className="empty-state-title">No replies yet</div>
                    <div className="empty-state-desc">Be the first to reply to this doubt</div>
                </div>
            )}
        </motion.div>
    );
};

export default DoubtDetails;