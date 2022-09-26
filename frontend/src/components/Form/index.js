import React from 'react'

import Input from './Input'
import { checkValidity } from '../../utils'

const Form = (props) => {
  const { fields = {}, className = '', onFieldChange } = props

  const onChange = (event, key) => {
    const field = { ...fields[key] }
    const value = event.target.value
    const valid = checkValidity(value, field.validation)
    onFieldChange(key, value, valid)
  }

  return (
    <form className={`form ${className}`}>
      {Object.keys(fields).map((key, index) => (
        <div key={index} className="field">
          <Input
            key={index}
            onChange={event => onChange(event, key)}
            {...fields[key]}
          />
          <br />
        </div>
      ))}
    </form>
  )
}

export default Form
