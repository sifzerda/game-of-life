import { useState, useEffect, useRef } from "react";

const Grid = () => {
  const gridSize = 100; // Define the grid size
  const [grid, setGrid] = useState(() => initializeGrid());
  const [running, setRunning] = useState(false); // State to control simulation
  const intervalRef = useRef(null); // Ref to hold the interval ID

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(row => row.slice());

          for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
              const alive = prevGrid[row][col];
              const neighbors = countNeighbors(prevGrid, row, col);

              if (alive && (neighbors < 2 || neighbors > 3)) {
                newGrid[row][col] = false; // Cell dies
              } else if (!alive && neighbors === 3) {
                newGrid[row][col] = true; // Cell becomes alive
              }
            }
          }

          return newGrid;
        });
      }, 100); // Update every 100ms
    } else {
      clearInterval(intervalRef.current); // Clear interval when stopped
    }

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [running, gridSize]);

  const countNeighbors = (grid, row, col) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    let count = 0;
    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
        if (grid[newRow][newCol]) count++;
      }
    });
    return count;
  };

  const handleStart = () => setRunning(true);
  const handleStop = () => setRunning(false);

  // Initialize grid with a few random clusters
  function initializeGrid() {
    const grid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => false)
    );

    const numClusters = 10; // Number of clusters
    const clusterSize = 5; // Size of each cluster

    for (let i = 0; i < numClusters; i++) {
      const startRow = Math.floor(Math.random() * gridSize);
      const startCol = Math.floor(Math.random() * gridSize);
      
      // Randomly populate a cluster around the starting point
      for (let row = startRow; row < startRow + clusterSize && row < gridSize; row++) {
        for (let col = startCol; col < startCol + clusterSize && col < gridSize; col++) {
          if (Math.random() > 0.5) {
            grid[row][col] = true;
          }
        }
      }
    }

    return grid;
  }

  return (
    <div className="grid-container">
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`grid-cell ${cell ? "alive" : "dead"}`}
            ></div>
          ))
        )}
      </div>
      <div className="controls">
        <button onClick={handleStart}>Play</button>
        <button onClick={handleStop}>Pause</button>
      </div>
    </div>
  );
};

export default Grid;