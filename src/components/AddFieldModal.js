import React from 'react';
import {Modal, Button, ControlLabel} from 'react-bootstrap';

const AddFieldModal = (props)=>{
  let input
  let selected
  return (
    <Modal show={props.pop}>
      <Modal.Header >
        <Modal.Title>Add Field</Modal.Title>
      </Modal.Header>

      <Modal.Body className="form-group">
      <form>
        <label>Field Name</label>
        <input type="text" className="form-control"  ref={(ref) => input = ref} />
      </form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.notpop}>Close</Button>
        <Button bsStyle="primary" style={{backgroundColor: '#00A8C6'}} onClick={()=>{props.onAdd(props.sectionKey, input.value)}}>ADD</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddFieldModal
