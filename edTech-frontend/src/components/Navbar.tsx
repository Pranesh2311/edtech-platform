import {
    Link,
    useNavigate
} from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const role =
        localStorage.getItem("role");

    const logout = () => {

        localStorage.clear();

        window.location.href = "/login";
    };

    return (

        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    Ed-Tech Platform
                </Link>

                <div className="d-flex gap-2">

                    {
                        (role === "ADMIN" || role === "TEACHER") && (

                            <>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate("/videos")
                                    }
                                >
                                    Videos
                                </button>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate("/assignments")
                                    }
                                >
                                    Assignments
                                </button>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate("/courses")
                                    }
                                >
                                    Courses
                                </button>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate("/batches")
                                    }
                                >
                                    Batches
                                </button>


                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate("/")
                                    }
                                >
                                    Exams
                                </button>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate(
                                            "/results"
                                        )
                                    }
                                >
                                    Results
                                </button>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate(
                                            "/student-results"
                                        )
                                    }
                                >
                                    Students
                                </button>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate("/materials")
                                    }
                                >
                                    Materials
                                </button>

                            </>
                        )
                    }

                    {
                        role === "STUDENT" && (

                            <>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate("/videos")
                                    }
                                >
                                    Videos
                                </button>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate("/assignments")
                                    }
                                >
                                    Assignments
                                </button>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate("/")
                                    }
                                >
                                    Mock Tests
                                </button>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate(
                                            "/my-results"
                                        )
                                    }
                                >
                                    My Results
                                </button>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate(
                                            "/subscriptions"
                                        )
                                    }
                                >
                                    Subscriptions
                                </button>

                                <button
                                    className="btn btn-outline-light"
                                    onClick={() =>
                                        navigate(
                                            "/payments"
                                        )
                                    }
                                >
                                    Payments
                                </button>

                            </>
                        )
                    }

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;