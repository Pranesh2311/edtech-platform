import {
    useLocation
} from "react-router-dom";

//import PremiumLock from "../components/PremiumLock";

const WatchVideo = () => {

    const location =
        useLocation();

    const video =
        location.state;

    const getYoutubeEmbedUrl =
        (url: string) => {

            if(
                url.includes("watch?v=")
            ) {

                return url.replace(
                    "watch?v=",
                    "embed/"
                );
            }

            return url;
        };

    return (

        <div className="container mt-4">

            <h3>
                {video.title}
            </h3>

            <div
                className="
                    ratio
                    ratio-16x9
                    mb-3
                "
            >

                <iframe
                    src={
                        getYoutubeEmbedUrl(
                            video.videoUrl
                        )
                    }
                    title="video-player"
                    allowFullScreen
                />

            </div>

            <p>
                {video.description}
            </p>

            <p>

                <strong>
                    Duration:
                </strong>

                {" "}

                {video.duration}

                {" "}mins

            </p>

            <p>

                <strong>
                    Batch:
                </strong>

                {" "}

                {video.batchName}

            </p>

        </div>
    );
};

export default WatchVideo;