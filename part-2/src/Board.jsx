import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const winningCombos = [
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },
    { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
    { combo: [0, 3, 6], strikeClass: "strike-column-1" },
    { combo: [1, 4, 7], strikeClass: "strike-column-2" },
    { combo: [2, 5, 8], strikeClass: "strike-column-3" },
  ];

  for (const { combo, strikeClass } of winningCombos) {
    const [a, b, c] = combo;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        strikeClass: strikeClass,
      };
    }
  }

  return null;
}

export default function Board({}) {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const strikeClass = result ? result.strikeClass : "hidden";

  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((square) => square !== null)) {
    status = "Tie Game!";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);

    const newResult = calculateWinner(nextSquares);

    if (newResult && newResult.winner === "X") {
      setXScore(xScore + 1);
    }

    if (newResult && newResult.winner === "O") {
      setOScore(oScore + 1);
    }

    setXIsNext(!xIsNext);
  }

  function newGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <>
      <div className="scoreboard">
        <h2>X Score: {xScore}</h2>
        <h2>O Score: {oScore}</h2>
      </div>

      <div className="status">{status}</div>

      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>

        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>

        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>

        <div className={`strike ${strikeClass}`}></div>
      </div>

      <button className="new-game" onClick={newGame}>
        New Game
      </button>
    </>
  );
}