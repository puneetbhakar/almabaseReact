import React from 'react'
import FieldList from './FieldList'

const SectionItem = (props)=>{
  return (
    <div className="section">
      <div className="sectionHeader">
        <div className="pull-left sectionName" >{props.section}</div>
        <div className="pull-left sectionChangers"
          onClick={()=>props.handleEditSection(props.keyValue, props.section)}
          >Edit Section</div>
        <div className="pull-left sectionChangers"
         onClick={()=>props.handleSectionDelete(props.keyValue)}
         >Delete</div>
       <div className="pull-right addField"
         onClick={()=>props.handleAddFieldOpen(props.keyValue)}
         >Add Field</div>
      </div>
      <div className="sectionFields">
        <FieldList {...props} sectionField={props.sectionField}/>
      </div>
    </div>
  )
}

export default SectionItem
