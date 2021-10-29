import React, {useCallback, useState, useMemo} from "react";

window.handleClick2 = null
export default function UseCallBack(){
  const [data1,setData1] = useState(0);
  const [data2,setData2] = useState(0);
  const handleClick1 = ()=>{
    setData1(data1+1)
  }
  // const handleClick2 = ()=>{
  //   setData2(data2+1)
  // }
  // 点击Cheap组件的时候 重新渲染 handleClick2函数会重新赋值 导致属性变化 所以默认Expensive也会重新渲染
  // 用了 useCallback 为了让handleClick2的值没有变化 配合React.memo的props浅比较 就会避免Expensive的重新渲染

  const handleClick2 = useCallback(
    ()=>{
      setData2(data2+1);
    },
    [data2]
  )
  const memoValue = useMemo(()=>{
    return {
      data: 'addon:' + data1
    }
  },[data1])

  // const memoValue = {
  //       data: 'addon:' + data1
  // }
  if(!window.handleClick2) {
    window.handleClick2 = handleClick2;
  } else {
    console.log(window.handleClick2 === handleClick2)
  }

  // 注意这么写的话 props.children数组每次都是不一样的
  return (
    <div>
      <Cheap onClick={handleClick1} data={data1}></Cheap>
      <Expensive onClick={handleClick2} data={data2}></Expensive>
      <MemoValue memoValue={memoValue}></MemoValue>
    </div>
  );
}

function Cheap(props) {
  console.log('Cheap render')
  return (<div {...props} >Cheap:{props.data}</div>)
}

// function Expensive(props) {
//   console.log('Expensive render')
//   return (<div {...props} >Expensive:{props.data}</div>)
// }

// function MemoValue(props) {
//   console.log('MemoValue render')
//   return (<div >MemoValue:{props.memoValue.data}</div>)
// }

const MemoValue = React.memo(function (props) {
  console.log('MemoValue render')
  return (<div >MemoValue:{props.memoValue.data}</div>)
});

const Expensive = React.memo((props)=> {
  // debugger
  console.log('Expensive render')
  return (<div {...props} >Expensive:{props.data}</div>)
}
// , function(preProps, nextProps) {
//   debugger
//   return true; 
// }
)