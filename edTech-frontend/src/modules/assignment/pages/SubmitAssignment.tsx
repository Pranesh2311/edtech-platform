import {
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    submitAssignment
} from "../services/assignmentApi";

const SubmitAssignment = () => {

    const { assignmentId } =
        useParams();

    const studentId =
        localStorage.getItem(
            "userId"
        );

    const [answerFileUrl,
        setAnswerFileUrl] =
        useState("");

    const handleSubmit =
        async () => {

            try {

                await submitAssignment({

                    assignmentId:
                        Number(
                            assignmentId
                        ),

                    studentId:
                        Number(
                            studentId
                        ),

                    answerFileUrl,

                    submitted: true
                });

                alert(
                    "Assignment Submitted"
                );

            } catch(error) {

                console.log(error);

                alert(
                    "Error Submitting"
                );
            }
        };

    return (

        <div className="container mt-4">

            <h3>
                Submit Assignment
            </h3>

            <input
                type="text"
                placeholder="Answer File URL"
                className="form-control mb-3"
                value={answerFileUrl}
                onChange={(e) =>
                    setAnswerFileUrl(
                        e.target.value
                    )
                }
            />

            <button
                className="btn btn-primary"
                onClick={handleSubmit}
            >
                Submit
            </button>

        </div>
    );
};

export default SubmitAssignment;