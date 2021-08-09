import { useRef } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const AddVideo = ({ onAddVideo, isDuplicate, error }) => {
  const inputRef = useRef();

  const addVideoHandler = e => {
    //assuming YouTube video's id is always 11 characters long
    e.preventDefault();
    const inputValue = inputRef.current.value;
    if (!inputValue) {
      return;
    }
    let id = inputValue;
    if (
      inputValue.startsWith("https://www.youtube.com/") ||
      inputValue.startsWith("https://youtu.be")
    ) {
      id = inputValue.slice(-11);
    }
    onAddVideo(id);
    inputRef.current.value = "";
  };
  return (
    <section>
      <Container>
        <Form onSubmit={addVideoHandler}>
          <Row>
            <Col lg>
              <Form.Group className="mb-3" controlId="formAddVideo">
                <Form.Label>
                  Paste the link or ID of the video you want to add
                </Form.Label>

                <Form.Control type="text" ref={inputRef} />
                {isDuplicate && (
                  <p className="text-primary text-danger mt-3">
                    You've already added this video!
                  </p>
                )}
                {error && (
                  <p className="text-primary text-danger mt-3">{error}</p>
                )}
              </Form.Group>
            </Col>
            <Col lg>
              <Form.Group className="mb-3">
                <Form.Label>My video is on:</Form.Label>
                <Form.Select aria-label="Select the site">
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" size="lg" className="mb-3">
            Dodaj video
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default AddVideo;
