import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getAllDoubts
} from "../services/doubtApi";

const DoubtList = () => {

    const navigate =
        useNavigate();

    const [doubts, setDoubts] =
        useState<any[]>([]);

    useEffect(() => {

        fetchDoubts();

    }, []);

    const fetchDoubts =
    async () => {

        try {

            const response = await getAllDoubts();
            console.log(response.data);

            if(Array.isArray(response.data)) {
                setDoubts(response.data);
            } else {
                setDoubts([]);
            }

        } catch(error) {
            console.log(error);
            setDoubts([]);
        }
    };

    return (

        <div className="container mt-4">

            <div
                className="
                    d-flex
                    justify-content-between
                    mb-3
                "
            >

                <h3>
                    Doubts
                </h3>

                <button
                    className="
                        btn
                        btn-primary
                    "
                    onClick={() =>
                        navigate(
                            "/create-doubt"
                        )
                    }
                >
                    Ask Doubt
                </button>

            </div>

            {
                Array.isArray(doubts) &&
                doubts.map((doubt) => (

                    <div
                        key={doubt.id}
                        className="
                            card
                            p-3
                            mb-3
                            shadow-sm
                        "
                    >

                        <div
                            className="
                                d-flex
                                justify-content-between
                            "
                        >

                            <h5>
                                {doubt.title}
                            </h5>

                            {
                                doubt.solved
                                    ? (

                                        <span
                                            className="
                                                badge
                                                bg-success
                                            "
                                        >
                                            Solved
                                        </span>
                                    )
                                    : (

                                        <span
                                            className="
                                                badge
                                                bg-warning
                                            "
                                        >
                                            Pending
                                        </span>
                                    )
                            }

                        </div>

                        <p>
                            {doubt.question}
                        </p>

                        <button
                            className="
                                btn
                                btn-dark
                                btn-sm
                            "
                            onClick={() =>
                                navigate(
                                    `/doubts/${doubt.id}`
                                )
                            }
                        >
                            View Discussion
                        </button>

                    </div>
                ))
            }

        </div>
    );
};

export default DoubtList;