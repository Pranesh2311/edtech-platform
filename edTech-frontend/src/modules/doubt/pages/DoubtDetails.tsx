import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    getReplies,
    replyDoubt,
    markSolved
} from "../services/doubtApi";

const DoubtDetails = () => {

    const { id } =
        useParams();

    const [replies, setReplies] =
        useState<any[]>([]);

    const [reply, setReply] =
        useState("");

    const userId =
        Number(
            localStorage.getItem(
                "userId"
            )
        );

    useEffect(() => {

        fetchReplies();

    }, []);

    const fetchReplies =
        async () => {

            const response =
                await getReplies(
                    Number(id)
                );

            setReplies(
                response.data
            );
        };

    const handleReply =
        async () => {

            await replyDoubt(

                Number(id),

                {

                    reply,

                    userId
                }
            );

            setReply("");

            fetchReplies();
        };

    const handleSolved =
        async () => {

            await markSolved(
                Number(id)
            );

            alert(
                "Marked Solved"
            );
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
                    Discussion
                </h3>

                <textarea
                    className="
                        form-control
                        mb-3
                    "
                    rows={4}
                    placeholder="Write reply..."
                    value={reply}
                    onChange={(e) =>
                        setReply(
                            e.target.value
                        )
                    }
                />

                <div className="d-flex gap-2">

                    <button
                        className="
                            btn
                            btn-primary
                        "
                        onClick={handleReply}
                    >
                        Reply
                    </button>

                    <button
                        className="
                            btn
                            btn-success
                        "
                        onClick={handleSolved}
                    >
                        Mark Solved
                    </button>

                </div>

            </div>

            <div className="mt-4">

                {
                    replies.map(item => (

                        <div
                            key={item.id}
                            className="
                                card
                                p-3
                                mb-3
                            "
                        >

                            <h6>
                                {item.user?.fullName}
                            </h6>

                            <p>
                                {item.reply}
                            </p>

                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default DoubtDetails;