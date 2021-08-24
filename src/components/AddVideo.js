import { useRef } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import getIdFromInput from "../lib/getIdFromInput";

const AddVideo = ({ onAddVideo, onLoadDemo, isDuplicate, error }) => {
  const inputRef = useRef();
  const videoTypeRef = useRef();

  const addVideoHandler = e => {
    e.preventDefault();

    const inputValue = inputRef.current.value.trim();

    if (!inputValue) {
      return;
    }

    const videoType = videoTypeRef.current.value;
    const id = getIdFromInput[videoType](inputValue);

    onAddVideo(id, videoType);
    inputRef.current.value = "";
  };
  return (
    <section>
      <Container>
        <Form onSubmit={addVideoHandler}>
          <Row>
            <Col lg>
              <Form.Group
                className="mb-3"
                controlId="formAddVideo"
                aria-live="polite"
              >
                <Form.Label className="fw-bold">
                  Paste the link or ID of the video you want to add
                </Form.Label>

                <Form.Control type="text" ref={inputRef} />
                {isDuplicate && (
                  <p className="text-primary text-danger mt-3">
                    Video is already in your collection
                  </p>
                )}
                {error && (
                  <p className="text-primary text-danger mt-3">{error}</p>
                )}
              </Form.Group>
            </Col>
            <Col lg>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">My video is on:</Form.Label>
                <Form.Select aria-label="Select the site" ref={videoTypeRef}>
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                  <option value="dailymotion">Dailymotion</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" size="lg" className="mb-3 me-3">
            Add video
          </Button>
          <Button
            onClick={onLoadDemo}
            type="button"
            variant="success"
            size="lg"
            className="mb-3"
          >
            Load demo videos
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default AddVideo;
