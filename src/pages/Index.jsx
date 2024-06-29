import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BOARD_SIZE = 21;

const createInitialBoard = () => {
  const board = Array(BOARD_SIZE).fill(null);
  // Set initial positions for Player A (black) and Player B (white)
  for (let i = 0; i < 6; i++) {
    board[i] = "P1";
    board[BOARD_SIZE - 1 - i] = "P2";
  }
  return board;
};

const checkCapture = (board, index, player) => {
  // Implement capture logic based on the rules
  // This is a placeholder implementation
  return false;
};

const Index = () => {
  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState("P1");
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (board[index] !== null || winner !== null) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkCapture(newBoard, index, currentPlayer)) {
      // Handle capture logic
    }

    // Check for win condition
    const remainingPieces = newBoard.filter((piece) => piece === (currentPlayer === "P1" ? "P2" : "P1")).length;
    if (remainingPieces <= 2) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === "P1" ? "P2" : "P1");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center">Watermelon Chess</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-0 pb-[100%]">
            <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full">
              <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="1" fill="none" />
              <circle cx="50" cy="50" r="20" stroke="black" strokeWidth="1" fill="none" />
              <path d="M50 5 L50 95" stroke="black" strokeWidth="1" />
              <path d="M5 50 L95 50" stroke="black" strokeWidth="1" />
              <path d="M50 50 L95 5" stroke="black" strokeWidth="1" />
              <path d="M50 50 L5 5" stroke="black" strokeWidth="1" />
              <path d="M50 50 L95 95" stroke="black" strokeWidth="1" />
              <path d="M50 50 L5 95" stroke="black" strokeWidth="1" />
              <path d="M50 50 A45 45 0 0 1 95 50" stroke="black" strokeWidth="1" fill="none" />
              <path d="M50 50 A45 45 0 0 1 50 95" stroke="black" strokeWidth="1" fill="none" />
              <path d="M50 50 A45 45 0 0 1 5 50" stroke="black" strokeWidth="1" fill="none" />
              <path d="M50 50 A45 45 0 0 1 50 5" stroke="black" strokeWidth="1" fill="none" />
              <path d="M50 50 A20 20 0 0 1 70 50" stroke="black" strokeWidth="1" fill="none" />
              <path d="M50 50 A20 20 0 0 1 50 70" stroke="black" strokeWidth="1" fill="none" />
              <path d="M50 50 A20 20 0 0 1 30 50" stroke="black" strokeWidth="1" fill="none" />
              <path d="M50 50 A20 20 0 0 1 50 30" stroke="black" strokeWidth="1" fill="none" />
              {board.map((cell, index) => {
                const angle = (index / BOARD_SIZE) * 2 * Math.PI;
                const x = 50 + 45 * Math.cos(angle);
                const y = 50 + 45 * Math.sin(angle);
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="2"
                    fill={cell === "P1" ? "black" : cell === "P2" ? "white" : "none"}
                    stroke="black"
                    strokeWidth="1"
                    onClick={() => handleCellClick(index)}
                    className={cn("cursor-pointer", {
                      "hover:fill-gray-400": cell === null,
                    })}
                  />
                );
              })}
            </svg>
          </div>
          {winner && <div className="text-center mt-4">Winner: {winner}</div>}
        </CardContent>
      </Card>
      <Button onClick={() => {
        setBoard(createInitialBoard());
        setWinner(null);
        setCurrentPlayer("P1");
      }}>Reset Game</Button>
    </div>
  );
};

export default Index;