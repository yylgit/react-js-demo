
import React from 'react';

export default class StateTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }

  testClick1() {
    this.setState({
      count: this.state.count +1
    })
    console.log(this.state.count); // 0
    this.setState({
      count: this.state.count +1
    })
    console.log(this.state.count); //0

    this.setState({
      count: this.state.count +1
    })
    console.log(this.state.count); // 0

  }
  testClick2() {
    this.setState({
      count: this.state.count +1
    })
    this.setState((state)=>{
      console.log('1111:',state.count)
      return {
        count: state.count+1
      }
    })
    
    this.setState((state)=>{
      console.log('2222', state.count)
      return {
        count: state.count+1
      }
    })
    console.log(this.state.count); // 0

  }

  render() {
    console.log('===render')
    return (<div>
      <p>count {this.state.count}</p>
      <button onClick={this.testClick1.bind(this)}>testClick1</button>
      <button onClick={this.testClick2.bind(this)}>testClick2</button>
    </div>)
  }
}