import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import { createExam, getExamById, updateExam } from "../services/examService";

const ExamForm = () => {
    const [exam, setExam] = useState({
        title: "", description: "", duration: "",
        totalMarks: "", active: true, startTime: "", endTime: ""
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) loadExam(id);
    }, [id]);

    const loadExam = async (examId: string) => {
        try {
            const response = await getExamById(examId);
            setExam(response.data);
        } catch (error) { console.error(error); }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setExam({ ...exam, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id) { await updateExam(id, exam); }
            else { await createExam(exam); }
            navigate("/exams");
        } catch (error) { console.error(error); }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="page-header">
                <div className="page-header-text">
                    <h2>{id ? "Update Exam" : "Create Exam"}</h2>
                    <p>{id ? "Modify exam details" : "Set up a new exam for your students"}</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-premium btn-outline" onClick={() => navigate("/exams")}>
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>
            </div>

            <div className="premium-form-card">
                <form onSubmit={handleSubmit}>
                    <div className="premium-form-group">
                        <label className="premium-label">Title</label>
                        <input type="text" className="premium-input" name="title" value={exam.title} onChange={handleChange} required placeholder="Enter exam title" />
                    </div>

                    <div className="premium-form-group">
                        <label className="premium-label">Description</label>
                        <textarea className="premium-textarea" name="description" value={exam.description} onChange={handleChange} placeholder="Describe the exam..." />
                    </div>

                    <div className="premium-form-grid">
                        <div className="premium-form-group">
                            <label className="premium-label">Duration (Minutes)</label>
                            <input type="number" className="premium-input" name="duration" value={exam.duration} onChange={handleChange} placeholder="e.g. 60" />
                        </div>

                        <div className="premium-form-group">
                            <label className="premium-label">Total Marks</label>
                            <input type="number" className="premium-input" name="totalMarks" value={exam.totalMarks} onChange={handleChange} placeholder="e.g. 100" />
                        </div>
                    </div>

                    <div className="premium-form-grid">
                        <div className="premium-form-group">
                            <label className="premium-label">Start Time</label>
                            <input type="datetime-local" className="premium-input" name="startTime" value={exam.startTime} onChange={handleChange} />
                        </div>

                        <div className="premium-form-group">
                            <label className="premium-label">End Time</label>
                            <input type="datetime-local" className="premium-input" name="endTime" value={exam.endTime} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="premium-form-actions">
                        <button type="submit" className="btn-premium btn-filled">
                            <Save size={16} /> {id ? "Update Exam" : "Create Exam"}
                        </button>
                        <button type="button" className="btn-premium btn-outline" onClick={() => navigate("/exams")}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default ExamForm;