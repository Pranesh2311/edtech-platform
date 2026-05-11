import {
    useState
} from "react";

import {
    createCourse
} from "../services/courseApi";

import "bootstrap/dist/css/bootstrap.min.css";

const CreateCourse = () => {

    const [formData, setFormData] =
        useState({

            title: "",

            description: "",

            thumbnail: "",

            price: "",

            durationInMonths: ""
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

                await createCourse(
                    formData
                );

                alert(
                    "Course Created Successfully"
                );

                setFormData({

                    title: "",

                    description: "",

                    thumbnail: "",

                    price: "",

                    durationInMonths: ""
                });

            } catch(error) {

                console.log(error);

                alert(
                    "Error Creating Course"
                );
            }
        };

    return (

        <div className="container mt-4">

            <h3>
                Create Course
            </h3>

            <input
                type="text"
                name="title"
                placeholder="Course Title"
                className="form-control mb-3"
                value={formData.title}
                onChange={handleChange}
            />

            <textarea
                name="description"
                placeholder="Description"
                className="form-control mb-3"
                value={formData.description}
                onChange={handleChange}
            />

            <input
                type="text"
                name="thumbnail"
                placeholder="Thumbnail URL"
                className="form-control mb-3"
                value={formData.thumbnail}
                onChange={handleChange}
            />

            <input
                type="number"
                name="price"
                placeholder="Course Price"
                className="form-control mb-3"
                value={formData.price}
                onChange={handleChange}
            />

            <input
                type="number"
                name="durationInMonths"
                placeholder="Duration In Months"
                className="form-control mb-3"
                value={formData.durationInMonths}
                onChange={handleChange}
            />

            <button
                className="btn btn-primary"
                onClick={handleSubmit}
            >
                Create Course
            </button>

        </div>
    );
};

export default CreateCourse;