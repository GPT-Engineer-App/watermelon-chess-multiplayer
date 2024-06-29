import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BOARD_SIZE = 5;

const createInitialBoard = () => {
  const board = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
  // Place initial pieces for two players
  board[0][0] = "P1";
  board[0][BOARD_SIZE - 1] = "P1";
  board[BOARD_SIZE - 1][0] = "P2";
  board[BOARD_SIZE - 1][BOARD_SIZE - 1] = "P2";
  return board;
};

const Index = () => {
  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState("P1");

  const handleCellClick = (row, col) => {
    if (board[row][col] !== null) return;

    const newBoard = board.map((r) => r.slice());
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "P1" ? "P2" : "P1");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">西瓜棋</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-1">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="w-16 h-16 flex items-center justify-center border border-gray-300"
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setBoard(createInitialBoard())}>Reset Game</Button>
    </div>
  );
};

export default Index;