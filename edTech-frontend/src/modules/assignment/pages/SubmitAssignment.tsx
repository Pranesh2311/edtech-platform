import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";

import { submitAssignment } from "../services/assignmentApi";

const SubmitAssignment = () => {
    const { assignmentId } = useParams();
    const navigate = useNavigate();

    const studentId = localStorage.getItem("userId");
    const [answerFileUrl, setAnswerFileUrl] = useState("");

    const handleSubmit = async () => {
        try {
            await submitAssignment({
                assignmentId: Number(assignmentId),
                studentId: Number(studentId),
                answerFileUrl,
                submitted: true
            });
            alert("Assignment Submitted");
        } catch (error) {
            console.log(error);
            alert("Error Submitting");
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Submit Assignment</h2>
                    <p>Upload your answer file URL to submit</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-premium btn-outline" onClick={() => navigate(-1)}>
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>
            </div>

            {/* Form Card */}
            <div className="premium-form-card" style={{ maxWidth: '600px' }}>
                <div className="premium-form-group">
                    <label className="premium-label">Answer File URL</label>
                    <input
                        type="text"
                        placeholder="Enter your answer file URL"
                        className="premium-input"
                        value={answerFileUrl}
                        onChange={(e) => setAnswerFileUrl(e.target.value)}
                    />
                </div>

                <div className="premium-form-actions">
                    <button className="btn-premium btn-filled" onClick={handleSubmit}>
                        <Send size={16} /> Submit Assignment
                    </button>
                    <button className="btn-premium btn-outline" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default SubmitAssignment;