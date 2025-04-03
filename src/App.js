import React, { useEffect, useState } from "react";
import "./App.css";

const GRID_SIZE = 11;

function getRandomPosition() {
  return {
    row: Math.floor(Math.random() * GRID_SIZE),
    col: Math.floor(Math.random() * GRID_SIZE),
  }
}

export default function GridGame() {
  const [robotPos, setRobotPos] = useState(getRandomPosition())
  const [targetPos, setTargetPos] = useState(getRandomPosition())
  const [points, setPoints] = useState(0);

  function moveRobot(dRow, dCol) {
    setRobotPos((prevPos) => {
      const nextRow = prevPos.row + dRow;
      const nextCol = prevPos.col + dCol;
      return {
        row: Math.min(GRID_SIZE - 1, Math.max(0, nextRow)),
        col: Math.min(GRID_SIZE - 1, Math.max(0, nextCol))
      }
    });
  }

  function resetGame() {
    setRobotPos(getRandomPosition());
    setTargetPos(getRandomPosition());
    setPoints(0);
  }

  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "ArrowUp") moveRobot(-1, 0);
      if (e.key === "ArrowDown") moveRobot(1, 0);
      if (e.key === "ArrowLeft") moveRobot(0, -1);
      if (e.key === "ArrowRight") moveRobot(0, 1);
    }
    window.addEventListener("keydown", handleKeydown)
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    }
  }, []); // runs after the initial render only

  useEffect(() => {
    if (robotPos.row === targetPos.row && robotPos.col === targetPos.col) {
      setPoints(prevPoints => prevPoints + 1);
      setTargetPos(getRandomPosition()); // resets target position
    }
  }, [robotPos, targetPos]); // runs on every robot or target position change

  return (
    <div className="grid-game">

      {/* Control Area */}
      <div className="control-area">
        <span>Points: {points}</span>
        <button
          onClick={() => resetGame()}
        >
          Reset Game
        </button>
      </div>

      {/* Game Board */}
      <div className="game-board"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 40px)` }}
      >
        {
          Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
            // Compute row and col:
            const row = Math.floor(idx / GRID_SIZE);
            const col = idx % GRID_SIZE;
            const isRobot = robotPos.row === row && robotPos.col === col;
            const isTarget = targetPos.row === row && targetPos.col === col;
            const cellStyle = ((row + col) % 2 === 0) ? "cell-black" : "cell-white";
            return (
              <div key={idx}
                className={`cell ${cellStyle}`}
              >
                <div className="icon">
                  {isRobot ? "🤖" : isTarget ? "⛳️" : ""}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
