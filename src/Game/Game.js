import React from 'react';
import './Game.css'
import calculateWinner from './calculateWinner';
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.unitCount = 9; // 单元个数
    this.initState = {
      currentStep: 0, // 奇数步是X 偶数是O
      stepValues: [
        new Array(this.unitCount).fill(null) // 0次是所有单元都是null
      ],
      winner: null
    }
    this.state = {
      ...this.initState
    }
  }
  handleClick(index) {
    if(this.state.winner) {
      alert('game over winner is' + this.state.winner);
      return;
    }
    // 点击之后 增加一个step 和currentStep
    let preStep = this.state.currentStep;
    this.preValues = this.state.stepValues[preStep];
    this.target = this.preValues.slice();
    this.target[index] = preStep % 2 === 0 ? 'X' : 'O';
    //  放弃当前点击之后的step
    let newValues = this.state.stepValues.slice(0,preStep+1);
    newValues.push(this.target)
    this.setState({
      currentStep: preStep + 1,
      stepValues: newValues
    })
    this.checkWinner(this.target)
    
  }
  checkWinner(target) {
    let winner = calculateWinner(target);
    if(winner) {
      this.setState({
        winner
      })
      setTimeout(()=>{
        alert('game over winner is: ' + winner);
      },0)
    } else {
      this.setState({
        winner: null
      })
    }
  }
  // react中的事件绑定的第一个参数是合成的event对象
  restart(e) {
    this.setState({
      ...this.initState
    })  
  }
  jumpTo(index) {
    this.setState({
      currentStep: index,
    });

    this.checkWinner(this.state.stepValues[index])
  }
  render() {
    let currentValues = this.state.stepValues[this.state.currentStep];
    // 渲染列表通过遍历数组 返回元素列表的变量 
    // 2中列表渲染的方式 一种是单独提出变量 另一种是写在 jxs的 {}中 以表达式的形式
    let unitList = currentValues.map((value, index)=>{
      return (<div className="game-item" 
                    onClick={()=>{
                      this.handleClick(index)
                    }}
                    key={index}
                    data-item={index}>
                {value}
              </div>)
    })

    // 这种在vue中用v-if 的部分 也需要提取变量比较好 jsx就好像是最后写模版渲染 前面是获取变量的值
    let status = '';
    if(this.state.winner) {
      status = "Winner is: " + this.state.winner
    } else {
      status = ` Next player: ${this.state.currentStep % 2 === 0 ? 'X' : "O"}`
    }
    
    return (
    <div className="container">
      <div className="game-wrap">
          {unitList}
      </div>
      <div className="desc-list">
        {status}       
        {
          // jsx的表达式中渲染列表
        this.state.stepValues.map((item, index)=>{
          if(index === 0) {
            return (<div key={index} onClick={this.restart.bind(this)}>restart Game</div>)
          } else {
            return (<div key={index}onClick={()=>{this.jumpTo(index)}} >Go to move #{index}</div>)
          }
        })
        }
      </div>

    </div>
    )

  }
}