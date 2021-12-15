import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const AnnounceModal: React.FC<{
  show: boolean,
  onHide: () => void
}> = (props) => {
  return (
    <div>
      <Modal
        className="text-dark"
        size="lg"
        show={props.show}
        onHide={props.onHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>2021/12/15 - v0.7.0 Released</h5>
          <h6>✨New Feature</h6>
          <ul>
            <li>Added a jump to column button to Deck.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={props.onHide}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}
