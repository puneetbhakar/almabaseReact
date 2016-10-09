import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import SectionList from '../components/SectionList'
import AddSectionModal from '../components/AddSectionModal'
import EditSectionModal from '../components/EditSectionModal'
import AddFieldModal from '../components/AddFieldModal'
import DeleteSectionModal from '../components/DeleteSectionModal'
import {Grid, Row, Col, Button} from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddSectionModal: false,
      showAddFieldModal: false,
      showDeleteModal: false,
      showEditSectionModal: false,
      sectionKey: null,
      sectionName: null}
  }

  openAddSection(){
    this.setState({ showAddSectionModal: true })
  }

  closeAddSection() {
    this.setState({ showAddSectionModal: false })
  }

  openDeleteSection(key){
    this.setState({
      showDeleteModal: true,
      sectionKey: key})
  }

  closeDeleteSection(){
    this.setState({
      showDeleteModal: false,
      sectionKey: null})
  }

  openEditSection(key,name){
    this.setState({
      showEditSectionModal: true,
      sectionKey: key,
      sectionName: name})
  }

  closeEditSection(){
    this.setState({
      showEditSectionModal: false,
      sectionKey: null,
      sectionName: null})
  }

  handleEditSection(name,section,position,sortedSectionKeys){
    this.props.actions.editSection(this.state.sectionKey,name,section,position,sortedSectionKeys)
    this.closeEditSection()
  }

  openAddField(key){
    this.setState({
      showAddFieldModal: true,
      sectionKey: key})
  }

  closeAddField(){
    this.setState({
      showAddFieldModal: false,
      sectionKey: null})
  }

  handleAddSection(name,section,position,sortedSectionKeys){
    this.props.actions.addSection(name,section,position,sortedSectionKeys)
    this.closeAddSection()
  }

  handleAddField(key,name){
    this.props.actions.addField(key,name)
    this.closeAddField()
  }

  handleDeleteSection(sid,sortedSectionKeys){
    this.props.actions.removeSection(sid,sortedSectionKeys)
    this.closeDeleteSection()
  }

  sortingSectionList(){
    const section = this.props.sections
    const sectionKey =  Object.keys(section)
    let sortedSectionKey = []
    let sortedList = {}
    sectionKey.forEach((key)=>{
      sortedSectionKey[(section[key].position)-1] = key
    })
    sortedSectionKey.forEach((key)=>{
      sortedList[key] = section[key]
    })
    return sortedList
  }

  handleFieldDelete(sectionKey,fieldKey){
    this.props.actions.removeField(sectionKey,fieldKey)
  }

  componentWillMount(){
    this.props.actions.getSections()
    this.props.actions.getFields()
  }

  render() {
    const sortedSection = this.sortingSectionList()
    const sortedSectionKeys = Object.keys(sortedSection)
    const fields = this.props.fields
    const sectionSelectionlist = Object.keys(sortedSection).map((keys)=>{
        return <option key={keys} value={sortedSection[keys].position}>{sortedSection[keys].title}</option>
    })

    return (
      <Grid className="OuterApp">
        <Row className="show-grid" className="App">
          <Col  className="AppContent">
            <div className="panelHeader">
            <div className="pull-left" style={{fontSize:'15px',paddingTop:'15px',fontWeight:'bold'}}>Profile View</div>
            <Button className="pull-right addSectionButton" onClick={()=>this.openAddSection()}>ADD NEW SECTION</Button>
            </div>
            <AddSectionModal
              pop={this.state.showAddSectionModal}
              notpop={()=>this.closeAddSection()}
              onAdd={(name,section,position)=>{this.handleAddSection(name,section,position,sortedSectionKeys)}}
              sectionlist={sectionSelectionlist}
              />
            <AddFieldModal
                pop={this.state.showAddFieldModal}
                notpop={()=>this.closeAddField()}
                onAdd={(key,name)=>{this.handleAddField(key,name)}}
                sectionKey={this.state.sectionKey}
                />
            <DeleteSectionModal
                pop={this.state.showDeleteModal}
                notpop={()=>this.closeDeleteSection()}
                onDelete={(sid)=>this.handleDeleteSection(sid,sortedSectionKeys)}
                sectionKey={this.state.sectionKey}
              />
            <EditSectionModal
              pop={this.state.showEditSectionModal}
              notpop={()=>this.closeEditSection()}
              onAdd={(name,section,position)=>{this.handleEditSection(name,section,position,sortedSectionKeys)}}
              sectionlist={sectionSelectionlist}
              sectionName={this.state.sectionName}
              />
            <SectionList
              handleAddFieldOpen={(sectionKey)=>{this.openAddField(sectionKey)}}
              handleSectionDelete={(sectionKey)=>{this.openDeleteSection(sectionKey)}}
              handleEditSection={(sectionKey,sectionName)=>{this.openEditSection(sectionKey,sectionName)}}
              handleFieldDelete={(sectionKey,fieldKey)=>{this.handleFieldDelete(sectionKey,fieldKey)}}
              section={sortedSection}
              fields={fields}
              />
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    sections: state.sections.sections,
    fields: state.fields.fields
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}



export default connect(mapStateToProps, mapDispatchToProps )(App);
