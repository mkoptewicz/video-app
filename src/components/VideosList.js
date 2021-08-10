import VideoDetails from "./VideoDetails";
import { Container, Row, Button } from "react-bootstrap";
import { useState } from "react";

const VideosList = ({ videos, onDelete, onFavourite }) => {
  const [filterIsActive, setFilterIsActive] = useState(false);

  const filteredVideos = filterIsActive
    ? videos.filter(vid => vid.isFavourite)
    : videos;

  const filterButton = filterIsActive ? (
    <Button
      onClick={() => setFilterIsActive(false)}
      variant="warning"
      className="mb-3"
    >
      Show all
    </Button>
  ) : (
    <Button
      onClick={() => setFilterIsActive(true)}
      variant="warning"
      className="mb-3"
    >
      Show favourites
    </Button>
  );

  return (
    <section>
      <Container>
        {filterButton}
        <Row className="justify-content-center justify-content-md-start">
          {filteredVideos.map(video => (
            <VideoDetails
              key={video.id}
              video={video}
              onDelete={onDelete}
              onFavourite={onFavourite}
            />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default VideosList;
