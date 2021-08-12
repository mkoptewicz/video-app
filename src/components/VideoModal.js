import { Modal, Button } from "react-bootstrap";
import EmbedVideo from "./EmbedVideo";

const VideoModal = ({ show, onHide, embedLink, title }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmbedVideo embedLink={embedLink} title={title} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VideoModal;
