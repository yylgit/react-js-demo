import React, {Page,Section} from 'react';
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// 一个使用 ThemedButton 的中间组件
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme} style="color: red;" data-theme-button="123">
      Change Theme
      <div>123</div>
    </ThemedButton>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.testRef = React.createRef();

    this.toggleTheme = () => {
      // this.setState(state => ({
      //   theme:
      //     state.theme === themes.dark
      //       ? themes.light
      //       : themes.dark,
      // }));
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  componentDidMount() {
    debugger
    this.toggleTheme();
  }

  render() {
    debugger
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <>
        <ThemeContext.Provider value={this.state.theme}>
          <TestRef name='123'  ref={this.testRef}  />
          <Toolbar changeTheme={this.toggleTheme} data-theme-toolbar="toolbar" />
        </ThemeContext.Provider>
        
      </>
    );
  }
}

class TestRef extends React.Component {
  getName() {

  }
  render() {
    let newProps = {...this.props};
    debugger
    return <div >testref</div>

  }
}