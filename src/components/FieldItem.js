import React from 'react'

const FieldItem = (props)=>{
  let nofields = false
  if(props.fieldItem==="No Fields Exist"){
    nofields = true
  }
  return(
    <div className={`fieldItem ${nofields ? 'noFields' : ''}`}>
      <div className="fieldText" >{props.fieldItem}</div>
      <i className={`fa fa-times fieldDelete ${nofields ? 'hide' : ''}`}
        onClick={()=>{props.handleFieldDelete(props.keyValue, props.fieldkey)}}/>
    </div>
  )
}


export default FieldItem
