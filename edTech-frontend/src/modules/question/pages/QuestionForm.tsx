import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

import RichTextEditor from "../../../components/RichTextEditor";
import { createQuestion, updateQuestion, getQuestionsByExam } from "../services/questionService";

const QuestionForm = () => {
    const { examId, questionId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        marks: 1,
        category: "",
        difficultyLevel: "Easy",
        imageUrl: "",
        mathFormula: "",
        examId: Number(examId)
    });

    useEffect(() => {
        if (questionId) {
            loadQuestion(Number(questionId));
        }
    }, [questionId]);

    const loadQuestion = async (qId: number) => {
        try {
            const response = await getQuestionsByExam(Number(examId));
            const question = response.data.find((q: any) => q.id === qId);
            if (question) {
                setForm({
                    questionText: question.questionText || "",
                    optionA: question.optionA || "",
                    optionB: question.optionB || "",
                    optionC: question.optionC || "",
                    optionD: question.optionD || "",
                    correctAnswer: question.correctAnswer || "",
                    marks: question.marks || 1,
                    category: question.category || "",
                    difficultyLevel: question.difficultyLevel || "Easy",
                    imageUrl: question.imageUrl || "",
                    mathFormula: question.mathFormula || "",
                    examId: Number(examId)
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (questionId) {
                await updateQuestion(Number(questionId), form);
            } else {
                await createQuestion(form);
            }
            navigate(`/questions/${examId}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>{questionId ? "Update Question" : "Add Question"}</h2>
                    <p>{questionId ? "Edit the question details below" : "Fill in the details to add a new question"}</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-premium btn-outline" onClick={() => navigate(`/questions/${examId}`)}>
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="premium-form-card">

                    {/* Question Text */}
                    <div className="premium-form-group">
                        <label className="premium-label">Question</label>
                        <RichTextEditor
                            value={form.questionText}
                            onChange={(value) => setForm({ ...form, questionText: value })}
                        />
                    </div>

                    {/* Options */}
                    <div className="premium-form-grid">
                        <div className="premium-form-group">
                            <label className="premium-label">Option A</label>
                            <input
                                className="premium-input"
                                placeholder="Enter option A"
                                name="optionA"
                                value={form.optionA}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="premium-form-group">
                            <label className="premium-label">Option B</label>
                            <input
                                className="premium-input"
                                placeholder="Enter option B"
                                name="optionB"
                                value={form.optionB}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="premium-form-grid">
                        <div className="premium-form-group">
                            <label className="premium-label">Option C</label>
                            <input
                                className="premium-input"
                                placeholder="Enter option C"
                                name="optionC"
                                value={form.optionC}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="premium-form-group">
                            <label className="premium-label">Option D</label>
                            <input
                                className="premium-input"
                                placeholder="Enter option D"
                                name="optionD"
                                value={form.optionD}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Answer & Classification */}
                    <div className="premium-form-grid">
                        <div className="premium-form-group">
                            <label className="premium-label">Correct Answer</label>
                            <select
                                className="premium-input"
                                name="correctAnswer"
                                value={form.correctAnswer}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Correct Answer</option>
                                <option value="A">Option A</option>
                                <option value="B">Option B</option>
                                <option value="C">Option C</option>
                                <option value="D">Option D</option>
                            </select>
                        </div>
                        <div className="premium-form-group">
                            <label className="premium-label">Marks</label>
                            <input
                                type="number"
                                className="premium-input"
                                placeholder="e.g. 1"
                                name="marks"
                                value={form.marks}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="premium-form-grid">
                        <div className="premium-form-group">
                            <label className="premium-label">Category</label>
                            <select
                                className="premium-input"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Java">Java</option>
                                <option value="Spring Boot">Spring Boot</option>
                                <option value="React">React</option>
                                <option value="Database">Database</option>
                            </select>
                        </div>
                        <div className="premium-form-group">
                            <label className="premium-label">Difficulty Level</label>
                            <select
                                className="premium-input"
                                name="difficultyLevel"
                                value={form.difficultyLevel}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Optional Fields */}
                    <div className="premium-form-grid">
                        <div className="premium-form-group">
                            <label className="premium-label">Image URL <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>(optional)</span></label>
                            <input
                                type="text"
                                className="premium-input"
                                placeholder="Enter image URL"
                                name="imageUrl"
                                value={form.imageUrl}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="premium-form-group">
                            <label className="premium-label">Math Formula <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>(LaTeX, optional)</span></label>
                            <input
                                type="text"
                                className="premium-input"
                                placeholder="e.g. x^2 + y^2 = z^2"
                                name="mathFormula"
                                value={form.mathFormula}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="premium-form-actions">
                        <button type="submit" className="btn-premium btn-filled">
                            <Save size={16} /> {questionId ? "Update Question" : "Save Question"}
                        </button>
                        <button
                            type="button"
                            className="btn-premium btn-outline"
                            onClick={() => navigate(`/questions/${examId}`)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default QuestionForm;