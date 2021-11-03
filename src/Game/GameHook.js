import React, {useState} from 'react';
import './Game.css'
import calculateWinner from './calculateWinner';
// hook的形式  绑定函数不需要用this了 写在函数里边的函数也是挺乱的
export default function GameHook() {
  let unitCount = 9;
  let [winner, setWinner] = useState(null);
  let [currentStep, setCurrentStep] = useState(0);
  let [stepValues, setStepValues] = useState([ new Array(unitCount).fill(null)]);


  let currentValues = stepValues[currentStep];

  function handleClick(index) {
    if(winner) {
      alert('game over winner is' + winner);
      return;
    }
    // 点击之后 增加一个step 和currentStep
    let preStep = currentStep;
    let preValues = stepValues[preStep];
    // 已经选中则返回
    if(preValues[index]) {
      return;
    }
    let target = preValues.slice();
    target[index] = preStep % 2 === 0 ? 'X' : 'O';
    //  放弃当前点击之后的step
    let newValues = stepValues.slice(0, preStep+1);
    newValues.push(target);
    debugger
    setCurrentStep(preStep + 1);
    setStepValues(newValues);
    checkWinner(target);
  }

  function checkWinner(target) {
    let winner = calculateWinner(target);
    if(winner) {
      setWinner(winner)
      setTimeout(()=>{
        alert('game over winner is: ' + winner);
      },0)
    } else {
      setWinner(null)
    }
  }

  function restart() {
    setWinner(null);
    setCurrentStep(0);
    setStepValues([new Array(unitCount).fill(null)]);
  }

  function jumpTo(index) {
    setCurrentStep(index);
    checkWinner(stepValues[index])
  }

  let unitList = currentValues.map((value, index)=>{
    return (<div className="game-item" 
                  onClick={()=>{handleClick(index)}}
                  key={index}
                  data-item={index}>
              {value}
            </div>)
  })

  // 这种在vue中用v-if 的部分 也需要提取变量比较好 jsx就好像是最后写模版渲染 前面是获取变量的值
  let status = '';
  if(winner) {
    status = "Winner is: " + winner
  } else {
    status = ` Next player: ${currentStep % 2 === 0 ? 'X' : "O"}`
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
        stepValues.map((item, index)=>{
          if(index === 0) {
            return (<div key={index} onClick={restart}>restart Game</div>)
          } else {
            // 要控制传参数 就要写内置的函数
            return (<div key={index}onClick={()=>{jumpTo(index)}} >Go to move #{index}</div>)
          }
        })
        }
      </div>

    </div>
  )
}