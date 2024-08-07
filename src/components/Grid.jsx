import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const Grid = () => {
  const gridSize = 100; // Define the grid size
  const [grid, setGrid] = useState(() => initializeGrid(5)); // Initialize with default cluster size
  const [running, setRunning] = useState(false); // State to control simulation
  const [clusterSize, setClusterSize] = useState(5); // State for cluster size
  const [numClusters, setNumClusters] = useState(10); // State for number of clusters
  const [speed, setSpeed] = useState(100); // State for simulation speed (ms)
  const [time, setTime] = useState(0); // State to hold elapsed time in milliseconds

  const intervalRef = useRef(null); // Ref to hold the simulation interval ID
  const timerRef = useRef(null); // Ref to hold the timer interval ID

  // Memoized function to count neighbors
  const countNeighbors = useMemo(() => (grid, row, col) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    return directions.reduce((count, [dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      return count + (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && grid[newRow][newCol] ? 1 : 0);
    }, 0);
  }, [gridSize]);

  useEffect(() => {
    if (running) {
      // Simulation interval
      intervalRef.current = setInterval(() => {
        setGrid(prevGrid => prevGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const neighbors = countNeighbors(prevGrid, rowIndex, colIndex);
            return cell ? neighbors === 2 || neighbors === 3 : neighbors === 3;
          })
        ));
      }, speed); // Use the dynamic speed state here

      // Timer interval
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 100); // Increment every 100ms for finer resolution
      }, 100); // Increment every 100ms
    } else {
      clearInterval(intervalRef.current); // Clear interval when stopped
      clearInterval(timerRef.current); // Clear timer interval when stopped
    }

    return () => {
      clearInterval(intervalRef.current); // Cleanup on unmount
      clearInterval(timerRef.current);
    };
  }, [running, speed, countNeighbors]);

  useEffect(() => {
    // Reinitialize grid when clusterSize changes
    setGrid(initializeGrid(clusterSize, numClusters));
  }, [clusterSize, numClusters]);

  const handleStart = useCallback(() => {
    setRunning(true);
  }, []);

  const handleStop = useCallback(() => {
    setRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setRunning(false);
    setTime(0);
    setGrid(initializeGrid(clusterSize, numClusters)); // Reset grid with current cluster size and number
  }, [clusterSize, numClusters]);

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

  // Format milliseconds into mm:ss:ms format
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(ms).padStart(3, '0')}`;
  };

  {/* ------------------------------------- rendering -------------------------------- */}
 
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
        <button onClick={handleReset}>Reset</button>
        <div>Elapsed Time: {formatTime(time)}</div>
      </div>

      {/* ------------------------------------- sliders -------------------------------- */}
      <div className="controls">
        <div className="slider-container">
          {/* ---------------Size Slider ----------------*/}
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
          {/* ---------------Quantity Slider ----------------*/}
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
          {/* ---------------Speed Slider ----------------*/}
          <div className="slider-group">
            <label htmlFor="speed">Speed: {speed}ms</label>
            <input
              id="speed"
              type="range"
              min="10"
              max="500"
              step="10"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
            <input
              type="number"
              min="10"
              max="500"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>
        </div>
        {/* ------------------------------------------------------------------------------ */}
      </div>
    </div>
  );
};

export default Grid;