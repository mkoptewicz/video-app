import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ThumbUp from "./icons/Thumb-up";
import Views from "./icons/Views";
import Heart from "./icons/Heart";
import Trash from "./icons/Trash";
import formatNumber from "../lib/formatNumber";
import getDateFromTimestamp from "../lib/getDateFromTimestamp";

const ListViewDetails = ({ video, onDelete, onFavourite }) => {
  const formatedViews = formatNumber(+video.viewCount);
  const formatedLikes = formatNumber(+video.likeCount);
  const publishingDate = getDateFromTimestamp(video.publishedAt);

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title className="text-ellipsis">{video.name}</Card.Title>
        <Card.Img
          style={{ width: "200px", marginBottom: "1rem" }}
          src={video.imageUrl}
          alt=""
        />
        <Card.Text className="d-flex justify-content-center align-items-center">
          <ThumbUp />
          <span className="me-2"> {formatedLikes}</span>
          <Views />
          <span className="me-2"> {formatedViews}</span>
          <Button
            className="bg-white me-2"
            variant="light"
            onClick={() => onFavourite(video.id)}
            aria-label="Add to favourites"
            aria-pressed={video.isFavourite}
          >
            <Heart />
          </Button>
          <Button
            className="bg-white me-2"
            variant="light"
            onClick={() => onDelete(video.id)}
            aria-label="Delete video"
          >
            <Trash />
          </Button>
          <Button variant="dark">Watch</Button>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Added: {publishingDate}</Card.Footer>
    </Card>
  );
};

export default ListViewDetails;
