import { useState } from "react";
import { Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ThumbUp from "./icons/Thumb-up";
import Views from "./icons/Views";
import Heart from "./icons/Heart";
import Trash from "./icons/Trash";
import VideoModal from "./VideoModal";
import formatNumber from "../lib/formatNumber";
import GetDateFromTimestamp from "../lib/getDateFromTimestamp";

const GridViewDetails = ({ video, onDelete, onFavourite }) => {
  const [show, setShow] = useState(false);

  const closeHandler = () => setShow(false);
  const showHandler = () => setShow(true);

  const formatedViews = formatNumber(+video.viewCount);
  const formatedLikes = formatNumber(+video.likeCount);
  const addedDate = GetDateFromTimestamp(video.addedAt);

  return (
    <>
      <Col xs="12" sm="6" md="4" lg="3">
        <Card className="mb-3 shadow">
          <Card.Img
            src={video.imageUrl}
            alt=""
            onClick={showHandler}
            style={{ cursor: "pointer" }}
          />
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

            <Button variant="dark" onClick={showHandler}>
              Watch
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">Added: {addedDate}</Card.Footer>
        </Card>
      </Col>
      <VideoModal
        show={show}
        onHide={closeHandler}
        embedLink={video.embedLink}
        title={video.name}
      />
    </>
  );
};

export default GridViewDetails;
