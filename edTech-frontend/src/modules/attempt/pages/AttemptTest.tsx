import { useEffect, useState } from "react";
import axios from "../../../services/axiosConfig";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { BlockMath } from "react-katex";

const AttemptTest = () => {

    const { examId } = useParams();
    const savedName = localStorage.getItem("fullName");
    const savedEmail = localStorage.getItem("email");
    const initialName = (savedName && savedName !== "undefined" && savedName !== "null") ? savedName : "";
    const initialEmail = (savedEmail && savedEmail !== "undefined" && savedEmail !== "null") ? savedEmail : "";

    const [studentName] = useState(initialName);
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [studentEmail] = useState(initialEmail);
    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<any>({});
    const [timeLeft, setTimeLeft] = useState(600);
    
    // Pagination and Status states
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionStatuses, setQuestionStatuses] = useState<Record<number, string>>({});

    useEffect(() => {
        loadQuestions();
        if (!studentName || !studentEmail) {
            alert("Please log out and log back in to load your Student Name and Email!");
        }
    }, []);

    useEffect(() => {
        if(submitted) {
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if(prev <= 1) {
                    clearInterval(timer);
                    submitTest();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [submitted]);

    const loadQuestions = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/questions/exam/${examId}`
            );
            const loadedQuestions = response.data;
            setQuestions(loadedQuestions);

            // Initialize all statuses to NOT_VISITED, except the first one to NOT_ANSWERED
            const initialStatuses: Record<number, string> = {};
            loadedQuestions.forEach((_q: any, index: number) => {
                initialStatuses[index] = index === 0 ? 'NOT_ANSWERED' : 'NOT_VISITED';
            });
            setQuestionStatuses(initialStatuses);

        } catch(error) {
            console.error(error);
        }
    };

    const handleAnswer = (questionId: number, answer: string) => {
        setAnswers({
            ...answers,
            [questionId]: answer
        });
    };

    const submitTest = async () => {
        if(submitted) { return; }
        setSubmitted(true);
        try {
            const payload = {
                examId: Number(examId),
                studentName: studentName,
                studentEmail: studentEmail,
                answers: answers
            };

            const response = await axios.post("http://localhost:8080/api/results/submit", payload);

            alert(`Test Submitted Successfully!\n\nScore: ${response.data.score}`);
            navigate("/");
        } catch(error) {
            console.error(error);
            alert("Submission Failed");
            setSubmitted(false);
        }
    };

    // Navigation and Action Handlers
    const updateStatusAndNavigate = (newStatus: string, goToNext: boolean) => {
        setQuestionStatuses(prev => ({
            ...prev,
            [currentQuestionIndex]: newStatus
        }));

        if (goToNext && currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            
            // If the next question is not visited, mark it as not answered
            if (questionStatuses[nextIndex] === 'NOT_VISITED') {
                setQuestionStatuses(prev => ({
                    ...prev,
                    [nextIndex]: 'NOT_ANSWERED'
                }));
            }
        }
    };

    const handleSaveAndNext = () => {
        const currentQ = questions[currentQuestionIndex];
        const isAnswered = answers[currentQ.id] !== undefined;
        updateStatusAndNavigate(isAnswered ? 'ANSWERED' : 'NOT_ANSWERED', true);
    };

    const handleMarkForReviewAndNext = () => {
        updateStatusAndNavigate('MARKED', true);
    };

    const handleClearResponse = () => {
        const currentQ = questions[currentQuestionIndex];
        const newAnswers = { ...answers };
        delete newAnswers[currentQ.id];
        setAnswers(newAnswers);
        // Status updates to NOT_ANSWERED since response is cleared
        setQuestionStatuses(prev => ({
            ...prev,
            [currentQuestionIndex]: 'NOT_ANSWERED'
        }));
    };

    const jumpToQuestion = (index: number) => {
        // If current question is NOT_VISITED (shouldn't happen) or NOT_ANSWERED, it remains NOT_ANSWERED. 
        // If we leave it and it was answered or marked, it stays that way.
        const currentQ = questions[currentQuestionIndex];
        const isAnswered = answers[currentQ.id] !== undefined;
        const currentStatus = questionStatuses[currentQuestionIndex];

        if (currentStatus === 'NOT_VISITED' || currentStatus === 'NOT_ANSWERED') {
            setQuestionStatuses(prev => ({ ...prev, [currentQuestionIndex]: isAnswered ? 'ANSWERED' : 'NOT_ANSWERED' }));
        }

        setCurrentQuestionIndex(index);
        
        // Update the newly jumped question status if it was not visited
        if (questionStatuses[index] === 'NOT_VISITED' || !questionStatuses[index]) {
            setQuestionStatuses(prev => ({ ...prev, [index]: 'NOT_ANSWERED' }));
        }
    };

    // UI Helpers
    const getButtonColor = (status: string) => {
        switch (status) {
            case 'ANSWERED': return '#28a745'; // Bootstrap success green
            case 'MARKED': return '#6f42c1';   // Purple
            case 'NOT_ANSWERED': return '#dc3545'; // Bootstrap danger red
            case 'NOT_VISITED': default: return '#e9ecef'; // Bootstrap gray-200
        }
    };
    
    const getButtonTextColor = (status: string) => {
        return status === 'NOT_VISITED' ? '#000' : '#fff';
    };

    if (questions.length === 0) {
        return <div className="container mt-4 text-center">Loading Questions...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
            
            <div className="row mb-3 align-items-center bg-white p-3 shadow-sm rounded mx-1 d-flex justify-content-between border">
                <div className="col-md-3">
                    <h4 className="mb-0 text-primary fw-bold">Mock Test</h4>
                </div>
                <div className="col-md-5 text-center">
                    <div className="d-inline-block bg-light px-4 py-2 rounded shadow-sm border border-danger">
                        <h5 className="mb-0 text-danger fw-bold d-flex align-items-center">
                            <span className="me-2">⏱</span> Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </h5>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-end align-items-center">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2 shadow-sm fw-bold" style={{width: "45px", height: "45px", fontSize: "1.2rem"}}>
                        {studentName ? studentName.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="text-end">
                        <div className="fw-bold text-dark" style={{lineHeight: "1.2"}}>{studentName || "Student"}</div>
                        <small className="text-muted" style={{fontSize: "1rem"}}>{studentEmail || "student@example.com"}</small>
                    </div>
                </div>
            </div>

            <div className="row mx-1">
                {/* Main Content Area */}
                <div className="col-lg-9 col-md-8 ps-0 mb-4">
                    <div className="card shadow-sm h-100 border-0">
                        <div className="card-header bg-light border-bottom-0 pt-3">
                            <h5 className="fw-bold mb-0">Question No. {currentQuestionIndex + 1}</h5>
                        </div>
                        <div className="card-body fs-5 text-start" style={{ minHeight: "400px" }}>
                            
                            {currentQuestion.imageUrl && (
                                <img src={currentQuestion.imageUrl} alt="Question" width="300" className="mb-4 img-fluid rounded" />
                            )}
                            
                            <div className="mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion.questionText }}></div>
                            
                            {currentQuestion.mathFormula && (
                                <div className="mb-4"><BlockMath math={currentQuestion.mathFormula} /></div>
                            )}

                            <div className="mt-4 ms-2">
                                {["A", "B", "C", "D"].map((option) => (
                                    <div key={option} className="form-check mb-3">
                                        <input
                                            className="form-check-input fs-5"
                                            type="radio"
                                            name={`question-${currentQuestion.id}`}
                                            id={`option-${option}`}
                                            value={option}
                                            checked={answers[currentQuestion.id] === option}
                                            onChange={() => handleAnswer(currentQuestion.id, option)}
                                            style={{ cursor: "pointer" }}
                                        />
                                        <label className="form-check-label ms-2" htmlFor={`option-${option}`} style={{ cursor: "pointer" }}>
                                            {option === "A" && currentQuestion.optionA}
                                            {option === "B" && currentQuestion.optionB}
                                            {option === "C" && currentQuestion.optionC}
                                            {option === "D" && currentQuestion.optionD}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="card-footer bg-white border-top-0 pb-4 pt-0 d-flex justify-content-between flex-wrap gap-2">
                            <div>
                                <button className="btn btn-outline-secondary fw-bold me-2 mb-2" onClick={handleMarkForReviewAndNext}>
                                    Mark for Review & Next
                                </button>
                                <button className="btn btn-outline-danger fw-bold mb-2" onClick={handleClearResponse}>
                                    Clear Response
                                </button>
                            </div>
                            <button className="btn btn-primary fw-bold px-4 mb-2" onClick={handleSaveAndNext}>
                                Save & Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Navigation Palette */}
                <div className="col-lg-3 col-md-4 pe-0">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-light fw-bold text-center border-bottom-0 pt-3">
                            Question Palette
                        </div>
                        <div className="card-body">
                            
                            <div className="row g-2 mb-4" style={{ fontSize: "13px", fontWeight: "500" }}>
                                <div className="col-6 d-flex align-items-center">
                                    <span className="rounded-circle me-2 shadow-sm border" style={{ backgroundColor: "#28a745", width: "16px", height: "16px", display: "inline-block" }}></span> Answered
                                </div>
                                <div className="col-6 d-flex align-items-center">
                                    <span className="rounded-circle me-2 shadow-sm border" style={{ backgroundColor: "#dc3545", width: "16px", height: "16px", display: "inline-block" }}></span> Not Answered
                                </div>
                                <div className="col-6 d-flex align-items-center">
                                    <span className="rounded-circle me-2 shadow-sm border" style={{ backgroundColor: "#6f42c1", width: "16px", height: "16px", display: "inline-block" }}></span> Marked
                                </div>
                                <div className="col-6 d-flex align-items-center">
                                    <span className="rounded-circle me-2 shadow-sm border" style={{ backgroundColor: "#e9ecef", width: "16px", height: "16px", display: "inline-block" }}></span> Not Visited
                                </div>
                            </div>

                            <div className="d-flex flex-wrap gap-2 justify-content-center overflow-auto" style={{ maxHeight: "350px" }}>
                                {questions.map((_q, index) => {
                                    const status = questionStatuses[index];
                                    const isCurrent = currentQuestionIndex === index;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => jumpToQuestion(index)}
                                            className={`btn fw-bold rounded-circle shadow-sm d-flex align-items-center justify-content-center ${isCurrent ? 'border border-3 border-dark' : 'border'}`}
                                            style={{
                                                width: "45px",
                                                height: "45px",
                                                backgroundColor: getButtonColor(status),
                                                color: getButtonTextColor(status),
                                                transition: "all 0.2s"
                                            }}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div className="card-footer bg-white border-top-0 text-center pb-4 pt-0">
                            <button className="btn btn-success fw-bold w-100 py-2 fs-5 shadow" onClick={submitTest} disabled={submitted}>
                                {submitted ? "Submitting..." : "Submit Test"}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AttemptTest;