import { Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ThumbUp from "./icons/Thumb-up";
import Views from "./icons/Views";
import Heart from "./icons/Heart";
import Trash from "./icons/Trash";

const VideoDetails = ({ video }) => {
  return (
    <Col xs="12" sm="6" md="4" lg="3">
      <Card className="mb-3 shadow">
        <Card.Img src={video.imageUrl} />
        <Card.Body>
          <Card.Title>{video.name}</Card.Title>
          <Card.Text className="d-flex justify-content-between align-items-center">
            <ThumbUp />
            <span> {video.likeCount}</span>
            <Views />
            <span> {video.viewCount}</span>
            <Heart />
            <Trash />
          </Card.Text>

          <Button variant="dark">Watch</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default VideoDetails;
