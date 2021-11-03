import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Context from './Context';
import Context2 from './Context2';
import TestError from './TestError';
import Reservation from "./Reservation";
import NameForm from './NameForm';
import Count from './Hook/Count';
import Memo from "./Hook/Memo";
import StateTest  from './StateTest';
import Focus from './Focus'
import UseCallBack from './Hook/UseCallBack';
import Game from './Game/Game';
import GameHook from './Game/GameHook';
import GameReducer from './Game/GameReducer';

import('./split').then((splitMod)=>{
  console.log(splitMod.add(1,2));
}) 


function TestFrag() {
  return (
    <>
  <div>
  11111
  </div>
  <div>
  222222
  </div>
  </>
  )
}


const OtherComponent = React.lazy(() => {
  return import('./OtherComponent')
});
// const OtherComponent = React.lazy(() => {
//   return new Promise(function(resolve, reject) {
//     setTimeout(()=>{
//       debugger
//       resolve({
//         default : FlavorForm
//       })
//     },3000)
//   })
// });
const AnotherComponent = React.lazy(() => {
  return new Promise(function(resolve, reject) {
    setTimeout(()=>{
      resolve({
        default: Reservation
      })
    },2000)
  })
});

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent children="haha" className='123' style={{color: 'red'}}><div>OtherComponent</div></OtherComponent>
          <div style={{background: 'red'}}>11111111111111</div>
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}


ReactDOM.render(
  // <>
  // <Count />
  // <Count />
  // <Memo />

  // </>
  // <Context2></Context2>
  // <MyComponent />
  // <StateTest></StateTest>
  // <Focus></Focus>
  // <UseCallBack></UseCallBack>
  // <Game></Game>
  // <GameHook></GameHook>
  <GameReducer></GameReducer>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
