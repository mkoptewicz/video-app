import VideoDetails from "./VideoDetails";

const VideosList = ({ videos }) => {
  return (
    <section>
      <ul>
        {videos.map(video => (
          <VideoDetails key={video.id} video={video} />
        ))}
      </ul>
    </section>
  );
};

export default VideosList;
