import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function Card({ data }) {
  if (!data) {
    return <div>Error: Missing data</div>; // Fallback if no data is passed
  }

  const {
    videoId,
    videoDuration,
    videoThumbnail,
    channelInfo,
    videoTitle,
    videoViews,
    videoAge,
  } = data;

  const channelImage = channelInfo?.image;
  const channelName = channelInfo?.name;

  return (
    <div className="w-72 h-60 flex gap-3 flex-col">
      {/* Thumbnail */}
      <div className="relative">
        {videoDuration && (
          <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
            {videoDuration}
          </span>
        )}
        <Link to={`/watch/${videoId}`}>
          <img
            src={videoThumbnail}
            alt="Thumbnail"
            className="h-44 w-72 object-cover"
          />
        </Link>
      </div>

      {/* Video Info */}
      <div className="flex gap-2">
        {/* Channel Image */}
        <div className="min-w-fit">
          <a href="#">
            {channelImage ? (
              <img
                src={channelImage}
                alt="channel"
                className="h-9 w-9 rounded-full"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-gray-300"></div> // Placeholder if image missing
            )}
          </a>
        </div>

        {/* Video Title and Info */}
        <div>
          <h3>
            <a href="#" className="line-clamp-2 hover:underline">
              {videoTitle || "No Title Available"}
            </a>
          </h3>
          <div className="text-sm text-gray-500">
            <div>
              <a href="#" className="hover:text-white">
                {channelName || "Unknown Channel"}
              </a>
            </div>
            <div>
              <span>{videoViews ? `${videoViews} views` : "No views"} </span>
              <span>{videoAge || "Unknown time"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// PropTypes validation
Card.propTypes = {
  data: PropTypes.shape({
    videoId: PropTypes.string.isRequired, // Added videoId
    videoDuration: PropTypes.string.isRequired,
    videoThumbnail: PropTypes.string.isRequired,
    videoTitle: PropTypes.string.isRequired,
    videoViews: PropTypes.string.isRequired,
    videoAge: PropTypes.string.isRequired,
    channelInfo: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
