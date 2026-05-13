import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

import { getBatchById, updateBatch } from "../services/batchApi";
import { getTeachers } from "../../auth/services/authService";

const EditBatch = () => {
    const navigate = useNavigate();
    const { id } = useParams();

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
        fetchBatch();
        fetchTeachers();
    }, []);

    const fetchBatch = async () => {
        try {
            const response = await getBatchById(Number(id));
            setFormData({
                batchName: response.data.batchName,
                courseName: response.data.courseName,
                description: response.data.description,
                startDate: response.data.startDate,
                endDate: response.data.endDate,
                fees: response.data.fees,
                capacity: response.data.capacity,
                teacherId: response.data.teacherId
            });
        } catch (error) {
            console.log(error);
        }
    };

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
            await updateBatch(Number(id), formData);
            alert("Batch Updated Successfully");
            navigate("/batches");
        } catch (error) {
            console.log(error);
            alert("Error Updating Batch");
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Edit Batch</h2>
                    <p>Modify the batch details below</p>
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
                            value={formData.batchName}
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
                            value={formData.courseName}
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
                        value={formData.description}
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
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="premium-form-group">
                        <label className="premium-label">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            className="premium-input"
                            value={formData.endDate}
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
                            value={formData.fees}
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
                            value={formData.capacity}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="premium-form-group">
                    <label className="premium-label">Assign Teacher</label>
                    <select
                        name="teacherId"
                        className="premium-input"
                        value={formData.teacherId}
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
                        <Save size={16} /> Update Batch
                    </button>
                    <button className="btn-premium btn-outline" onClick={() => navigate("/batches")}>
                        Cancel
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default EditBatch;