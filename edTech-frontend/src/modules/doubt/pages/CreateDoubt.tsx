import {
    useEffect,
    useState
} from "react";

import {
    createDoubt
} from "../services/doubtApi";

import {
    getAllBatches
} from "../../batch/services/batchApi";

const CreateDoubt = () => {

    const [batches, setBatches] =
        useState<any[]>([]);

    const [formData, setFormData] =
        useState({

            title: "",

            question: "",

            batchId: ""
        });

    const studentId =
        Number(
            localStorage.getItem(
                "userId"
            )
        );

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

                await createDoubt({

                    ...formData,

                    studentId
                });

                alert(
                    "Doubt Posted Successfully"
                );

            } catch(error) {

                console.log(error);

                alert(
                    "Error Posting Doubt"
                );
            }
        };

    return (

        <div className="container mt-4">

            <div
                className="
                    card
                    p-4
                    shadow
                "
            >

                <h3>
                    Ask Doubt
                </h3>

                <input
                    type="text"
                    name="title"
                    placeholder="Doubt Title"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <textarea
                    name="question"
                    placeholder="Write your doubt..."
                    rows={6}
                    className="form-control mb-3"
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
                    className="
                        btn
                        btn-primary
                    "
                    onClick={handleSubmit}
                >
                    Submit Doubt
                </button>

            </div>

        </div>
    );
};

export default CreateDoubt;