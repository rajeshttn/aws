import React from 'react'

import Table from './components/Table'
import Modal from './components/Modal'
import AddLeadForm from './components/AddLeadForm'
import UpdateLeadForm from './components/UpdateLeadForm'
import DeleteLead from './components/DeleteLead'
import { listLeads, addLead, updateLead, deleteLead } from './apis'
import './App.css'

const columns = [{
  name: 'first_name',
  title: 'Name'
}, {
  name: 'email',
  title: 'Email'
}, {
  name: 'mobile',
  title: 'Mobile Num'
}, {
  name: 'location_type',
  title: 'Location Type'
}, {
  name: 'location_string',
  title: 'Location String'
}]

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
      showModalName: '',
      actionedRow: null,
      data: []
    }
  }

  componentDidMount() {
    this.fetchLeads()
  }

  fetchLeads = () => {
    listLeads((err, data) => {
      if (!this.handleError(err)) {
        this.setState({ data })
      }
    })
  }

  handleError = (err) => {
    if (err) {
      let errorMessage = 'Something went wrong, Please contact to admin'
      if (err.message) {
        errorMessage = err.message
      }
      this.setState({ errorMessage, showModalName: 'ErrorModal' })
      return true
    }
    return false
  }

  showAddLeadModal = () => {
    this.setState({ showModalName: 'AddModal' })
  }

  showUpdateLeadModal = () => {
    this.setState({ showModalName: 'UpdateModal' })
  }

  hideModal = () => {
    this.setState({ showModalName: '' })
  }

  onAddLead = (data) => {
    addLead(data, (err, respose) => {
      if (!this.handleError(err)) {
        this.hideModal()
        this.fetchLeads()
      }
    })
  }

  onUpdateLead = (data) => {
    const { actionedRow } = this.state
    updateLead(actionedRow.id, data, (err, respose) => {
      if (!this.handleError(err)) {
        this.hideModal()
        this.fetchLeads()
      }
    })
  }

  onDeleteLead = () => {
    const { actionedRow } = this.state
    deleteLead(actionedRow.id, (err, respose) => {
      if (!this.handleError(err)) {
        this.hideModal()
        this.fetchLeads()
      }
    })
  }

  onMarkUpdate = (event) => {
    this.setState({ showModalName: 'UpdateModal', actionedRow: event.row })
  }

  onDeleteHandler = (event) => {
    this.setState({ showModalName: 'DeleteModal', actionedRow: event.row })
  }

  render() {
    const { data, showModalName, actionedRow, errorMessage } = this.state
    const actions = [
      { title: 'Mark Update', className: 'update_lead_modal_btn', handler: this.onMarkUpdate },
      { title: 'Delete', className: 'delete_lead_modal_btn', handler: this.onDeleteHandler },
    ]
    return (
      <div className="app">
        <div className="add_wrapper">
          <button className="btn add_lead_modal_btn" onClick={this.showAddLeadModal}>Add Lead</button>
        </div>
        <Table className="leads_table" data={data} columns={columns} actions={actions} />
        <Modal
          title={"Add Lead"}
          show={showModalName === 'AddModal'}
          onClose={this.hideModal}>
          <AddLeadForm onClose={this.hideModal} onSave={this.onAddLead} />
        </Modal>
        <Modal
          title={"Mark Communication"}
          show={showModalName === 'UpdateModal'}
          onClose={this.hideModal}
        >
          <UpdateLeadForm onClose={this.hideModal} onSave={this.onUpdateLead} data={actionedRow} />
        </Modal>
        <Modal
          title={"Do you wish to delete this lead?"}
          show={showModalName === 'DeleteModal'}
          onClose={this.hideModal}
        >
          <DeleteLead onClose={this.hideModal} delete={this.onDeleteLead} />
        </Modal>
        <Modal
          title={"Error"}
          show={showModalName === 'ErrorModal'}
          onClose={this.hideModal}
        >
          <div className="error_wrapper">{errorMessage}</div>
        </Modal>
      </div>
    )
  }
}

export default App
