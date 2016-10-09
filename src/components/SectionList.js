import React from 'react'
import SectionItem from './SectionItem'

const SectionList = (props) => {


  const sectionlist = Object.keys(props.section).map((key)=>{
    const sectionField = []
    const sectionFieldKey = []
    if(props.fields!=null && props.section[key].fields){
      Object.keys(props.section[key].fields).map((fieldKey)=>{
        sectionFieldKey.push(fieldKey)
        sectionField.push(props.fields[fieldKey].fieldname)
      })
    }else{
      sectionField.push('No Fields Exist')
    }
    return (
      <SectionItem
        {...props}
        key={key}
        sectionField={sectionField}
        sectionFieldKey={sectionFieldKey}
        keyValue={key}
        section={props.section[key].title}
      />
    )
  })
  return (
    <div>{sectionlist}</div>
  )
}

export default SectionList
