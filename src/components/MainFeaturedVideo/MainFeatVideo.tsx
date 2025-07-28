import { useEffect, useRef, useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import "./MainFeatVideo.less";
import type { RootState } from "../../store/store";
import { formatDurationToHours } from "../../helpers/secondsFormat";

const MainFeatVideo = () => {
  const featured = useSelector((state: RootState) => state.dataSlice.featured);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(false);

    const playTimeout = setTimeout(() => {
      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch((e) => {
          console.warn("Video play prevented:", e);
        });
      }
    }, 2000);

    return () => clearTimeout(playTimeout);
  }, [featured]);

  return (
    <div className="mainFeaturedVideo">
      {featured?.VideoUrl && showVideo ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          className="videoPlayer"
        >
          <source src={featured.VideoUrl} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          style={{
            backgroundImage: `url(/assets/${featured?.CoverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
          }}
        />
      )}

      <div className="videoDetails">
        <h4 className="category">{featured?.Category?.toUpperCase()}</h4>
        <div className="img_block">
          <img
            src={`/assets/${
              !featured?.VideoUrl || !showVideo
                ? featured.TitleImage
                : featured.CoverImage
            }`}
            alt="Movie Logo"
            className="movieLogo"
          />
        </div>
        <p>
          {featured?.ReleaseYear}, {featured?.MpaRating},{" "}
          {formatDurationToHours(featured?.Duration)}
        </p>
        <p>{featured?.Description}</p>

        <div className="buttons">
          <button className="playButton">
            <PlayCircleOutlined />
            Play
          </button>
          <button className="moreInfoButton">More Info</button>
        </div>
      </div>
    </div>
  );
};

export default MainFeatVideo;
