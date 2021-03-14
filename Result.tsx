import React from "react";
import { Matrix } from "./matrix";
import { Operation } from "./operation";

function parseMatrix(input: string): Matrix {
  const matrix = input
    .split("\n")
    .filter(Boolean)
    .map(x => x.trim())
    .map(x => x.split(" ").map(k => parseInt(k)));

  if (!matrix[0] || !matrix[0].length) {
    throw new Error(`Please provide a valid matrix!`);
  }

  const columns = matrix[0].length;
  matrix.forEach((row, rowIndex) => {
    if (row.length !== columns) {
      throw new Error(
        `Expected matrix to have ${columns} columns but row ${rowIndex +
          1} had ${row.length}!`
      );
    }

    row.forEach((element, columnIndex) => {
      if (typeof element !== "number" || Number.isNaN(element)) {
        throw new Error(
          `Element on position (${rowIndex + 1}, ${columnIndex +
            1}) is not a number!`
        );
      }
    });
  });

  return matrix;
}

function parseScalar(input: string): number {
  input = input.trim();
  if (!/^-?\d+$/.test(input)) throw new Error("Scalar needs to be a number!");
  return parseInt(input);
}

export function Result({
  first,
  second,
  operation
}: {
  first: string;
  second: string;
  operation: Operation;
}) {
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState("");

  function calculate() {
    try {
      const matrix = parseMatrix(first);
      const secondValue = (Operation.SCALAR_MULTIPLICATION === operation
        ? parseScalar
        : parseMatrix)(second);

      switch (operation) {
        case Operation.SCALAR_MULTIPLICATION:
          setResult(multiplyByScalar(matrix, secondValue as number));
          break;
        case Operation.ADDITION:
          setResult(addMatrices(matrix, secondValue as Matrix));
          break;
        case Operation.MULTIPLICATION:
          setResult(multiplyMatrices(matrix, secondValue as Matrix));
          break;
        default:
          console.error("Unknown operation:", operation);
          throw new Error(
            `Unknown operation ${operation}! System error, please report a bug to administrators!`
          );
      }

      setError("");
    } catch (e) {
      setError(e.message);
      return;
    }
  }

  return (
    <div>
      <button type="button" onClick={calculate} style={{ marginBottom: 20 }}>
        CALCULATE
      </button>

      {error && <pre style={{ color: "red" }}>{error}</pre>}

      {result && (
        <div>
          Result:
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

function multiplyByScalar(matrix: Matrix, scalar: number): string {
  const result = matrix.map(row => row.map(element => element * scalar));
  return formatMatrix(result);
}

function addMatrices(A: Matrix, B: Matrix): string {
  if (A.length !== B.length) {
    throw new Error("Matrices must have same number of rows!");
  }

  if (A[0].length !== B[0].length) {
    throw new Error("Matrices must have same number of columns!");
  }

  const result = new Array(A.length)
    .fill(null)
    .map(_ => new Array(A[0].length));

  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[0].length; j++) {
      result[i][j] = A[i][j] + B[i][j];
    }
  }

  return formatMatrix(result);
}

function multiplyMatrices(A: Matrix, B: Matrix): string {
  if (A[0].length !== B.length) {
    throw new Error(
      `A (${size(A)}) * B (${size(B)}) - A columns must equal B's rows`
    );
  }

  const result = new Array(A.length)
    .fill(null)
    .map(_ => new Array(B[0].length));

  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B[0].length; j++) {
      result[i][j] = 0;
      let action = "0 ";
      for (let k = 0; k < B.length; k++) {
        action += `+ ( ${A[i][k]} x ${B[k][j]} )`;
        result[i][j] += A[i][k] * B[k][j];
      }
      console.log(action, result[i][j]);
    }
  }

  console.log(result);

  return formatMatrix(result);
}

function formatMatrix(matrix: Matrix): string {
  const columnLengths = new Array(matrix[0].length).fill(0);
  for (let j = 0; j < matrix[0].length; j++) {
    for (let i = 0; i < matrix.length; i++) {
      columnLengths[j] = Math.max(
        columnLengths[j],
        matrix[i][j].toString().length
      );
    }
  }
  return matrix
    .map(row =>
      row
        .map((e, columnIndex) =>
          e.toString().padStart(columnLengths[columnIndex], " ")
        )
        .join(" ")
    )
    .join("\n");
}

function size(A: Matrix): string {
  return `${A.length}x${A[0].length}`;
}
