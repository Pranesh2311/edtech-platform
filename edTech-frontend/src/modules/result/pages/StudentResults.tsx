import { useState } from "react";

import axios from "../../../services/axiosConfig";

const StudentResults = () => {

    const [email, setEmail]
        = useState("");

    const [results, setResults]
        = useState<any[]>([]);

    const searchResults = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/api/results/student/${email}`
            );

            setResults(response.data);

        } catch(error) {

            console.error(error);
        }
    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                Student Results
            </h2>

            <div className="d-flex gap-2 mb-4">

                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Student Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <button
                    className="btn btn-primary"
                    onClick={searchResults}
                >
                    Search
                </button>

            </div>

            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Exam ID</th>

                        <th>Correct</th>

                        <th>Total</th>

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

export default StudentResults;