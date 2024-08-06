import { useState, useEffect, useRef } from "react";

const Grid = () => {
  const gridSize = 100; // Define the grid size
  const [grid, setGrid] = useState(() => initializeGrid(5)); // Initialize with default cluster size
  const [running, setRunning] = useState(false); // State to control simulation
  const [clusterSize, setClusterSize] = useState(5); // State for cluster size
  const [numClusters, setNumClusters] = useState(10); // State for number of clusters

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

  useEffect(() => {
    // Reinitialize grid when clusterSize changes
    setGrid(initializeGrid(clusterSize, numClusters));
  }, [clusterSize, numClusters]);

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
  function initializeGrid(clusterSize, numClusters) {
    const grid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => false)
    );

    for (let i = 0; i < numClusters; i++) {
      const startRow = Math.floor(Math.random() * gridSize);
      const startCol = Math.floor(Math.random() * gridSize);
      
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

        {/* ------------------------------------- sliders -------------------------------- */}
        <div className="slider-container">
          <div className="slider-group">
            <label htmlFor="clusterSize">Group Size: {clusterSize}</label>
            <input
              id="clusterSize"
              type="range"
              min="1"
              max="50"
              value={clusterSize}
              onChange={(e) => setClusterSize(Number(e.target.value))}
            />
            <input
              type="number"
              min="1"
              max="50"
              value={clusterSize}
              onChange={(e) => setClusterSize(Number(e.target.value))}
            />
          </div>

          <div className="slider-group">
            <label htmlFor="numClusters">Group Quantity: {numClusters}</label>
            <input
              id="numClusters"
              type="range"
              min="1"
              max="50"
              value={numClusters}
              onChange={(e) => setNumClusters(Number(e.target.value))}
            />
            <input
              type="number"
              min="1"
              max="50"
              value={numClusters}
              onChange={(e) => setNumClusters(Number(e.target.value))}
            />
          </div>
        </div>
        {/* ------------------------------------------------------------------------------ */}
      </div>
    </div>
  );
};

export default Grid;