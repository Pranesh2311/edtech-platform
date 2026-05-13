import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, HelpCircle } from "lucide-react";
// @ts-ignore
import { BlockMath } from "react-katex";

import { getQuestionsByExam, deleteQuestion } from "../services/questionService";

const difficultyStyle: Record<string, { background: string; color: string }> = {
    Easy:   { background: 'rgba(34,197,94,0.12)',  color: '#16a34a' },
    Medium: { background: 'rgba(234,179,8,0.12)',  color: '#ca8a04' },
    Hard:   { background: 'rgba(239,68,68,0.12)',  color: '#dc2626' },
};

const QuestionList = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        const response = await getQuestionsByExam(Number(examId));
        setQuestions(response.data);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Delete this question?")) {
            await deleteQuestion(id);
            loadQuestions();
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Questions</h2>
                    <p>{questions.length} question{questions.length !== 1 ? 's' : ''} total</p>
                </div>
                <div className="page-header-actions">
                    <button
                        className="btn-premium btn-filled"
                        onClick={() => navigate(`/questions/${examId}/add`)}
                    >
                        <Plus size={16} /> Add Question
                    </button>
                </div>
            </div>

            {/* Table */}
            {questions.length > 0 ? (
                <div className="premium-table-wrapper">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Question</th>
                                <th>Correct</th>
                                <th>Difficulty</th>
                                <th>Marks</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, index) => (
                                <tr key={q.id}>
                                    <td>{index + 1}</td>
                                    <td style={{ maxWidth: '420px' }}>
                                        {q.imageUrl && (
                                            <img
                                                src={q.imageUrl}
                                                alt="Question"
                                                width="120"
                                                style={{ display: 'block', marginBottom: '8px', borderRadius: '6px' }}
                                            />
                                        )}
                                        <div
                                            style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.5' }}
                                            dangerouslySetInnerHTML={{ __html: q.questionText }}
                                        />
                                        {q.mathFormula && (
                                            <div style={{ marginTop: '6px' }}>
                                                <BlockMath math={q.mathFormula} />
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <span className="status-badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                                            {q.correctAnswer}
                                        </span>
                                    </td>
                                    <td>
                                        {q.difficultyLevel ? (
                                            <span className="status-badge" style={difficultyStyle[q.difficultyLevel] ?? { background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                                                {q.difficultyLevel}
                                            </span>
                                        ) : '—'}
                                    </td>
                                    <td>{q.marks}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button
                                                className="btn-premium btn-outlined btn-sm"
                                                onClick={() => navigate(`/questions/${examId}/edit/${q.id}`)}
                                            >
                                                <Pencil size={13} /> Edit
                                            </button>
                                            <button
                                                className="btn-premium btn-danger btn-sm"
                                                onClick={() => handleDelete(q.id)}
                                            >
                                                <Trash2 size={13} /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon"><HelpCircle size={28} /></div>
                    <div className="empty-state-title">No questions yet</div>
                    <div className="empty-state-desc">
                        Add your first question to get this exam started
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default QuestionList;