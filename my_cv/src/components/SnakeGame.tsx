import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface Position {
    x: number;
    y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

const SnakeGame: React.FC = () => {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Position>({ x: 15, y: 15 });
    const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const directionRef = useRef(direction);

    // Generate random food position
    const generateFood = useCallback((currentSnake: Position[]): Position => {
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
        } while (
            currentSnake.some(
                (segment) => segment.x === newFood.x && segment.y === newFood.y
            )
        );
        return newFood;
    }, []);

    // Check collision with walls or self
    const checkCollision = useCallback((head: Position, snakeBody: Position[]): boolean => {
        // Wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            return true;
        }
        // Self collision
        return snakeBody.some(
            (segment) => segment.x === head.x && segment.y === head.y
        );
    }, []);

    // Move snake
    const moveSnake = useCallback(() => {
        if (gameOver || !gameStarted || isPaused) return;

        setSnake((prevSnake) => {
            const newHead = {
                x: prevSnake[0].x + directionRef.current.x,
                y: prevSnake[0].y + directionRef.current.y,
            };

            // Check collision
            if (checkCollision(newHead, prevSnake)) {
                setGameOver(true);
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Check if food is eaten
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore((prev) => prev + 10);
                setFood(generateFood(newSnake));
            } else {
                newSnake.pop(); // Remove tail if no food eaten
            }

            return newSnake;
        });
    }, [gameOver, gameStarted, isPaused, food, checkCollision, generateFood]);

    // Handle keyboard input
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!gameStarted && e.key.startsWith("Arrow")) {
                setGameStarted(true);
            }

            if (e.key === " " && gameStarted) {
                e.preventDefault();
                setIsPaused((prev) => !prev);
                return;
            }

            const newDirection = { ...directionRef.current };

            switch (e.key) {
                case "ArrowUp":
                    if (directionRef.current.y === 0) {
                        newDirection.x = 0;
                        newDirection.y = -1;
                    }
                    break;
                case "ArrowDown":
                    if (directionRef.current.y === 0) {
                        newDirection.x = 0;
                        newDirection.y = 1;
                    }
                    break;
                case "ArrowLeft":
                    if (directionRef.current.x === 0) {
                        newDirection.x = -1;
                        newDirection.y = 0;
                    }
                    break;
                case "ArrowRight":
                    if (directionRef.current.x === 0) {
                        newDirection.x = 1;
                        newDirection.y = 0;
                    }
                    break;
            }

            directionRef.current = newDirection;
            setDirection(newDirection);
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [gameStarted]);

    // Game loop
    useEffect(() => {
        const gameLoop = setInterval(moveSnake, GAME_SPEED);
        return () => clearInterval(gameLoop);
    }, [moveSnake]);

    // Reset game
    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        directionRef.current = INITIAL_DIRECTION;
        setFood(generateFood(INITIAL_SNAKE));
        setGameOver(false);
        setScore(0);
        setGameStarted(false);
        setIsPaused(false);
    };

    return (
        <div className="snake-game-container">
            <motion.div
                className="game-info"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                <div className="score-display">Score: {score}</div>
                {!gameStarted && !gameOver && (
                    <div className="game-instruction">
                        Press Arrow Keys to Start!
                    </div>
                )}
                {isPaused && (
                    <div className="game-instruction">
                        PAUSED - Press Space to Resume
                    </div>
                )}
            </motion.div>

            <motion.div
                className="game-board"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                    width: GRID_SIZE * CELL_SIZE,
                    height: GRID_SIZE * CELL_SIZE,
                }}>
                {/* Render snake */}
                {snake.map((segment, index) => (
                    <div
                        key={index}
                        className={`snake-segment ${index === 0 ? "snake-head" : ""}`}
                        style={{
                            left: segment.x * CELL_SIZE,
                            top: segment.y * CELL_SIZE,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                        }}
                    />
                ))}

                {/* Render food */}
                <div
                    className="snake-food"
                    style={{
                        left: food.x * CELL_SIZE,
                        top: food.y * CELL_SIZE,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                    }}
                />

                {/* Game over overlay */}
                {gameOver && (
                    <motion.div
                        className="game-over-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}>
                        <h2>Game Over!</h2>
                        <p>Final Score: {score}</p>
                        <button onClick={resetGame} className="restart-button">
                            Play Again
                        </button>
                    </motion.div>
                )}
            </motion.div>

            <motion.div
                className="game-controls"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}>
                <p className="controls-text">
                    🎮 Use Arrow Keys to move | Space to Pause
                </p>
                <button onClick={resetGame} className="reset-button">
                    Restart Game
                </button>
            </motion.div>
        </div>
    );
};

export default SnakeGame;
