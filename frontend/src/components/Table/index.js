import React from 'react'
import './style.css'

class Table extends React.Component {

  render() {
    const { columns, data, actions = [], className = '' } = this.props

    const renderColumns = columns.map((col, index) => <th key={index}>{col.title}</th>)
    if (actions.length) {
      renderColumns.push(<th key='action'>Action</th>)
    }

    const renderRows = data.map((row, index) => {
      const renderRow = columns.map((col, index) => (<td key={index}>{row[col.name]}</td>))
      if (actions.length) {
        const renderActions = actions.map(({ className = '', title, handler }, index) => {
          const actionHandler = (event) => {
            event.row = row
            handler(event)
          }
          return (<button key={index} className={`btn action ${className}`} onClick={actionHandler}> {title} </button>)
        })
        renderRow.push(<td key="action">{renderActions}</td>)
      }
      return (
        <tr key={index}>
          {renderRow}
        </tr>
      )
    })

    return (
      <table className={`datatable ${className}`}>
        <thead>
          <tr>{renderColumns}</tr>
        </thead>
        <tbody>
          {renderRows}
        </tbody>
      </table>
    )
  }
}

export default Table
