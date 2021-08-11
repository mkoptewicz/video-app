import { Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ThumbUp from "./icons/Thumb-up";
import Views from "./icons/Views";
import Heart from "./icons/Heart";
import Trash from "./icons/Trash";
import formatNumber from "../lib/formatNumber";

const GridViewDetails = ({ video, onDelete, onFavourite }) => {
  const formatedViews = formatNumber(+video.viewCount);
  const formatedLikes = formatNumber(+video.likeCount);

  return (
    <Col xs="12" sm="6" md="4" lg="3">
      <Card className="mb-3 shadow">
        <Card.Img src={video.imageUrl} alt="" />
        <Card.Body>
          <Card.Title className="text-ellipsis">{video.name}</Card.Title>
          <Card.Text className="d-flex justify-content-between align-items-center">
            <ThumbUp />
            <span> {formatedLikes}</span>
            <Views />
            <span> {formatedViews}</span>
            <Button
              className="bg-white"
              variant="light"
              onClick={() => onFavourite(video.id)}
              aria-label="Add to favourites"
              aria-pressed={video.isFavourite}
            >
              <Heart />
            </Button>
            <Button
              className="bg-white"
              variant="light"
              onClick={() => onDelete(video.id)}
              aria-label="Delete video"
            >
              <Trash />
            </Button>
          </Card.Text>

          <Button variant="dark">Watch</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </Col>
  );
};

export default GridViewDetails;
