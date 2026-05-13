import { useEffect, useState } from "react";
import axios from "../../../services/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookmarkPlus, X, ChevronRight, Send, CheckCircle } from "lucide-react";
// @ts-ignore
import { BlockMath } from "react-katex";

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
    ANSWERED:     { bg: '#16a34a', color: '#fff' },
    MARKED:       { bg: '#7c3aed', color: '#fff' },
    NOT_ANSWERED: { bg: '#dc2626', color: '#fff' },
    NOT_VISITED:  { bg: 'var(--bg-tertiary)', color: 'var(--text-secondary)' },
};

const AttemptTest = () => {
    const { examId } = useParams();
    const navigate = useNavigate();

    const savedName  = localStorage.getItem("fullName");
    const savedEmail = localStorage.getItem("email");
    const initialName  = (savedName  && savedName  !== "undefined" && savedName  !== "null") ? savedName  : "";
    const initialEmail = (savedEmail && savedEmail !== "undefined" && savedEmail !== "null") ? savedEmail : "";

    const [studentName]  = useState(initialName);
    const [studentEmail] = useState(initialEmail);
    const [questions, setQuestions]   = useState<any[]>([]);
    const [answers, setAnswers]       = useState<any>({});
    const [timeLeft, setTimeLeft]     = useState(600);
    const [submitted, setSubmitted]   = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionStatuses, setQuestionStatuses] = useState<Record<number, string>>({});
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);

    useEffect(() => {
        loadQuestions();
        if (!studentName || !studentEmail) {
            alert("Please log out and log back in to load your Student Name and Email!");
        }
    }, []);

    useEffect(() => {
        if (submitted) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) { clearInterval(timer); submitTest(); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [submitted]);

    const loadQuestions = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/questions/exam/${examId}`);
            const loadedQuestions = response.data;
            setQuestions(loadedQuestions);
            const initialStatuses: Record<number, string> = {};
            loadedQuestions.forEach((_q: any, index: number) => {
                initialStatuses[index] = index === 0 ? 'NOT_ANSWERED' : 'NOT_VISITED';
            });
            setQuestionStatuses(initialStatuses);
        } catch (error) { console.error(error); }
    };

    const handleAnswer = (questionId: number, answer: string) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const submitTest = async () => {
        if (submitted) return;
        setSubmitted(true);
        try {
            const payload = { examId: Number(examId), studentName, studentEmail, answers };
            const response = await axios.post("http://localhost:8080/api/results/submit", payload);
            alert(`Test Submitted Successfully!\n\nScore: ${response.data.score}`);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Submission Failed");
            setSubmitted(false);
        }
    };

    const updateStatusAndNavigate = (newStatus: string, goToNext: boolean) => {
        setQuestionStatuses(prev => ({ ...prev, [currentQuestionIndex]: newStatus }));
        if (goToNext && currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            if (questionStatuses[nextIndex] === 'NOT_VISITED') {
                setQuestionStatuses(prev => ({ ...prev, [nextIndex]: 'NOT_ANSWERED' }));
            }
        }
    };

    const handleSaveAndNext = () => {
        const currentQ = questions[currentQuestionIndex];
        const isAnswered = answers[currentQ.id] !== undefined;
        updateStatusAndNavigate(isAnswered ? 'ANSWERED' : 'NOT_ANSWERED', true);
    };

    const handleMarkForReviewAndNext = () => updateStatusAndNavigate('MARKED', true);

    const handleClearResponse = () => {
        const currentQ = questions[currentQuestionIndex];
        const newAnswers = { ...answers };
        delete newAnswers[currentQ.id];
        setAnswers(newAnswers);
        setQuestionStatuses(prev => ({ ...prev, [currentQuestionIndex]: 'NOT_ANSWERED' }));
    };

    const jumpToQuestion = (index: number) => {
        const currentQ = questions[currentQuestionIndex];
        const isAnswered = answers[currentQ.id] !== undefined;
        const currentStatus = questionStatuses[currentQuestionIndex];
        if (currentStatus === 'NOT_VISITED' || currentStatus === 'NOT_ANSWERED') {
            setQuestionStatuses(prev => ({ ...prev, [currentQuestionIndex]: isAnswered ? 'ANSWERED' : 'NOT_ANSWERED' }));
        }
        setCurrentQuestionIndex(index);
        if (questionStatuses[index] === 'NOT_VISITED' || !questionStatuses[index]) {
            setQuestionStatuses(prev => ({ ...prev, [index]: 'NOT_ANSWERED' }));
        }
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    const isLowTime = timeLeft <= 60;
    const answeredCount = Object.keys(answers).length;

    if (questions.length === 0) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-primary)', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--primary-color)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
                <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Loading questions...</span>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', flexDirection: 'column' }}>

            {/* ── Top Bar ── */}
            <div style={{
                background: '#ffffff',
                borderBottom: '1px solid #e2e8f0',
                padding: '0 28px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
                {/* Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BookmarkPlus size={18} color="#fff" />
                    </div>
                    <div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>Mock Test</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{questions.length} Questions &nbsp;·&nbsp; {answeredCount} Answered</div>
                    </div>
                </div>

                {/* Timer */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '9px 20px', borderRadius: '12px',
                    background: isLowTime ? '#fef2f2' : '#f8fafc',
                    border: `1.5px solid ${isLowTime ? '#fca5a5' : '#e2e8f0'}`,
                }}>
                    <Clock size={17} color={isLowTime ? '#dc2626' : '#64748b'} />
                    <span style={{
                        fontSize: '18px', fontWeight: 800,
                        color: isLowTime ? '#dc2626' : '#1e293b',
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '0.03em'
                    }}>
                        {minutes}:{seconds}
                    </span>
                </div>

                {/* Student */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{studentName || 'Student'}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{studentEmail || 'student@example.com'}</div>
                    </div>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '16px' }}>
                        {studentName ? studentName.charAt(0).toUpperCase() : 'U'}
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div style={{ display: 'flex', flex: 1, gap: '18px', padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>

                {/* ── Question Panel ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}
                    >
                        {/* Question header */}
                        <div style={{ padding: '18px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafbfc' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                                    Question
                                </span>
                                <span style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b' }}>
                                    {currentQuestionIndex + 1}
                                </span>
                                <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 500 }}>
                                    / {questions.length}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {currentQuestion.category && (
                                    <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px', background: '#eff6ff', color: '#3b82f6' }}>
                                        {currentQuestion.category}
                                    </span>
                                )}
                                {currentQuestion.difficultyLevel && (
                                    <span style={{
                                        fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px',
                                        background: currentQuestion.difficultyLevel === 'Easy' ? '#f0fdf4' : currentQuestion.difficultyLevel === 'Hard' ? '#fef2f2' : '#fffbeb',
                                        color:      currentQuestion.difficultyLevel === 'Easy' ? '#16a34a' : currentQuestion.difficultyLevel === 'Hard' ? '#dc2626' : '#d97706',
                                    }}>
                                        {currentQuestion.difficultyLevel}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Question body */}
                        <div style={{ padding: '28px', flex: 1, overflowY: 'auto' }}>
                            {currentQuestion.imageUrl && (
                                <img src={currentQuestion.imageUrl} alt="Question" style={{ maxWidth: '320px', marginBottom: '20px', borderRadius: '10px', display: 'block', border: '1px solid #e2e8f0' }} />
                            )}

                            {/* Question text */}
                            <div
                                style={{ fontSize: '17px', color: '#1e293b', lineHeight: '1.8', marginBottom: '28px', fontWeight: 500 }}
                                dangerouslySetInnerHTML={{ __html: currentQuestion.questionText }}
                            />
                            {currentQuestion.mathFormula && (
                                <div style={{ marginBottom: '24px' }}><BlockMath math={currentQuestion.mathFormula} /></div>
                            )}

                            {/* Options */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {["A", "B", "C", "D"].map((option) => {
                                    const optionText = currentQuestion[`option${option}`];
                                    const isSelected = answers[currentQuestion.id] === option;
                                    const isHovered  = hoveredOption === option && !isSelected;

                                    return (
                                        <label
                                            key={option}
                                            onClick={() => handleAnswer(currentQuestion.id, option)}
                                            onMouseEnter={() => setHoveredOption(option)}
                                            onMouseLeave={() => setHoveredOption(null)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '16px',
                                                padding: '16px 20px', borderRadius: '12px', cursor: 'pointer',
                                                border: isSelected
                                                    ? '2px solid var(--primary-color)'
                                                    : isHovered
                                                        ? '2px solid #c7d2fe'
                                                        : '2px solid #e2e8f0',
                                                background: isSelected
                                                    ? '#eef2ff'
                                                    : isHovered
                                                        ? '#f8f9ff'
                                                        : '#ffffff',
                                                transition: 'all 0.15s ease',
                                                userSelect: 'none',
                                            }}
                                        >
                                            {/* Option letter circle */}
                                            <div style={{
                                                width: '36px', height: '36px', borderRadius: '50%',
                                                flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 800, fontSize: '15px',
                                                background: isSelected ? 'var(--primary-color)' : isHovered ? '#e0e7ff' : '#f1f5f9',
                                                color: isSelected ? '#ffffff' : isHovered ? 'var(--primary-color)' : '#475569',
                                                transition: 'all 0.15s ease',
                                            }}>
                                                {isSelected ? <CheckCircle size={18} color="#fff" /> : option}
                                            </div>

                                            {/* Option text */}
                                            <span style={{
                                                fontSize: '16px',
                                                color: isSelected ? '#3730a3' : '#334155',
                                                fontWeight: isSelected ? 600 : 400,
                                                lineHeight: '1.5',
                                                flex: 1,
                                            }}>
                                                {optionText}
                                            </span>

                                            <input
                                                type="radio"
                                                name={`question-${currentQuestion.id}`}
                                                value={option}
                                                checked={isSelected}
                                                onChange={() => handleAnswer(currentQuestion.id, option)}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer actions */}
                        <div style={{ padding: '18px 28px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', background: '#fafbfc' }}>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <button
                                    className="btn-premium btn-outlined btn-sm"
                                    onClick={handleMarkForReviewAndNext}
                                    style={{ fontSize: '13px', padding: '8px 14px' }}
                                >
                                    <BookmarkPlus size={14} /> Mark & Next
                                </button>
                                <button
                                    className="btn-premium btn-outlined btn-sm"
                                    onClick={handleClearResponse}
                                    style={{ fontSize: '13px', padding: '8px 14px' }}
                                >
                                    <X size={14} /> Clear
                                </button>
                            </div>
                            <button
                                className="btn-premium btn-filled"
                                onClick={handleSaveAndNext}
                                style={{ fontSize: '14px', padding: '10px 24px' }}
                            >
                                Save & Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* ── Sidebar ── */}
                <div style={{ width: '250px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>

                    {/* Legend */}
                    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '14px', margin: '0 0 14px' }}>Legend</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { status: 'ANSWERED',     label: 'Answered' },
                                { status: 'NOT_ANSWERED', label: 'Not Answered' },
                                { status: 'MARKED',       label: 'Marked for Review' },
                                { status: 'NOT_VISITED',  label: 'Not Visited' },
                            ].map(({ status, label }) => (
                                <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{
                                        width: '14px', height: '14px', borderRadius: '4px', flexShrink: 0,
                                        background: STATUS_STYLES[status].bg,
                                        border: status === 'NOT_VISITED' ? '1.5px solid #cbd5e1' : 'none'
                                    }} />
                                    <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Palette */}
                    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '18px', flex: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', margin: '0 0 14px' }}>Question Palette</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '360px', overflowY: 'auto' }}>
                            {questions.map((_q, index) => {
                                const status = questionStatuses[index] || 'NOT_VISITED';
                                const isCurrent = currentQuestionIndex === index;
                                const s = STATUS_STYLES[status];
                                return (
                                    <button
                                        key={index}
                                        onClick={() => jumpToQuestion(index)}
                                        style={{
                                            width: '38px', height: '38px', borderRadius: '9px',
                                            border: isCurrent ? '2.5px solid #3730a3' : '2px solid transparent',
                                            background: s.bg, color: s.color,
                                            fontWeight: 700, fontSize: '13px', cursor: 'pointer',
                                            transition: 'all 0.15s',
                                            outline: 'none',
                                            boxShadow: isCurrent
                                                ? '0 0 0 3px rgba(99,102,241,0.25)'
                                                : '0 1px 3px rgba(0,0,0,0.08)',
                                        }}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        className="btn-premium btn-filled"
                        style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}
                        onClick={submitTest}
                        disabled={submitted}
                    >
                        <Send size={16} /> {submitted ? 'Submitting...' : 'Submit Test'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AttemptTest;