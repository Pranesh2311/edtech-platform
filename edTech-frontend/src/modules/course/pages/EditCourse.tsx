import {
    useEffect,
    useState
} from "react";

import {
    getCourseById,
    updateCourse
} from "../services/courseApi";

import {
    useNavigate,
    useParams
} from "react-router-dom";

const EditCourse = () => {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({

            title: "",

            description: "",

            thumbnail: "",

            price: "",

            durationInMonths: ""
        });

    useEffect(() => {

        fetchCourse();

    }, []);

    const fetchCourse =
        async () => {

            try {

                const response =
                    await getCourseById(
                        Number(id)
                    );

                setFormData({

                    title:
                        response.data.title,

                    description:
                        response.data.description,

                    thumbnail:
                        response.data.thumbnail,

                    price:
                        response.data.price,

                    durationInMonths:
                        response.data.durationInMonths
                });

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

    const handleUpdate =
        async () => {

            try {

                await updateCourse(
                    Number(id),
                    formData
                );

                alert(
                    "Course Updated"
                );

                navigate(
                    "/courses"
                );

            } catch(error) {

                console.log(error);
            }
        };

    return (

        <div className="container mt-4">

            <h3>
                Edit Course
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
                placeholder="Price"
                className="form-control mb-3"
                value={formData.price}
                onChange={handleChange}
            />

            <input
                type="number"
                name="durationInMonths"
                placeholder="Duration"
                className="form-control mb-3"
                value={formData.durationInMonths}
                onChange={handleChange}
            />

            <button
                className="btn btn-success"
                onClick={handleUpdate}
            >
                Update Course
            </button>

        </div>
    );
};

export default EditCourse;