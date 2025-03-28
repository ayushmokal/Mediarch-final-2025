
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function PingPong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Game variables
    const paddleHeight = 10;
    const paddleWidth = 100;
    const ballRadius = 8;
    
    let paddleX = (canvas.width - paddleWidth) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height - paddleHeight - ballRadius - 10;
    let ballSpeedX = 4;
    let ballSpeedY = -4;
    let localScore = 0;
    
    // Controls
    let rightPressed = false;
    let leftPressed = false;
    
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
      }
    };
    
    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
      }
    };
    
    const mouseMoveHandler = (e: MouseEvent) => {
      const relativeX = e.clientX - canvas.getBoundingClientRect().left;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    };
    
    const touchMoveHandler = (e: TouchEvent) => {
      const relativeX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    };
    
    // Add event listeners
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    canvas.addEventListener('mousemove', mouseMoveHandler);
    canvas.addEventListener('touchmove', touchMoveHandler);
    
    // Draw functions
    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#EFB62B';
      ctx.fill();
      ctx.closePath();
    };
    
    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = '#DD2C2C';
      ctx.fill();
      ctx.closePath();
    };
    
    const drawScore = () => {
      ctx.font = '16px Inter';
      ctx.fillStyle = '#EFB62B';
      ctx.fillText(`Score: ${localScore}`, 8, 20);
    };
    
    // Game logic
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawBall();
      drawPaddle();
      drawScore();
      
      // Wall collision detection
      if (ballX + ballSpeedX > canvas.width - ballRadius || ballX + ballSpeedX < ballRadius) {
        ballSpeedX = -ballSpeedX;
      }
      
      if (ballY + ballSpeedY < ballRadius) {
        ballSpeedY = -ballSpeedY;
      } else if (ballY + ballSpeedY > canvas.height - ballRadius - paddleHeight) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
          ballSpeedY = -ballSpeedY;
          localScore += 1;
          setScore(localScore);
          
          // Increase difficulty
          if (localScore % 5 === 0) {
            if (ballSpeedX > 0) ballSpeedX += 0.5;
            else ballSpeedX -= 0.5;
            
            if (ballSpeedY > 0) ballSpeedY += 0.5;
            else ballSpeedY -= 0.5;
          }
        } else if (ballY + ballSpeedY > canvas.height - ballRadius) {
          // Game over
          setGameStarted(false);
          return;
        }
      }
      
      // Paddle movement
      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }
      
      ballX += ballSpeedX;
      ballY += ballSpeedY;
      
      if (gameStarted) {
        requestAnimationFrame(draw);
      }
    };
    
    // Start game loop
    draw();
    
    // Cleanup
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      canvas.removeEventListener('mousemove', mouseMoveHandler);
      canvas.removeEventListener('touchmove', touchMoveHandler);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [gameStarted]);
  
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 mb-16">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30 p-2 backdrop-blur-sm">
        <div className="relative rounded-lg overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="w-full bg-black/40 h-[350px] rounded-lg"
          />
          
          {!gameStarted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-mediarch mb-2">Ping Pong</h3>
              <p className="text-gray-300 mb-6 text-center px-4">
                Use arrow keys or mouse to control the paddle.<br/>
                Don't let the ball fall!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-mediarch text-black font-semibold rounded-lg hover:bg-mediarch/90 transition-colors"
                onClick={() => {
                  setScore(0);
                  setGameStarted(true);
                }}
              >
                {score > 0 ? 'Play Again' : 'Start Game'}
              </motion.button>
              {score > 0 && (
                <p className="mt-4 text-xl text-mediarch font-semibold">
                  Your Score: {score}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
