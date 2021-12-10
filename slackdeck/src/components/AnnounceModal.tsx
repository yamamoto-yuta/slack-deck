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
          <h5>2021/12/10 - Add announcement modal</h5>
          <p>
            Added a modal to announce important changes, etc. Please check it periodically in the future.
          </p>
          <p>
            The detailed change history can be found on the &nbsp;
            <a href="https://github.com/yamamoto-yuta/slack-deck/releases" target="_blank">
              Release
            </a>
            &nbsp; page.
          </p>
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
