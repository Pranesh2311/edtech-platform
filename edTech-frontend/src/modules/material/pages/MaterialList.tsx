import {
    useEffect,
    useState
} from "react";
import { useNavigate } from "react-router-dom";

import {
    deleteMaterial,
    getAllMaterials,
    searchMaterials
} from "../services/materialApi";

const MaterialList = () => {

    const [materials, setMaterials] =
        useState<any[]>([]);

    const [keyword, setKeyword] =
        useState("");

    const navigate = useNavigate();    

    useEffect(() => {

        fetchMaterials();

    }, []);

    const fetchMaterials =
        async () => {

            const response =
                await getAllMaterials();

            setMaterials(
                response.data
            );
        };

    const handleSearch =
        async () => {

            const response =
                await searchMaterials(
                    keyword
                );

            setMaterials(
                response.data
            );
        };

    const handleDelete =
        async (id: number) => {

            await deleteMaterial(id);

            fetchMaterials();
        };

    return (

        <div className="container mt-4">

            <div
                className="
                    d-flex
                    justify-content-between
                    align-items-center
                    mb-3
                "
            >

                <h3>
                    Study Materials
                </h3>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        navigate("/create-material")
                    }
                >
                    Upload Material
                </button>

            </div>

            <div className="d-flex mb-3">

                <input
                    type="text"
                    placeholder="Search"
                    className="form-control"
                    value={keyword}
                    onChange={(e) =>
                        setKeyword(
                            e.target.value
                        )
                    }
                />

                <button
                    className="
                        btn
                        btn-dark
                        ms-2
                    "
                    onClick={handleSearch}
                >
                    Search
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

                        <th>Title</th>

                        <th>Type</th>

                        <th>Batch</th>

                        <th>File</th>

                        <th>Video</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        materials.map(material => (

                            <tr key={material.id}>

                                <td>
                                    {material.id}
                                </td>

                                <td>
                                    {material.title}
                                </td>

                                <td>
                                    {material.materialType}
                                </td>

                                <td>
                                    {material.batchName}
                                </td>

                                <td>

                                    {
                                        material.fileUrl && (

                                            <a
                                                href={
                                                    material.fileUrl
                                                }
                                                target="_blank"
                                            >
                                                Open File
                                            </a>
                                        )
                                    }

                                </td>

                                <td>

                                    {
                                        material.videoUrl && (

                                            <a
                                                href={
                                                    material.videoUrl
                                                }
                                                target="_blank"
                                            >
                                                Watch Video
                                            </a>
                                        )
                                    }

                                </td>

                                <td>

                                    <button
                                        className="
                                            btn
                                            btn-danger
                                            btn-sm
                                        "
                                        onClick={() =>
                                            handleDelete(
                                                material.id
                                            )
                                        }
                                    >
                                        Delete
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

export default MaterialList;