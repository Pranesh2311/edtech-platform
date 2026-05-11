import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBatch } from "../services/batchApi";
import { getTeachers } from "../../auth/services/authService";

const CreateBatch = () => {

    const [teachers, setTeachers] = useState<any[]>([]);

    const [formData, setFormData] =
        useState({

            batchName: "",
            courseName: "",
            description: "",
            startDate: "",
            endDate: "",
            fees: "",
            capacity: "",
            teacherId: ""
        });

    const handleChange =
        (e: any) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value
            });
        };

    const handleSubmit =
        async () => {

            try {

                await createBatch(
                    formData
                );

                alert(
                    "Batch Created Successfully"
                );

            } catch(error) {

                console.log(error);

                alert(
                    "Error Creating Batch"
                );
            }
        };


        useEffect(() => {

            fetchTeachers();

        }, []);

        const fetchTeachers =
            async () => {

                try {

                    const response =
                        await getTeachers();

                    setTeachers(
                        response.data
                    );

                } catch(error) {

                    console.log(error);
                }
            };

    return (

        <div className="container mt-4">

            <h3>Create Batch</h3>

            <input
                type="text"
                name="batchName"
                placeholder="Batch Name"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <input
                type="text"
                name="courseName"
                placeholder="Course Name"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <textarea
                name="description"
                placeholder="Description"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <input
                type="date"
                name="startDate"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <input
                type="date"
                name="endDate"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <input
                type="number"
                name="fees"
                placeholder="Fees"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <select
                name="teacherId"
                className="form-control mb-2"
                onChange={handleChange}
            >

                <option value="">
                    Select Teacher
                </option>

                {
                    teachers.map((teacher) => (

                        <option
                            key={teacher.id}
                            value={teacher.id}
                        >
                            {teacher.name}
                        </option>
                    ))
                }

            </select>

            <button
                className="btn btn-primary"
                onClick={handleSubmit}
            >
                Create Batch
            </button>
        </div>
    );
};

export default CreateBatch;