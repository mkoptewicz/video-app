import { Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const VideoDetails = ({ video }) => {
  return (
    <Col xs="12" sm="6" md="4" lg="3" >
      <Card className="mx-auto m-2 shadow" style={{ maxWidth: "300px", minHeight: "300px" }}>
        <Card.Img src={video.imageUrl} />
        <Card.Body>
          <Card.Title>{video.name}</Card.Title>
          <Card.Text>{video.likeCount}</Card.Text>
          <Card.Text>{video.viewCount}</Card.Text>
        </Card.Body>
        <Button variant="dark">Watch</Button>
      </Card>
    </Col>
  );
};

export default VideoDetails;
