import {
    useEffect,
    useState
} from "react";

import {
    createMaterial
} from "../services/materialApi";

import {
    getAllBatches
} from "../../batch/services/batchApi";

const CreateMaterial = () => {

    const [batches, setBatches] =
        useState<any[]>([]);

    const [formData, setFormData] =
        useState({

            title: "",

            description: "",

            materialType: "",

            fileUrl: "",

            videoUrl: "",

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

            await createMaterial(
                    formData
            );

            alert(
                "Material Uploaded"
            );
        };

    return (

        <div className="container mt-4">

            <h3>
                Upload Study Material
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

            <select
                name="materialType"
                className="form-control mb-2"
                onChange={handleChange}
            >

                <option value="">
                    Select Type
                </option>

                <option value="PDF">
                    PDF
                </option>

                <option value="VIDEO">
                    VIDEO
                </option>

                <option value="DOC">
                    DOC
                </option>

            </select>

            <input
                type="text"
                name="fileUrl"
                placeholder="File URL"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <input
                type="text"
                name="videoUrl"
                placeholder="Video URL"
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
                Upload Material
            </button>

        </div>
    );
};

export default CreateMaterial;