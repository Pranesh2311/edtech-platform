import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    getAssignmentSubmissions
} from "../services/assignmentApi";

const ViewSubmissions = () => {

    const { assignmentId } =
        useParams();

    const [submissions,
        setSubmissions] =
        useState<any[]>([]);

    useEffect(() => {

        fetchSubmissions();

    }, []);

    const fetchSubmissions =
        async () => {

            const response =
                await getAssignmentSubmissions(
                    Number(
                        assignmentId
                    )
                );

            setSubmissions(
                response.data
            );
        };

    return (

        <div className="container mt-4">

            <h3>
                Assignment Submissions
            </h3>

            <table
                className="
                    table
                    table-bordered
                "
            >

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Student</th>

                        <th>Answer File</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        submissions.map(s => (

                            <tr key={s.id}>

                                <td>
                                    {s.id}
                                </td>

                                <td>
                                    {s.studentName}
                                </td>

                                <td>

                                    <a
                                        href={
                                            s.answerFileUrl
                                        }
                                        target="_blank"
                                    >
                                        View
                                    </a>

                                </td>

                                <td>

                                    {
                                        s.submitted
                                            ? "Submitted"
                                            : "Pending"
                                    }

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
};

export default ViewSubmissions;