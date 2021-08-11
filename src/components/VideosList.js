import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import VideoDetails from "./VideoDetails";
import List from "./icons/List";
import Grid from "./icons/Grid";

const VideosList = ({ videos, onDelete, onFavourite, onDeleteAll }) => {
  const [filterIsActive, setFilterIsActive] = useState(false);

  const toggleFilterHandler = () =>
    setFilterIsActive(filterIsActive => !filterIsActive);

  const filteredVideos = filterIsActive
    ? videos.filter(vid => vid.isFavourite)
    : videos;

  const filterButton = filterIsActive ? (
    <Button
      onClick={() => setFilterIsActive(false)}
      variant="warning"
      className="mb-3 me-3"
    >
      Show all
    </Button>
  ) : (
    <Button
      onClick={() => setFilterIsActive(true)}
      variant="warning"
      className="mb-3 me-3"
    >
      Show favourites
    </Button>
  );

  return (
    <section>
      <Container>
        <Button
          onClick={toggleFilterHandler}
          variant="warning"
          className="mb-3 me-3"
        >
          {filterIsActive ? "Show all" : "Show favourites"}
        </Button>
        <Button
          onClick={() => onDeleteAll()}
          variant="danger"
          className="mb-3 me-3"
        >
          Delete all
        </Button>
        <div>
          <Button
            onClick={() => {}}
            variant="secondary"
            className="mb-3 me-3"
            aria-label="display videos as list"
          >
            <List />
          </Button>
          <Button
            onClick={() => {}}
            variant="secondary"
            className="mb-3"
            aria-label="display videos as grid"
          >
            <Grid />
          </Button>
        </div>

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
