import * as firebase from 'firebase'

export const GET_SECTIONS = 'GET_SECTIONS';
export const GET_FIELDS = 'GET_FIELDS';

//configuration for firebase
var config = {
    apiKey: "AIzaSyC3dfwbLKimfRTKL0qJP2mzW2EFs7b-PBc",
    authDomain: "almabase-3740a.firebaseapp.com",
    databaseURL: "https://almabase-3740a.firebaseio.com",
    storageBucket: "almabase-3740a.appspot.com",
    messagingSenderId: "453500135937"
  };

firebase.initializeApp(config)

const db = firebase.database()
const SRef = db.ref().child('sections')//refrence to sections in database
const FRef = db.ref().child('fields')//refrence to fields in database

//function for adding section
export function addSection(name,section,position,sortedSectionKeys){

  return function(dispatch){
    let newPosition = parseInt(section)+parseInt(position)
    if (newPosition <= sortedSectionKeys.length){
      dispatch(setNewPosition(sortedSectionKeys,newPosition))
    }
    console.log(parseInt(section)+parseInt(position))
    SRef.push({
      title: name,
      position: newPosition
    })
  }
}
//function to set new position value of section after adding new section
export function setNewPosition(sortedSectionKeys,index){
  return function(dispatch){
    sortedSectionKeys.forEach((key,i)=>{
      if((index-1)<=i){
        SRef.child(key).update({position: (i+2)})
      }
    })
  }
}
//adding new field
export function addField(sectionKey, name){
  return function(dispatch){
    const fieldkey = FRef.push().key
    const fieldData = {fieldname: name}
    const updates = {}
    updates['/sections/'+sectionKey+'/fields/'+fieldkey] = true
    updates['/fields/'+ fieldkey] = fieldData
    firebase.database().ref().update(updates);
  }
}

//edit existing section
export function editSection(sid, name,section,position,sortedSectionKeys){
  return function(dispatch){
    let newPosition
    SRef.child(sid).once('value').then((snap)=>{
      let currentPosition = snap.val().position
      if(position==="Above"){
        if(currentPosition<section){
          newPosition = parseInt(section)-1
        }else{
          newPosition = parseInt(section)
        }
      }
      if(position==="Below"){
        if(currentPosition<section){
          newPosition = parseInt(section)
        }
        else{
          newPosition = parseInt(section) + 1
        }
      }
      sortedSectionKeys.splice(newPosition-1,0,sortedSectionKeys.splice(currentPosition-1,1)[0])
      dispatch(newPositionAfterDeletion(sortedSectionKeys))
    })
    SRef.child(sid).update({
      title: name
      })
  }
}
//set position value after deletion
export function newPositionAfterDeletion(sortedSectionKeys){
  return function(dispatch){
    sortedSectionKeys.forEach((keys,i)=>{
      SRef.child(keys).update({position: i+1})
    })
  }
}

//retrieves the sections
export function getSections(){
  return function(dispatch){
    SRef.orderByChild('position').on('value',snap=>{
      dispatch({
        type: GET_SECTIONS,
        payload: snap.val()
      })
    })
  }
}

//retrieves the fields
export function getFields(){
  return function(dispatch){
    FRef.on('value',snap=>{
      dispatch({
        type: GET_FIELDS,
        payload: snap.val()
      })
    })
  }
}

//deletion of the sections
export function removeSection(sid,sortedSectionKeys){
  return function(dispatch){
    SRef.child(sid).once('value').then((snap=>{
      let fieldChild = snap.child('fields').hasChildren()
      if(fieldChild){
        snap.child('fields').forEach((fid)=>{
          FRef.child(fid.key).remove()
        })
      }
      let position = snap.val().position
      if (position < sortedSectionKeys.length){
        dispatch(positionAfterDeletion(position,sortedSectionKeys))
      }
    }))
    SRef.child(sid).remove()
  }
}

//sets new position value after deletion of section
export function positionAfterDeletion(position,sortedSectionKeys){
  return function(dispatch){
    sortedSectionKeys.forEach((keys,i)=>{
      if((position-1)<i){
        SRef.child(keys).update({position: i})
      }
    })
  }
}

//remove the fields
export function removeField(sid,fid){
  return function(dispatch){
    console.log(sid+'/'+fid)
    SRef.child(sid).child('fields').child(fid).remove()
    FRef.child(fid).remove()
  }
}
