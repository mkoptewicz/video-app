import VideoDetails from "./VideoDetails";
import { Container, Row } from "react-bootstrap";

const VideosList = ({ videos }) => {
  return (
    <section>
      <Container>
        <Row className="justify-content-center justify-content-md-start">
          {videos.map(video => (
            <VideoDetails key={video.id} video={video} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default VideosList;
