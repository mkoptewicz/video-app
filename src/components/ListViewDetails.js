import { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ThumbUp from "./icons/Thumb-up";
import Views from "./icons/Views";
import Heart from "./icons/Heart";
import Trash from "./icons/Trash";
import VideoModal from "./UI/VideoModal";
import formatNumber from "../lib/formatNumber";
import getDateFromTimestamp from "../lib/getDateFromTimestamp";

const ListViewDetails = ({ video, onDelete, onFavourite }) => {
  const formatedViews = formatNumber(+video.viewCount);
  const formatedLikes = formatNumber(+video.likeCount);
  const publishingDate = getDateFromTimestamp(video.publishedAt);
  const [show, setShow] = useState(false);

  const closeHandler = () => setShow(false);
  const showHandler = () => setShow(true);
  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Card.Title className="text-ellipsis">{video.name}</Card.Title>
          <Card.Img
            onClick={showHandler}
            style={{ width: "200px", marginBottom: "1rem", cursor: "pointer" }}
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
            <Button variant="dark" onClick={showHandler}>
              Watch
            </Button>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          Added: {publishingDate}
        </Card.Footer>
      </Card>
      <VideoModal
        show={show}
        onHide={closeHandler}
        embedLink={video.embedLink}
        title={video.name}
      />
    </>
  );
};

export default ListViewDetails;
