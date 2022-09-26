import React from 'react'

import Form from '../Form'
import { checkFormValidity } from '../../utils'
import './style.css'

class AddLeadForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fields: {
        first_name: {
          label: 'First Name',
          config: {
            name: 'first_name',
            type: 'text',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
        last_name: {
          label: 'Last Name',
          config: {
            name: 'last_name',
            type: 'text',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
        email: {
          label: 'Email Address',
          config: {
            name: 'email',
            type: 'email',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
        },
        mobile: {
          label: 'Mobile',
          config: {
            name: 'mobile',
            type: 'number',
          },
          value: '',
          validation: {
            required: true,
            isNumeric: true,
          },
          valid: false,
        },
        location_type: {
          label: 'Location Type',
          type: 'select',
          config: {
            name: 'location_type',
            options: [
              { value: 'City', title: 'City' },
              { value: 'State', title: 'State' },
              { value: 'Country', title: 'Country' },
            ]
          },
          value: 'City',
          validation: {
            required: true,
          },
          valid: true,
        },
        location_string: {
          label: 'Location String',
          config: {
            name: 'location_string',
            type: 'text',
          },
          value: '',
          validation: {
            required: true,
          },
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
      <div className="add_lead">
        <Form 
          className="add_lead_form"
          fields={fields}
          onFieldChange={this.onFieldChange}
        />
        <div className="btn_wrapper">
          <button
            className="close_lead_btn"
            name="close_lead_btn"
            onClick={onClose}
          >
            Close
        </button>
          <button
            className={`btn add_lead_btn ${!isSaveEnabled ? 'disabled' : ''}`}
            onClick={this.onSave}
            disabled={!isSaveEnabled}
          >
            Save
        </button>
        </div>
      </div>
    )
  }
}

export default AddLeadForm
