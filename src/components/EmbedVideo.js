const EmbedVideo = ({ embedLink, title }) => {
  return (
    <div className="video-responsive">
      <iframe
        src={embedLink}
        width="640"
        height="360"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
      ></iframe>
    </div>
  );
};

export default EmbedVideo;
