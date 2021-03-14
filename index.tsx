import React, { Component } from 'react';
import { render } from 'react-dom';
import { Operation } from './operation';
import './style.css';

interface AppProps { }
interface AppState {
  operation: Operations.SCALAR_MULTIPLICATION,
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      operation: Operation.SCALAR_MULTIPLICATION,
    };
  }

  render() {
    return (
      const { operation } = this.state;

      <div>
        <label>
          Select operation:
          <select value={operation} input={(e) => this.setState({ operation: e.target.value })}>
          </select>
        </label>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
