import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

import { createCourse } from "../services/courseApi";

const CreateCourse = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail: "",
        price: "",
        durationInMonths: ""
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            await createCourse(formData);
            alert("Course Created Successfully");
            setFormData({
                title: "",
                description: "",
                thumbnail: "",
                price: "",
                durationInMonths: ""
            });
        } catch (error) {
            console.log(error);
            alert("Error Creating Course");
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Create Course</h2>
                    <p>Set up a new course for your students</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-premium btn-outline" onClick={() => navigate("/courses")}>
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>
            </div>

            {/* Form Card */}
            <div className="premium-form-card">
                <div className="premium-form-group">
                    <label className="premium-label">Course Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter course title"
                        className="premium-input"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="premium-form-group">
                    <label className="premium-label">Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe the course..."
                        className="premium-textarea"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="premium-form-group">
                    <label className="premium-label">Thumbnail URL</label>
                    <input
                        type="text"
                        name="thumbnail"
                        placeholder="Enter thumbnail URL"
                        className="premium-input"
                        value={formData.thumbnail}
                        onChange={handleChange}
                    />
                </div>

                <div className="premium-form-grid">
                    <div className="premium-form-group">
                        <label className="premium-label">Course Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="e.g. 4999"
                            className="premium-input"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="premium-form-group">
                        <label className="premium-label">Duration (Months)</label>
                        <input
                            type="number"
                            name="durationInMonths"
                            placeholder="e.g. 6"
                            className="premium-input"
                            value={formData.durationInMonths}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="premium-form-actions">
                    <button className="btn-premium btn-filled" onClick={handleSubmit}>
                        <Save size={16} /> Create Course
                    </button>
                    <button className="btn-premium btn-outline" onClick={() => navigate("/courses")}>
                        Cancel
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CreateCourse;