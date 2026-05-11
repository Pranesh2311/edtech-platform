import {
    useNavigate
} from "react-router-dom";

const PremiumLock = ({
    batch
}: any) => {

    const navigate =
        useNavigate();

    return (

        <div
            className="
                card
                p-5
                text-center
                shadow
            "
        >

            <h1>
                🔒
            </h1>

            <h3>
                Premium Content
            </h3>

            <p>
                Purchase this batch
                to unlock videos
            </p>

            <button
                className="
                    btn
                    btn-success
                "
                onClick={() =>
                    navigate(
                        "/buy-batch",
                        {
                            state: batch
                        }
                    )
                }
            >
                Buy Now
            </button>

        </div>
    );
};

export default PremiumLock;