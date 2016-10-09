import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const EditSectionModal = (props)=>{
  let input
  let selectedSection
  let selectedPosition
  return (
    <Modal show={props.pop}>
      <Modal.Header >
        <Modal.Title>Edit Section</Modal.Title>
      </Modal.Header>
      <Modal.Body className="form-group">
      <form>
        <div className="form-group">
        <label>Section Name</label>
        <input type="text" className="form-control" defaultValue={props.sectionName}  ref={(ref) => input = ref} />
        </div>
        <div><label>Order Position</label></div>
        <div className="form-group">
        <div className="col-xs-3" style={{marginBottom: '20px'}}>
          <select className="form-control pull-left" style={{display: 'inline-block'}} ref={(ref)=>{selectedPosition=ref}}>
            <option value="Above">Above</option>
            <option value="Below">Below</option>
          </select>
        </div>
        <div className="col-xs-3" style={{marginBottom: '20px'}}>
          <select className="form-control" style={{display: 'inline-block'}} ref={(ref)=>{selectedSection=ref}}>
            {props.sectionlist}
          </select>
        </div>
        </div>
      </form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.notpop}>Close</Button>
        <Button bsStyle="primary" style={{backgroundColor: '#00A8C6'}}
          onClick={()=>{props.onAdd(input.value,selectedSection.value,selectedPosition.value)}}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditSectionModal
