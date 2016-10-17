import React from 'react'
import FieldItem from './FieldItem'
import {SortableContainer} from 'react-sortable-hoc';

const FieldList = SortableContainer((props)=>{

  const fieldlist = props.sectionField.map((item,i)=>{
    const fieldKey=props.sectionFieldKey[i]
    return <FieldItem {...props} key={i} index={i} fieldkey={fieldKey} fieldItem={item}/>
  })

  return (
    <div className="fieldList">
      {fieldlist}
    </div>
  )
})


export default (FieldList)
