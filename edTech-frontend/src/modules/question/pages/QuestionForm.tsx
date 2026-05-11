import { useEffect, useState } from "react";
import RichTextEditor from "../../../components/RichTextEditor";
import { useParams, useNavigate } from "react-router-dom";

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
            // Backend lacks getQuestionById, so fetch all for exam and filter
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
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

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

        <div className="container mt-4">

            <h2>{questionId ? "Update Question" : "Add Question"}</h2>

            <form
                className="card p-4 mb-4"
                onSubmit={handleSubmit}
            >

                <div className="mb-3">

                    <label className="form-label">
                        Question
                    </label>

                    <RichTextEditor
                        value={form.questionText}
                        onChange={(value) =>
                            setForm({
                                ...form,
                                questionText: value
                            })
                        }
                    />

                </div>

                <input
                    className="form-control mb-3"
                    placeholder="Option A"
                    name="optionA"
                    value={form.optionA}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    placeholder="Option B"
                    name="optionB"
                    value={form.optionB}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    placeholder="Option C"
                    name="optionC"
                    value={form.optionC}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    placeholder="Option D"
                    name="optionD"
                    value={form.optionD}
                    onChange={handleChange}
                    required
                />

                <select
                    className="form-control mb-3"
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

                <select
                    className="form-control mb-3"
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

                <select
                    className="form-control mb-3"
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

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Image URL"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Math Formula (LaTeX)"
                    name="mathFormula"
                    value={form.mathFormula}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Marks"
                    name="marks"
                    value={form.marks}
                    onChange={handleChange}
                />

                <div>
                    <button className="btn btn-success">
                        {
                            questionId
                                ? "Update Question"
                                : "Save Question"
                        }
                    </button>
                    
                    <button 
                        type="button" 
                        className="btn btn-secondary ms-2"
                        onClick={() => navigate(`/questions/${examId}`)}
                    >
                        Cancel
                    </button>
                </div>

            </form>

        </div>
    );
};

export default QuestionForm;
