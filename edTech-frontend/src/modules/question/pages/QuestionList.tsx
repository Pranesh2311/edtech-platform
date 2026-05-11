import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// @ts-ignore
import { BlockMath } from "react-katex";

import { getQuestionsByExam, deleteQuestion } from "../services/questionService";

const QuestionList = () => {

    const { examId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {

        const response = await getQuestionsByExam(
            Number(examId)
        );

        setQuestions(response.data);
    };

    const handleDelete = async (id: number) => {

        const confirmDelete = window.confirm(
            "Delete this question?"
        );

        if (confirmDelete) {

            await deleteQuestion(id);

            loadQuestions();
        }
    };

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-4">
                <h2>Questions</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate(`/questions/${examId}/add`)}
                >
                    Add Question
                </button>
            </div>

            <table className="table table-bordered">

                <thead>

                    <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Correct</th>
                        <th>Marks</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        questions.map((q, index) => (

                            <tr key={q.id}>

                                <td>{index + 1}</td>
                                <td>

                                    {
                                        q.imageUrl && (
                                            <img
                                                src={q.imageUrl}
                                                alt="Question"
                                                width="120"
                                                className="mb-2"
                                            />
                                        )
                                    }

                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: q.questionText
                                        }}
                                    ></div>

                                    {
                                        q.mathFormula && (
                                            <BlockMath math={q.mathFormula} />
                                        )
                                    }

                                </td>
                                <td>{q.correctAnswer}</td>
                                <td>{q.marks}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => navigate(`/questions/${examId}/edit/${q.id}`)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(q.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
};

export default QuestionList;