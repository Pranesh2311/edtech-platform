import {
    useEffect,
    useState
} from "react";

import {
    createAssignment
} from "../services/assignmentApi";

import {
    getAllBatches
} from "../../batch/services/batchApi";

const CreateAssignment = () => {

    const [batches, setBatches] =
        useState<any[]>([]);

    const [formData, setFormData] =
        useState({

            title: "",

            description: "",

            assignmentFileUrl: "",

            deadline: "",

            maxMarks: "",

            batchId: ""
        });

    useEffect(() => {

        fetchBatches();

    }, []);

    const fetchBatches =
        async () => {

            const response =
                await getAllBatches();

            setBatches(
                response.data
            );
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

                await createAssignment(
                    formData
                );

                alert(
                    "Assignment Created"
                );

            } catch(error) {

                console.log(error);

                alert(
                    "Error Creating Assignment"
                );
            }
        };

    return (

        <div className="container mt-4">

            <h3>
                Create Assignment
            </h3>

            <input
                type="text"
                name="title"
                placeholder="Title"
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
                type="text"
                name="assignmentFileUrl"
                placeholder="Assignment PDF URL"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <input
                type="date"
                name="deadline"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <input
                type="number"
                name="maxMarks"
                placeholder="Max Marks"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <select
                name="batchId"
                className="form-control mb-3"
                onChange={handleChange}
            >

                <option value="">
                    Select Batch
                </option>

                {
                    batches.map(batch => (

                        <option
                            key={batch.id}
                            value={batch.id}
                        >
                            {batch.batchName}
                        </option>
                    ))
                }

            </select>

            <button
                className="btn btn-primary"
                onClick={handleSubmit}
            >
                Create Assignment
            </button>

        </div>
    );
};

export default CreateAssignment;