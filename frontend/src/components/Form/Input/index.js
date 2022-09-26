import React from 'react'

import './style.css'

const Input = props => {
  let element = null
  switch (props.type) {
    case 'textarea':
      element = (
        <textarea
          className="textarea"
          {...props.config}
          value={props.value}
          rows="4"
          onChange={props.onChange}
        />
      )
      break
    case 'select':
      element = (
        <select
          className="select"
          name={props.config.name}
          value={props.value}
          onChange={props.onChange}
        >
          {props.config.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
      )
      break
    default:
      element = <input
        className="input"
        {...props.config}
        value={props.value}
        onChange={props.onChange} />
  }

  const renderRequired = props.validation && props.validation.required ? <span className="required">*</span> : null

  return (
    <div className="form-group">
      <label className="label">{props.label} {renderRequired}</label>
      {element}
    </div>
  )
}

export default Input
