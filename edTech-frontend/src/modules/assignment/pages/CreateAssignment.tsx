import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

import { createAssignment } from "../services/assignmentApi";
import { getAllBatches } from "../../batch/services/batchApi";

const CreateAssignment = () => {
    const navigate = useNavigate();

    const [batches, setBatches] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignmentFileUrl: "",
        deadline: "",
        maxMarks: "",
        batchId: ""
    });

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
            await createAssignment(formData);
            alert("Assignment Created");
        } catch (error) {
            console.log(error);
            alert("Error Creating Assignment");
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Create Assignment</h2>
                    <p>Set up a new assignment for your batch</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-premium btn-outline" onClick={() => navigate(-1)}>
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>
            </div>

            {/* Form Card */}
            <div className="premium-form-card">
                <div className="premium-form-group">
                    <label className="premium-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter assignment title"
                        className="premium-input"
                        onChange={handleChange}
                    />
                </div>

                <div className="premium-form-group">
                    <label className="premium-label">Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe the assignment..."
                        className="premium-textarea"
                        onChange={handleChange}
                    />
                </div>

                <div className="premium-form-group">
                    <label className="premium-label">Assignment PDF URL</label>
                    <input
                        type="text"
                        name="assignmentFileUrl"
                        placeholder="Enter file URL"
                        className="premium-input"
                        onChange={handleChange}
                    />
                </div>

                <div className="premium-form-grid">
                    <div className="premium-form-group">
                        <label className="premium-label">Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            className="premium-input"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="premium-form-group">
                        <label className="premium-label">Max Marks</label>
                        <input
                            type="number"
                            name="maxMarks"
                            placeholder="e.g. 100"
                            className="premium-input"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="premium-form-group">
                    <label className="premium-label">Batch</label>
                    <select
                        name="batchId"
                        className="premium-input"
                        onChange={handleChange}
                    >
                        <option value="">Select Batch</option>
                        {batches.map(batch => (
                            <option key={batch.id} value={batch.id}>
                                {batch.batchName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="premium-form-actions">
                    <button className="btn-premium btn-filled" onClick={handleSubmit}>
                        <Save size={16} /> Create Assignment
                    </button>
                    <button className="btn-premium btn-outline" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CreateAssignment;