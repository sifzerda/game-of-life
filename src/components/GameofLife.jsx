import { useState, useEffect, useCallback } from "react";

const numRows = 20;
const numCols = 20;

const createGrid = () => {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => Math.random() > 0.7)
  );
};

const GameOfLife = () => {
  const [grid, setGrid] = useState(createGrid);
  const [running, setRunning] = useState(false);

  const countNeighbors = (grid, x, y) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = x + i;
        const newY = y + j;
        if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
          count += grid[newX][newY] ? 1 : 0;
        }
      }
    }
    return count;
  };

  const nextGeneration = useCallback(() => {
    setGrid((prevGrid) => {
      return prevGrid.map((row, x) =>
        row.map((cell, y) => {
          const neighbors = countNeighbors(prevGrid, x, y);
          if (cell) {
            return neighbors === 2 || neighbors === 3;
          }
          return neighbors === 3;
        })
      );
    });
  }, []);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(nextGeneration, 500);
    return () => clearInterval(interval);
  }, [running, nextGeneration]);

  const toggleCell = (x, y) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (x === rowIndex && y === colIndex) {
            return !cell;
          }
          return cell;
        })
      );
      return newGrid;
    });
  };

  const resetGrid = () => {
    setGrid(createGrid());
    setRunning(false);
  };

  return (
    <div>
      <h1>Conway's Game of Life</h1>
      <div className="grid">
        {grid.map((row, x) => (
          <div key={x} className="row">
            {row.map((cell, y) => (
              <div
                key={`${x}-${y}`}
                className={`cell ${cell ? "alive" : ""}`}
                onClick={() => toggleCell(x, y)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={() => setRunning(!running)}>
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={resetGrid}>Reset</button>
      </div>
    </div>
  );
};

export default GameOfLife;