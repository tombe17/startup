import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function MessageDialog(props) {
  return (
    <Modal {...props} show={props.message} centered>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" id="err-btn" onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}