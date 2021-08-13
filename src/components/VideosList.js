import { useState, useRef } from "react";
import { Container, Row, Button, Col, Form } from "react-bootstrap";
import List from "./icons/List";
import Grid from "./icons/Grid";
import ListViewDetails from "./ListViewDetails";
import GridViewDetails from "./GridViewDetails";

const VideosList = ({ videos, onDelete, onFavourite, onDeleteAll, onSort, onFilter, filterIsActive }) => {

  const [displayMode, setDisplayMode] = useState("grid");
  const sortRef = useRef();

  const filteredVideos = filterIsActive
    ? videos.filter(vid => vid.isFavourite)
    : videos;

  const contentDisplayGrid = filteredVideos.map(video => (
    <GridViewDetails
      key={video.id}
      video={video}
      onDelete={onDelete}
      onFavourite={onFavourite}
    />
  ));

  const contentDisplayList = filteredVideos.map(video => (
    <ListViewDetails
      key={video.id}
      video={video}
      onDelete={onDelete}
      onFavourite={onFavourite}
    />
  ));

  return (
    <section>
      <Container>
        <Button
          onClick={onFilter}
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
            className="mb-3 me-3"
            aria-label="display videos as grid"
            aria-pressed={displayMode === "grid"}
          >
            <Grid />
          </Button>
        </div>
        <Col xs="12" sm="8" md="4">
          <Form.Group
            className="mb-3"
            onChange={() => onSort(sortRef.current.value)}
          >
            <Form.Label className="fw-bold">Sort:</Form.Label>
            <Form.Select aria-label="sort by" ref={sortRef}>
              <option value="">Select sorting mode</option>
              <option value="uploadOldestFirst">
                Upload date (oldest first)
              </option>
              <option value="uploadNewestFirst">
                Upload date (newest first)
              </option>
              <option value="addOldestFirst">Added date (oldest first)</option>
              <option value="addNewestFirst">Added date (newest first)</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <div aria-live="polite">
          {filteredVideos.length === 0 && videos.length > 0 && (
            <p className="text-center fs-2 my-5">
              You haven't added any videos to favourites yet.
            </p>
          )}
        </div>

        <Row>
          {displayMode === "grid" ? contentDisplayGrid : contentDisplayList}
        </Row>
      </Container>
    </section>
  );
};

export default VideosList;
