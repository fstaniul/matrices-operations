import React, { Component } from "react";
import { render } from "react-dom";
import { Calculator } from "./Calculator";
import { Operation, Operations } from "./operation";
import "./style.css";

interface AppProps {}
interface AppState {
  operation: Operation.SCALAR_MULTIPLICATION;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      operation: Operation.SCALAR_MULTIPLICATION
    };
  }

  render() {
    const { operation } = this.state;

    return (
      <div>
        <label>
          <span>Select operation: </span>
          <select
            value={operation}
            onInput={e => this.setState({ operation: e.target.value })}
          >
            {Operations.map(operation => (
              <option value={operation}>{Operation[operation]}</option>
            ))}
          </select>
          <Calculator operation={operation} />
        </label>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
