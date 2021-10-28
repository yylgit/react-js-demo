import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import ErrorCom from './ErrorCom';
export default class TestError extends React.Component {
  render() {
    return (
      <>
      <ErrorBoundary>
        <ErrorCom></ErrorCom>
      </ErrorBoundary>
      <ErrorBoundary>
       <p>12312312321231231231</p>
     </ErrorBoundary>
     </>
    )
  }
}