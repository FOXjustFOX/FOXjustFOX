import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface Position {
    x: number;
    y: number;
}

interface SnakeGameProps {
    gridSize?: number;
    cellSize?: number;
}

const SnakeGame: React.FC<SnakeGameProps> = ({
    gridSize = 20,
    cellSize = 20,
}) => {
    const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Position>({ x: 5, y: 5 });
    const [direction, setDirection] = useState<Position>({ x: 0, y: 0 });
    const [gameRunning, setGameRunning] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem("snakeHighScore");
        return saved ? parseInt(saved) : 0;
    });

    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generateFood = useCallback(() => {
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize),
            };
        } while (
            snake.some(
                (segment) => segment.x === newFood.x && segment.y === newFood.y
            )
        );
        return newFood;
    }, [snake, gridSize]);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: 5, y: 5 });
        setDirection({ x: 0, y: 0 });
        setGameRunning(false);
        setGameOver(false);
        setScore(0);
    };

    const startGame = () => {
        resetGame();
        setGameRunning(true);
        setDirection({ x: 1, y: 0 });
    };

    const gameLoop = useCallback(() => {
        if (!gameRunning || (direction.x === 0 && direction.y === 0)) return;

        setSnake((currentSnake) => {
            const newSnake = [...currentSnake];
            const head = { ...newSnake[0] };
            head.x += direction.x;
            head.y += direction.y;

            // Check wall collision
            if (
                head.x < 0 ||
                head.x >= gridSize ||
                head.y < 0 ||
                head.y >= gridSize
            ) {
                setGameRunning(false);
                setGameOver(true);
                return currentSnake;
            }

            // Check self collision
            if (
                newSnake.some(
                    (segment) => segment.x === head.x && segment.y === head.y
                )
            ) {
                setGameRunning(false);
                setGameOver(true);
                return currentSnake;
            }

            newSnake.unshift(head);

            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                setScore((prev) => {
                    const newScore = prev + 10;
                    if (newScore > highScore) {
                        setHighScore(newScore);
                        localStorage.setItem(
                            "snakeHighScore",
                            newScore.toString()
                        );
                    }
                    return newScore;
                });
                setFood(generateFood());
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, gameRunning, gridSize, highScore, generateFood]);

    useEffect(() => {
        if (gameRunning) {
            gameLoopRef.current = setInterval(gameLoop, 150);
        } else {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        }

        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        };
    }, [gameLoop, gameRunning]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!gameRunning) return;

            switch (e.key) {
                case "ArrowUp":
                case "w":
                case "W":
                    if (direction.y !== 1) setDirection({ x: 0, y: -1 });
                    break;
                case "ArrowDown":
                case "s":
                case "S":
                    if (direction.y !== -1) setDirection({ x: 0, y: 1 });
                    break;
                case "ArrowLeft":
                case "a":
                case "A":
                    if (direction.x !== 1) setDirection({ x: -1, y: 0 });
                    break;
                case "ArrowRight":
                case "d":
                case "D":
                    if (direction.x !== -1) setDirection({ x: 1, y: 0 });
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [direction, gameRunning]);

    // Prevent arrow keys from scrolling the page
    useEffect(() => {
        const preventArrowScroll = (e: KeyboardEvent) => {
            if (
                gameRunning &&
                ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
                    e.key
                )
            ) {
                e.preventDefault();
            }
        };
        window.addEventListener("keydown", preventArrowScroll, {
            passive: false,
        });
        return () => window.removeEventListener("keydown", preventArrowScroll);
    }, [gameRunning]);

    // Draw the game
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.fillStyle = "#1f2937";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = "#374151";
        ctx.lineWidth = 1;
        for (let i = 0; i <= gridSize; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, gridSize * cellSize);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(gridSize * cellSize, i * cellSize);
            ctx.stroke();
        }

        // Draw snake
        snake.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? "#10b981" : "#059669";
            ctx.fillRect(
                segment.x * cellSize + 1,
                segment.y * cellSize + 1,
                cellSize - 2,
                cellSize - 2
            );
        });

        // Draw food
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(
            food.x * cellSize + 1,
            food.y * cellSize + 1,
            cellSize - 2,
            cellSize - 2
        );
    }, [snake, food, gridSize, cellSize]);

    return (
        <div className="flex flex-col items-center justify-center bg-gray-1000 p-2">
            <motion.div
                className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}>
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        Snake Game
                    </h1>
                    <div className="flex justify-center gap-8 text-sm text-gray-300">
                        <span>
                            Score:{" "}
                            <span className="text-primary font-bold">
                                {score}
                            </span>
                        </span>
                        <span>
                            High Score:{" "}
                            <span className="text-yellow-400 font-bold">
                                {highScore}
                            </span>
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <canvas
                        ref={canvasRef}
                        width={gridSize * cellSize}
                        height={gridSize * cellSize}
                        className="border-2 border-gray-600 rounded"
                    />

                    {!gameRunning && (
                        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded">
                            <div className="text-center">
                                {gameOver ? (
                                    <div className="mb-4">
                                        <h2 className="text-2xl font-bold text-red-400 mb-2">
                                            Game Over!
                                        </h2>
                                        <p className="text-gray-300">
                                            Final Score: {score}
                                        </p>
                                        {score === highScore && score > 0 && (
                                            <p className="text-yellow-400 font-bold">
                                                New High Score! 🎉
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="mb-4">
                                        <h2 className="text-2xl font-bold text-primary mb-2">
                                            Ready to Play?
                                        </h2>
                                        <p className="text-gray-300 text-sm mb-2">
                                            Use arrow keys or WASD to move
                                        </p>
                                    </div>
                                )}
                                <motion.button
                                    onClick={startGame}
                                    className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}>
                                    {gameOver ? "Play Again" : "Start Game"}
                                </motion.button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-4 text-center text-xs text-gray-400">
                    <p>Use Arrow Keys or WASD to control the snake</p>
                    <p>Eat the red food to grow and increase your score!</p>
                </div>
            </motion.div>
        </div>
    );
};

export default SnakeGame;
