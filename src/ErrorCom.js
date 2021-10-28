import React from 'react';

export default class ErrorCom extends React.Component {
  render() {
    
    throw 'ErrorCom render error';
    return <div>123123</div>
  }
} 