import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

import { createDoubt } from "../services/doubtApi";
import { getAllBatches } from "../../batch/services/batchApi";

const CreateDoubt = () => {
    const [batches, setBatches] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        question: "",
        batchId: ""
    });

    const studentId = Number(localStorage.getItem("userId"));

    useEffect(() => {
        fetchBatches();
    }, []);

    const fetchBatches = async () => {
        const response = await getAllBatches();
        setBatches(response.data);
    };

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            await createDoubt({ ...formData, studentId });
            alert("Doubt Posted Successfully");
        } catch (error) {
            console.log(error);
            alert("Error Posting Doubt");
        }
    };

    const inputStyle = {
        width: '100%',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '11px 14px',
        fontSize: '14px',
        color: 'var(--text-primary)',
        outline: 'none',
        boxSizing: 'border-box' as const,
        marginBottom: '16px',
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Ask a Doubt</h2>
                    <p>Fill in the details below to post your doubt</p>
                </div>
            </div>

            {/* Form Card */}
            <div className="premium-card" style={{ padding: '28px 24px', maxWidth: '720px' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Doubt Details
                </p>

                <input
                    type="text"
                    name="title"
                    placeholder="Doubt Title"
                    onChange={handleChange}
                    style={inputStyle}
                />

                <textarea
                    name="question"
                    placeholder="Write your doubt in detail..."
                    rows={6}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: 'vertical' }}
                />

                <select
                    name="batchId"
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Batch</option>
                    {batches.map((batch) => (
                        <option key={batch.id} value={batch.id}>
                            {batch.batchName}
                        </option>
                    ))}
                </select>

                <button className="btn-premium btn-filled" onClick={handleSubmit}>
                    <Send size={14} /> Submit Doubt
                </button>
            </div>
        </motion.div>
    );
};

export default CreateDoubt;