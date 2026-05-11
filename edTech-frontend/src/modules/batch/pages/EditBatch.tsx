import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getBatchById,
    updateBatch
} from "../services/batchApi";

import { getTeachers } from "../../auth/services/authService";

import "bootstrap/dist/css/bootstrap.min.css";

const EditBatch = () => {

    const navigate =
        useNavigate();

    const { id } =
        useParams();

    const [teachers, setTeachers] =
        useState<any[]>([]);

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

    useEffect(() => {

        fetchBatch();

        fetchTeachers();

    }, []);

    const fetchBatch =
        async () => {

            try {

                const response =
                    await getBatchById(
                        Number(id)
                    );

                setFormData({

                    batchName:
                        response.data.batchName,

                    courseName:
                        response.data.courseName,

                    description:
                        response.data.description,

                    startDate:
                        response.data.startDate,

                    endDate:
                        response.data.endDate,

                    fees:
                        response.data.fees,

                    capacity:
                        response.data.capacity,

                    teacherId:
                        response.data.teacherId
                });

            } catch(error) {

                console.log(error);
            }
        };

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

                await updateBatch(
                    Number(id),
                    formData
                );

                alert(
                    "Batch Updated Successfully"
                );

                navigate("/batches");

            } catch(error) {

                console.log(error);

                alert(
                    "Error Updating Batch"
                );
            }
        };

    return (

        <div className="container mt-4">

            <h3>
                Edit Batch
            </h3>

            <input
                type="text"
                name="batchName"
                placeholder="Batch Name"
                className="form-control mb-2"
                value={formData.batchName}
                onChange={handleChange}
            />

            <input
                type="text"
                name="courseName"
                placeholder="Course Name"
                className="form-control mb-2"
                value={formData.courseName}
                onChange={handleChange}
            />

            <textarea
                name="description"
                placeholder="Description"
                className="form-control mb-2"
                value={formData.description}
                onChange={handleChange}
            />

            <input
                type="date"
                name="startDate"
                className="form-control mb-2"
                value={formData.startDate}
                onChange={handleChange}
            />

            <input
                type="date"
                name="endDate"
                className="form-control mb-2"
                value={formData.endDate}
                onChange={handleChange}
            />

            <input
                type="number"
                name="fees"
                placeholder="Fees"
                className="form-control mb-2"
                value={formData.fees}
                onChange={handleChange}
            />

            <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                className="form-control mb-2"
                value={formData.capacity}
                onChange={handleChange}
            />

            <select
                name="teacherId"
                className="form-control mb-3"
                value={formData.teacherId}
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
                className="btn btn-warning"
                onClick={handleSubmit}
            >
                Update Batch
            </button>

        </div>
    );
};

export default EditBatch;