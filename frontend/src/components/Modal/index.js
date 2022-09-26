import React from 'react'

import Backdrop from '../Backdrop'
import './style.css'

const Modal = (props) => {
  const { title, show, onClose, children } = props
  if (!show) return null

  return (
    <div >
      <Backdrop show={show} clicked={onClose} />
      <div
        className="modal"
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0'
        }}>
        {title ? <div className="title">{title}</div> : null}
        <button className="btn close_modal" onClick={onClose}> X </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
