import VideoDetails from "./VideoDetails";
import { Container, Row } from "react-bootstrap";

const VideosList = ({ videos }) => {
  return (
    <section>
      <Container>
        <Row>
          {videos.map(video => (
            <VideoDetails key={video.id} video={video} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default VideosList;
