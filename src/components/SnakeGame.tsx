import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Direction, Point } from '../types';
import { Trophy, RotateCcw } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Direction = 'UP';
const INITIAL_SPEED = 150;

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(true);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  const moveRef = useRef<Direction>(INITIAL_DIRECTION);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    moveRef.current = INITIAL_DIRECTION;
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setIsGameOver(false);
    setSpeed(INITIAL_SPEED);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (moveRef.current !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (moveRef.current !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (moveRef.current !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (moveRef.current !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isGameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { ...head };

        moveRef.current = direction;
        switch (direction) {
          case 'UP': newHead.y -= 1; break;
          case 'DOWN': newHead.y += 1; break;
          case 'LEFT': newHead.x -= 1; break;
          case 'RIGHT': newHead.x += 1; break;
        }

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) setHighScore(nextScore);
            return nextScore;
          });
          setFood(generateFood(newSnake));
          setSpeed((prev) => Math.max(prev - 2, 60));
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [direction, food, isGameOver, speed, generateFood, highScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width / GRID_SIZE;

    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(0, 243, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * size, 0);
        ctx.lineTo(i * size, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * size);
        ctx.lineTo(canvas.width, i * size);
        ctx.stroke();
    }

    snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? '#00f3ff' : '#000000';
      ctx.strokeStyle = isHead ? '#ffffff' : '#00f3ff';
      ctx.lineWidth = 2;
      
      const x = segment.x * size;
      const y = segment.y * size;
      ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
      ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);
    });

    ctx.fillStyle = '#ff00ff';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff00ff';
    const fx = food.x * size + 4;
    const fy = food.y * size + 4;
    ctx.fillRect(fx, fy, size - 8, size - 8);
    ctx.shadowBlur = 0;

  }, [snake, food]);

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="flex justify-between w-full max-w-[400px] font-pixel text-[10px] leading-relaxed tracking-tighter">
        <div className="flex flex-col gap-1">
          <span className="text-zinc-600">RECORD:</span>
          <span className="text-white">{highScore.toString().padStart(6, '0')}</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-neon-cyan">DATA_POINTS:</span>
          <span className="text-white text-lg">{score.toString().padStart(6, '0')}</span>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-2 border-2 border-neon-cyan/20 pointer-events-none group-hover:border-neon-cyan/50 transition-colors"></div>
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neon-magenta"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neon-magenta"></div>
        
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="relative bg-black border-4 border-white block"
        />

        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 overflow-hidden"
            >
              <div className="static-noise absolute inset-0 opacity-40"></div>
              <h2 className="text-2xl font-pixel text-neon-magenta mb-4 glitch-text" data-text="FATAL_ERROR">
                FATAL_ERROR
              </h2>
              <p className="font-pixel text-[8px] text-zinc-500 mb-12">SEGMENTATION_FAULT: SNAKE_COLLISION</p>
              
              <button
                onClick={resetGame}
                className="group relative px-6 py-4 bg-neon-cyan text-black font-pixel text-[10px] hover:bg-white transition-colors"
              >
                REBOOT_SYSTEM
                <div className="absolute top-0 right-0 w-2 h-2 bg-neon-magenta animate-ping" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="font-pixel text-[8px] text-zinc-600 tracking-[0.2em] flex flex-col items-center gap-2">
        <span>[W_A_S_D] :: MOVE_VECTOR</span>
        <div className="flex gap-4">
          <span className="animate-pulse">SYSTEM_STATUS: OK</span>
          <span className="text-neon-magenta">CORE: STABLE</span>
        </div>
      </div>
    </div>
  );
}
