import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

import { createBatch } from "../services/batchApi";
import { getTeachers } from "../../auth/services/authService";

const CreateBatch = () => {
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        batchName: "",
        courseName: "",
        description: "",
        startDate: "",
        endDate: "",
        fees: "",
        capacity: "",
        teacherId: ""
    });

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await getTeachers();
            setTeachers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            await createBatch(formData);
            alert("Batch Created Successfully");
        } catch (error) {
            console.log(error);
            alert("Error Creating Batch");
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Create Batch</h2>
                    <p>Set up a new batch and assign a teacher</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-premium btn-outline" onClick={() => navigate("/batches")}>
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>
            </div>

            {/* Form Card */}
            <div className="premium-form-card">
                <div className="premium-form-grid">
                    <div className="premium-form-group">
                        <label className="premium-label">Batch Name</label>
                        <input
                            type="text"
                            name="batchName"
                            placeholder="Enter batch name"
                            className="premium-input"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="premium-form-group">
                        <label className="premium-label">Course Name</label>
                        <input
                            type="text"
                            name="courseName"
                            placeholder="Enter course name"
                            className="premium-input"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="premium-form-group">
                    <label className="premium-label">Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe this batch..."
                        className="premium-textarea"
                        onChange={handleChange}
                    />
                </div>

                <div className="premium-form-grid">
                    <div className="premium-form-group">
                        <label className="premium-label">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            className="premium-input"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="premium-form-group">
                        <label className="premium-label">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            className="premium-input"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="premium-form-grid">
                    <div className="premium-form-group">
                        <label className="premium-label">Fees</label>
                        <input
                            type="number"
                            name="fees"
                            placeholder="e.g. 4999"
                            className="premium-input"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="premium-form-group">
                        <label className="premium-label">Capacity</label>
                        <input
                            type="number"
                            name="capacity"
                            placeholder="e.g. 30"
                            className="premium-input"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="premium-form-group">
                    <label className="premium-label">Assign Teacher</label>
                    <select
                        name="teacherId"
                        className="premium-input"
                        onChange={handleChange}
                    >
                        <option value="">Select Teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="premium-form-actions">
                    <button className="btn-premium btn-filled" onClick={handleSubmit}>
                        <Save size={16} /> Create Batch
                    </button>
                    <button className="btn-premium btn-outline" onClick={() => navigate("/batches")}>
                        Cancel
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CreateBatch;