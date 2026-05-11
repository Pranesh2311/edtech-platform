import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assignStudent, getBatchStudents, removeStudent } from "../services/batchApi";
import { getStudents } from "../../../services/userApi";

const BatchStudents = () => {

    const { id } = useParams();
    const [students, setStudents] = useState<any[]>([]);
    const [allStudents, setAllStudents] = useState<any[]>([]);
    const [selectedStudent, setSelectedStudent] = useState("");

    useEffect(() => {

        fetchBatchStudents();

        fetchAllStudents();

    }, []);

    const fetchBatchStudents =
        async () => {

            const response =
                await getBatchStudents(
                    Number(id)
                );

            setStudents(
                response.data
            );
        };

    const fetchAllStudents =
        async () => {

            const response =
                await getStudents();

            setAllStudents(
                response.data
            );
        };

    const handleAssign =
        async () => {

            await assignStudent(
                Number(id),
                Number(selectedStudent)
            );

            fetchBatchStudents();
        };

    const handleRemove =
        async (studentId: number) => {

            await removeStudent(
                Number(id),
                studentId
            );

            fetchBatchStudents();
        };

    return (

        <div className="container mt-4">

            <h3>
                Batch Students
            </h3>

            <div className="d-flex mb-3">

                <select
                    className="form-control"
                    onChange={(e) =>
                        setSelectedStudent(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Student
                    </option>

                    {
                        allStudents.map(student => (

                            <option
                                key={student.id}
                                value={student.id}
                            >
                                {student.name}
                            </option>
                        ))
                    }

                </select>

                <button
                    className="
                        btn
                        btn-primary
                        ms-2
                    "
                    onClick={handleAssign}
                >
                    Assign
                </button>

            </div>

            <table
                className="
                    table
                    table-bordered
                "
            >

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        students.map(student => (

                            <tr key={student.id}>

                                <td>
                                    {student.id}
                                </td>

                                <td>
                                    {student.name}
                                </td>

                                <td>
                                    {student.email}
                                </td>

                                <td>

                                    <button
                                        className="
                                            btn
                                            btn-danger
                                            btn-sm
                                        "
                                        onClick={() =>
                                            handleRemove(
                                                student.id
                                            )
                                        }
                                    >
                                        Remove
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

export default BatchStudents;