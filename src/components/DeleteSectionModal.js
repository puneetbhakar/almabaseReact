import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const DeleteSectionModal = (props)=>{
  return (
    <Modal show={props.pop}>
      <Modal.Header >
        <Modal.Title>Delete Section</Modal.Title>
      </Modal.Header>

      <Modal.Body className="form-group">
        <div>Are You Sure?</div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.notpop}>Close</Button>
        <Button bsStyle="primary" style={{backgroundColor: '#00A8C6'}} onClick={()=>{props.onDelete(props.sectionKey)}}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteSectionModal
