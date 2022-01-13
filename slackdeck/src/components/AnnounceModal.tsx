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
          <h5>2022/1/13 - v0.7.1 Released</h5>
          <h6>✨New Feature</h6>
          <ul>
            <li>Columns can now be duplicated.</li>
          </ul>
          <h6>👍Feature Improvement</h6>
          <ul>
            <li>The default column width can now be changed.</li>
            <li>The column name can now be set when adding a column.</li>
            <li>Add a horizontal scroll bar.</li>
          </ul>
          <h6>🐛 Bug Fix</h6>
          <ul>
            <li>Fixed a bug that columns were added with the previously set column width when adding a column with the default value after changing the column width from the default value.</li>
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
