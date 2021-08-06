import { Button, Form, Container, Row, Col } from "react-bootstrap";

const AddVideo = () => {
  return (
    <section>
      <Container>
        <Form>
          <Row>
            <Col lg>
              <Form.Group className="mb-3" controlId="formAddVideo">
                <Form.Label>
                  Paste the link or ID of the video you want to add
                </Form.Label>
                <Form.Control id="addVideo" type="text" />
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
          <Button size="lg" className="mb-3">
            Dodaj video
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default AddVideo;
