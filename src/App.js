import React, { useEffect, useState } from "react";
import "./App.css";

const GRID_SIZE = 10;

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

export default function Game() {
  const [robot, setRobot] = useState(getRandomPosition());
  const [candy, setCandy] = useState(getRandomPosition());
  const [candiesEaten, setCandiesEaten] = useState(0);

  const moveRobot = (dx, dy) => {
    setRobot((prev) => {
      const newX = Math.max(0, Math.min(GRID_SIZE - 1, prev.x + dx));
      const newY = Math.max(0, Math.min(GRID_SIZE - 1, prev.y + dy));
      return {
        x: newX,
        y: newY
      };
    });
  };

  const resetGame = () => {
    setRobot(getRandomPosition());
    setCandy(getRandomPosition());
    setCandiesEaten(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") moveRobot(-1, 0);
      if (e.key === "ArrowDown") moveRobot(1, 0);
      if (e.key === "ArrowLeft") moveRobot(0, -1);
      if (e.key === "ArrowRight") moveRobot(0, 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // cleanup
  }, []); // runs only once after the initial render

  useEffect(() => {
    if (robot.x === candy.x && robot.y === candy.y) {
      setCandiesEaten((count) => count + 1);
      setCandy(getRandomPosition());
    }
  }, [robot, candy]); // runs every time robot or candy changes

  return (
    <div className="container">

      {/* Game Status */}
      <div className="controls">
        <button className="reset-button"
          onClick={resetGame}
        >
          Reset Game
        </button>
        <div className="counter">
          Points Earned: {candiesEaten}
        </div>
      </div>

      {/* Game Board */}
      <div className="grid">
        {
          Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
            const x = Math.floor(idx / GRID_SIZE);
            const y = idx % GRID_SIZE;
            const isRobot = (x === robot.x && y === robot.y);
            const isCandy = (x === candy.x && y === candy.y);
            return (
              <div key={idx}
                className={`cell ${isRobot ? "robot" : isCandy ? "candy" : ""}`}
              >
                <p className={`${isRobot || isCandy ? "icon" : "coord"}`} >
                  {isRobot ? "🤖" : isCandy ? "🍬" : `[${x},${y}]`}
                </p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
