

const Grid = () => {
  const gridSize = 100; // Define the grid size

  // Generate the grid cells
  const gridCells = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      gridCells.push(
        <div key={`${row}-${col}`} className="grid-cell"></div>
      );
    }
  }

  return <div className="grid">{gridCells}</div>;
};

export default Grid;