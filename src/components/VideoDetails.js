import { Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const VideoDetails = ({ video }) => {
  return (
    <Col xs="12" sm="6" md="4" lg="3">
      <Card className="mb-3 shadow">
        <Card.Body>
          <Card.Img src={video.imageUrl} />
          <Card.Title>{video.name}</Card.Title>
          <Card.Text>{video.likeCount}</Card.Text>
          <Card.Text>{video.viewCount}</Card.Text>
          <Button variant="dark">Watch</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default VideoDetails;
