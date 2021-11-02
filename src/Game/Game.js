import { thisExpression } from '@babel/types';
import React from 'react';
import './Game.css'

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.unitCount = 9;
    this.state = {
      currentStep: 0, // 奇数步是X 偶数是O
      stepValues: [
        new Array(this.unitCount).fill(null)
      ]
    }
    
  }
  handleClick(index) {

  }
  render() {
    let currentValues = this.state.stepValues[this.state.currentStep];
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

    let textlist = this.state.stepValues.map((item, index)=>{
      if(index === 0) {
        return (<div>Go to start</div>)
      } else {
        return (<div>Go to move #{index}</div>)
      }
    })
    

    return (
    <div class="container">
      <div className="game-wrap">
          {unitList}
      </div>
      <div class="desc-list">
        Next player: {this.state.currentStep%2 === 0 ? 'X' : "O"}
        {textlist}
      </div>

    </div>
    )

  }
}