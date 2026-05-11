import {
    useEffect,
    useState
} from "react";

import {
    createVideo
} from "../services/videoApi";

import {
    getAllBatches
} from "../../batch/services/batchApi";

const CreateVideo = () => {

    const [batches, setBatches] =
        useState<any[]>([]);

    const [formData, setFormData] =
        useState({

            title: "",

            description: "",

            videoUrl: "",

            thumbnailUrl: "",

            duration: "",

            freeVideo: false,

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

            const {
                name,
                value,
                type,
                checked
            } = e.target;

            setFormData({

                ...formData,

                [name]:
                    type === "checkbox"
                        ? checked
                        : value
            });
        };

    const handleSubmit =
        async () => {

            try {

                await createVideo(
                    formData
                );

                alert(
                    "Video Uploaded"
                );

            } catch(error) {

                console.log(error);

                alert(
                    "Error Uploading Video"
                );
            }
        };

    return (

        <div className="container mt-4">

            <h3>
                Upload Video
            </h3>

            <input
                type="text"
                name="title"
                placeholder="Video Title"
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
                name="videoUrl"
                placeholder="YouTube Video URL"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <input
                type="text"
                name="thumbnailUrl"
                placeholder="Thumbnail URL"
                className="form-control mb-2"
                onChange={handleChange}
            />

            <input
                type="number"
                name="duration"
                placeholder="Duration (Minutes)"
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

            <div className="form-check mb-3">

                <input
                    type="checkbox"
                    name="freeVideo"
                    className="form-check-input"
                    onChange={handleChange}
                />

                <label className="form-check-label">

                    Free Video

                </label>

            </div>

            <button
                className="btn btn-primary"
                onClick={handleSubmit}
            >
                Upload Video
            </button>

        </div>
    );
};

export default CreateVideo;