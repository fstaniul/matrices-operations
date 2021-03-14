import React from "react";
import { Operation } from "./operation";
import { Result } from "./Result";

interface CalculatorProps {
  operation: Operation;
}

export function Calculator({ operation }: CalculatorProps) {
  const [firstInput, setFirstInput] = React.useState("");
  const [secondInput, setSecondInput] = React.useState("");

  return (
    <div style={{ padding: "10px 0" }}>
      <label>
        Input matrix: <br />
        <textarea
          rows={5}
          value={firstInput}
          onInput={e => setFirstInput(e.target.value)}
        />
      </label>

      <br />

      <label>
        Input{" "}
        {operation === Operation.SCALAR_MULTIPLICATION
          ? "scalar"
          : "2nd matrix"}
        <br />
        <textarea
          rows={5}
          value={secondInput}
          onInput={e => setSecondInput(e.target.value)}
        />
      </label>

      <br />

      <Result first={firstInput} second={secondInput} operation={operation} />
    </div>
  );
}
