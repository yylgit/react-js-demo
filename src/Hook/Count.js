import React, { useState, useEffect } from 'react';

let renderCount = 0;
export default function Count() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
  renderCount++;
  return (
    <div>
      <p>You clicked {count} times, render times {renderCount}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}