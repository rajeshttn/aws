import React from 'react'

import Form from '../Form'
import { checkFormValidity } from '../../utils'
import './style.css'

class UpdateLeadForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        communication: {
          label: 'Communication',
          type: 'textarea',
          config: {
            name: 'communication',
          },
          validation: {
            required: true,
          },
          value: this.props.data ? this.props.data.communication : '',
          valid: false,
        },
      },
    }
  }

  onFieldChange = (key, value, valid) => {
    const { fields } = this.state
    const field = { ...fields[key], value, valid  }
    fields[key] = field
    this.setState({ fields })
  }

  onSave = () => {
    const data = {}
    Object.keys(this.state.fields).forEach(key => {
      data[key] = this.state.fields[key].value
    })
    this.props.onSave(data)
  }

  render() {
    const { onClose } = this.props
    const { fields } = this.state
    const isSaveEnabled = checkFormValidity(fields)

    return (
      <div className="update_lead">
        <Form 
          className="update_lead_form"
          fields={fields}
          onFieldChange={this.onFieldChange}
        />
        <div className="btn_wrapper">
          <button
            name="close_lead_btn"
            className="close_lead_btn"
            onClick={onClose}>
            Close
          </button>
          <button
            className={`btn update_lead_btn ${!isSaveEnabled ? 'disabled' : ''}`}
            onClick={this.onSave}
            disabled={!isSaveEnabled}>
            Save
          </button>
        </div>
      </div>
    )
  }
}

export default UpdateLeadForm
