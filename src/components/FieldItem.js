import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { pipe } from 'ramda'

const headingSource = {
    beginDrag(props) {
        return {
            name: props.fieldItem
        }
    }
}

const headingTarget = {
    drop(props, monitor, component) {
        
    }
}
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}
function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

const FieldItem = (props)=>{
  let nofields = false
  if(props.fieldItem==="No Fields Exist"){
    nofields = true
  }
  return props.connectDragSource(props.connectDropTarget(
    <div className={`fieldItem ${nofields ? 'noFields' : ''}`}>
      <div className="fieldText" >{props.fieldItem}</div>
      <i className={`fa fa-times fieldDelete ${nofields ? 'hide' : ''}`}
        onClick={()=>{props.handleFieldDelete(props.keyValue, props.fieldkey)}}/>
    </div>
  ))
}


export default pipe(DragSource('field', headingSource, collect), DropTarget('field', headingTarget, collectDrop))(FieldItem)
