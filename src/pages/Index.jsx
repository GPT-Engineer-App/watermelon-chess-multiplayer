import React, { useState } from "react";
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
          <div className="grid grid-cols-7 gap-1">
            {board.map((cell, index) => (
              <div
                key={index}
                className="w-8 h-8 flex items-center justify-center border border-gray-300"
                onClick={() => handleCellClick(index)}
              >
                {cell}
              </div>
            ))}
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