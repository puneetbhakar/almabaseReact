import React, {Component} from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { pipe } from 'ramda'
import {compose} from 'redux'

const headingSource = {
    beginDrag(props) {
        console.log('beginDrag')
        return {text: "random"}
    },
    endDrag(){
      console.log('drag ended')
      return{}
    }
}

const headingTarget = {
    drop() {

    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
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

class Random extends Component{
  render(){
  return this.props.connectDragPreview(this.props.connectDropTarget(this.props.connectDragSource(
    <div>This is Random Text.</div>
  )))
}
}

export default compose(DragSource('random', headingSource, collect), DropTarget('random', headingTarget, collectDrop)) (Random)
