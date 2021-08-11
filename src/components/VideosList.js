import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import List from "./icons/List";
import Grid from "./icons/Grid";
import ListViewDetails from "./ListViewDetails";
import GridViewDetails from "./GridViewDetails";

const VideosList = ({ videos, onDelete, onFavourite, onDeleteAll }) => {
  const [filterIsActive, setFilterIsActive] = useState(false);
  const [displayMode, setDisplayMode] = useState("grid");

  const toggleFilterHandler = () =>
    setFilterIsActive(filterIsActive => !filterIsActive);

  const filteredVideos = filterIsActive
    ? videos.filter(vid => vid.isFavourite)
    : videos;

  const contentDisplayGrid = filteredVideos.map(video => (
    <GridViewDetails
      key={video.id}
      video={video}
      onDelete={onDelete}
      onFavourite={onFavourite}
      displayMode={displayMode}
    />
  ));

  const contentDisplayList = filteredVideos.map(video => (
    <ListViewDetails
      key={video.id}
      video={video}
      onDelete={onDelete}
      onFavourite={onFavourite}
      displayMode={displayMode}
    />
  ));

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
            onClick={() => setDisplayMode("list")}
            variant="secondary"
            className="mb-3 me-3"
            aria-label="display videos as list"
            aria-pressed={displayMode === "list"}
          >
            <List />
          </Button>
          <Button
            onClick={() => setDisplayMode("grid")}
            variant="secondary"
            className="mb-3"
            aria-label="display videos as grid"
            aria-pressed={displayMode === "grid"}
          >
            <Grid />
          </Button>
        </div>
        {filteredVideos.length === 0 && (
          <p className="text-center fs-2 my-5">
            You haven't added any videos to favourites yet.
          </p>
        )}
        <Row>
          {displayMode === "grid" ? contentDisplayGrid : contentDisplayList}
        </Row>
      </Container>
    </section>
  );
};

export default VideosList;
