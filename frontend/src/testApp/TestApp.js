import React, { Component, createContext } from 'react'

const countContext = createContext({count: 0, value: 'test'})

class ChildOne extends Component {
  constructor(props) {
    super(props)
    console.log("ChildOne constructor called", props)
    this.state = {
      newCount: props.count + 5
    }
  }

  componentWillMount() {
    console.log("ChildOne componentWillMount called")
  }

  componentDidMount() {
    console.log("ChildOne componentDidMount called")
  }

  componentWillReceiveProps(newProps, props){
    console.log("ChildOne componentWillReceiveProps called", newProps, "this.props", this.props)
    if (newProps.count === 3) {
      // this.state.newCount = 10
      this.setState({newCount : 15})
    }
  }

  shouldComponentUpdate(newProps, newState) {
    console.log("ChildOne componentShouldUpdate called", newProps, newState)
    return newProps.count !== 5
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("ChildOne componentWillUpdate called", nextProps, nextState)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("ChildOne componentDidUpdate called", prevProps, prevState)
  }

  render() {
    console.log("ChildOne render called")
    return (
      <div>
        <div>Welcome to ChildOne App</div>
        <div>Count: {this.props.count}</div>
        <div>newCount: {this.state.newCount}</div>

        <ChildTwo />
      </div>
    )
  }
}

class ChildTwo extends React.PureComponent {
  static contextType = countContext;
  constructor(props) {
    super(props)
    console.log("ChildTwo constructor called")
  }

  componentWillMount() {
    console.log("ChildTwo componentWillMount called")
  }

  componentDidMount() {
    console.log("ChildTwo componentDidMount called")
  }

  render() {
    console.log("ChildTwo render called", this.context)
    return (
      <div>
        <div>Welcome to ChildTwo</div>
        <div>ChildTwo Count: {this.context.count}</div>
      </div>
    )
  }
}

class TestApp extends Component {
  constructor(props) {
    super(props)
    console.log("TestApp constructor called")
    this.state = {
      count : 0
    }
  }

  onIncrementCount = () => {
    this.setState({count: this.state.count + 1})
  }

  onDecementCount = () => {
    this.setState({count: this.state.count - 1})
  }

  componentWillMount() {
    console.log("TestApp componentWillMount called")
  }

  componentDidMount() {
    console.log("TestApp componentDidMount called")
  }

  render() {
    console.log("TestApp render called")
    return (
      <div>
        <h3>Welcome to Test App</h3>
        <h4> Count: {this.state.count} </h4>

        <countContext.Provider value={{count: this.state.count}}>
          <ChildOne count={this.state.count} />
        </countContext.Provider>
        
        <button onClick={this.onIncrementCount}>Increment</button>
        <button onClick={this.onDecementCount}>Decement</button>

      </div>
    )
  }
}

export default TestApp