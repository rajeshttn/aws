import React from 'react'

import './style.css'

const DeleteLead = (props) => (
    <div className="delete_lead_form">
      <button className="btn btn-danger delete_lead_btn" onClick={props.delete}>Delete</button>
      <button className="btn btn-cancel cancel_lead_btn" onClick={props.onClose}>Cancel</button>
    </div>
)

export default DeleteLead