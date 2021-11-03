import React, {useReducer} from 'react';
import './Game.css'
import calculateWinner from './calculateWinner';
// hook的形式  绑定函数不需要用this了 写在函数里边的函数也是挺乱的
let unitCount = 9;
let initState = {
  winner: null,
  currentStep: 0,
  stepValues: [ new Array(unitCount).fill(null)]
}



function reducer(state, action) {
  
  debugger
  switch(action.type) {
    case "setWinner":
      return {
        ...state,
        winner: action.payload
      }
    case "setCurrentStep":
      return {
        ...state,
        currentStep: action.payload
      }
    case "setStepValues":
      return {
        ...state,
        stepValues: action.payload
      }
    case "initState":
      return {
        ...initState
      }
  }
}
export default function GameHook() {
  let unitCount = 9;

  let [state, dispatch] = useReducer(reducer, initState);
  let {currentStep, winner, stepValues} = state;
  debugger
  let currentValues = stepValues[currentStep];
  function setCurrentStep(payload) {
    dispatch({type: 'setCurrentStep', payload})
  }
  function setStepValues(payload) {
    dispatch({type: 'setStepValues', payload})
  }
  function setWinner(payload) {
    dispatch({type: 'setWinner', payload})
  }
  function restart() {
    dispatch({type: 'initState'})
  }


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