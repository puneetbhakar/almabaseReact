import React from 'react'
import FieldItem from './FieldItem'

const FieldList = (props)=>{

  const fieldlist = props.sectionField.map((item,i)=>{
    return <FieldItem {...props} key={i} fieldkey={props.sectionFieldKey[i]} fieldItem={item}/>
  })

  return(
    <div className="fieldList">
      {fieldlist}
    </div>
  )
}


export default FieldList
