// src/pages/Home.js
import Grid from '../components/Grid';

const Home = () => {
  return (
    <div>
      <h1>Conway's Game of Life</h1>
      <p className='desc'>Group size = number of cells</p>
      <p className='desc-2'>Group quantity = number of groups in grid</p>
      <Grid />
    </div>
  );
};

export default Home;