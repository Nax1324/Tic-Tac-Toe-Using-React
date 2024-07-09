
import React, { useState } from 'react';
import './Board.css';

const INITIAL_STATE = {
  board: Array(9).fill(null),
  currentPlayer: '✓',
  winner: null,
  winningCombination: []
};

const Board = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const handleClick = (index) => {
    if (state.board[index] || state.winner) return;

    const newBoard = [...state.board];
    newBoard[index] = state.currentPlayer;
    const newWinner = calculateWinner(newBoard);

    setState({
      board: newBoard,
      currentPlayer: state.currentPlayer === '✓' ? '✕' : '✓',
      winner: newWinner.winner,
      winningCombination: newWinner.winningCombination
    });
  };

  const calculateWinner = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], winningCombination: pattern };
      }
    }

    return { winner: null, winningCombination: [] };
  };

  const renderCell = (index) => {
    const isWinningCell = state.winningCombination.includes(index);
    return (
      <div
        key={index}
        className={`cell ${isWinningCell ? 'winning-cell' : ''}`}
        onClick={() => handleClick(index)}
      >
        {state.board[index]}
      </div>
    );
  };

  const renderStatus = () => {
    if (state.winner) {
      return `Winner: ${state.winner}`;
    } else if (state.board.every(cell => cell)) {
      return "It's a tie!";
    } else {
      return `Current Player: ${state.currentPlayer}`;
    }
  };

  const resetGame = () => {
    setState(INITIAL_STATE);
  };

  return (
    <div className="board-container">
      <div className="board">
        {state.board.map((cell, index) => renderCell(index))}
      </div>
      <div className="status">{renderStatus()}</div>
      <button className="reset-button" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default Board;
