import React from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'react-bootstrap';

const CustomModal = props => {
  console.log(props.title);
  return ReactDOM.createPortal(
    <Modal show={true}>
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.content}</p>
        </Modal.Body>
        <Modal.Footer>
          {props.actions}
        </Modal.Footer>
    </Modal>,
    document.querySelector('#modal')
  );
};

export default CustomModal;
