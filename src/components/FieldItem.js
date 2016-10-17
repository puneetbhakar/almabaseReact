import React from 'react'
import {SortableElement} from 'react-sortable-hoc';

const FieldItem = SortableElement((props)=>{
  let nofields = false
  console.log('fieldItem')
  if(props.fieldItem==="No Fields Exist"){
    nofields = true
  }
  return (
    <div className={`fieldItem ${nofields ? 'noFields' : ''}`}>
      <div className="fieldText" >{props.fieldItem}</div>
      <i className={`fa fa-times fieldDelete ${nofields ? 'hide' : ''}`}
        onClick={()=>{props.handleFieldDelete(props.keyValue, props.fieldkey)}}/>
    </div>
  )
})


export default (FieldItem)
