// src/pages/About.js

const About = () => {
  return (
    <div className="App">
      <h1>About</h1>
      <div className='about-container'>
      <p>The Game of Life is a 2D cellular automaton program, designed by mathematician John Conway in 1970. It illustrates how, from a set of simple initial starting rules, complex patterns can emerge resembling those found in biological life. </p>
      <p>The starting rules are:</p>
     
      <ul className="styled-list">
        <li>(1) Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li> 
        <li>(2) Any live cell with two or three live neighbors lives on to the next generation.</li>  
        <li>(3) Any live cell with more than three live neighbors dies, as if by overpopulation.</li> 
        <li>(4) Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>  
      </ul>

      </div>
    </div>
  );
};

export default About;