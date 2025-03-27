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
            return { x: newX, y: newY };
        });
    };

    const resetGame = () => {
        setRobot(getRandomPosition());
        setCandy(getRandomPosition());
        setCandiesEaten(0);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowUp") moveRobot(0, -1);
            if (e.key === "ArrowDown") moveRobot(0, 1);
            if (e.key === "ArrowLeft") moveRobot(-1, 0);
            if (e.key === "ArrowRight") moveRobot(1, 0);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (robot.x === candy.x && robot.y === candy.y) {
            setCandiesEaten((count) => count + 1);
            setCandy(getRandomPosition());
        }
    }, [robot, candy]);

    return (
        <div className="container">
            <div className="controls">
                <button onClick={resetGame} className="reset-button">
                    Reset Game
                </button>
                <div className="counter">
                    Candies Eaten: {candiesEaten}
                </div>
            </div>
            <div className="grid">
                {[...Array(GRID_SIZE * GRID_SIZE)].map((_, idx) => {
                    const x = idx % GRID_SIZE;
                    const y = Math.floor(idx / GRID_SIZE);
                    const isRobot = robot.x === x && robot.y === y;
                    const isCandy = candy.x === x && candy.y === y;
                    return (
                        <div
                            key={idx}
                            className={`cell ${isRobot ? "robot" : isCandy ? "candy" : ""}`}
                        >
                            <p className={`${isRobot || isCandy ? "icon" : "coord"}`} >
                                {isRobot ? "🤖" : isCandy ? "🍬" : `[${x},${y}]`}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
