import { useEffect, useState } from "react";

import axios from "../../../services/axiosConfig";

const ResultHistory = () => {

    const [results, setResults]
        = useState<any[]>([]);

    useEffect(() => {

        loadResults();

    }, []);

    const loadResults = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/results"
            );

            setResults(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                Result History
            </h2>

            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Student Name</th>

                        <th>Email</th>

                        <th>Exam ID</th>

                        <th>Correct Answers</th>

                        <th>Total Questions</th>

                        <th>Score</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        results.map((r, index) => (

                            <tr key={r.id}>

                                <td>
                                    {index + 1}
                                </td>

                                <td>
                                    {r.studentName}
                                </td>

                                <td>
                                    {r.studentEmail}
                                </td>

                                <td>
                                    {r.examId}
                                </td>

                                <td>
                                    {r.correctAnswers}
                                </td>

                                <td>
                                    {r.totalQuestions}
                                </td>

                                <td>
                                    {r.score}
                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
};

export default ResultHistory;