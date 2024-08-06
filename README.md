# Conway's Game of Life

## Table of Contents

1. Description
2. Badges
3. Visuals
4. Installation
5. Usage
6. Dev Stuff: Building
7. Bugs and Further Development
8. To do
9. Support
10. Contributing 
11. Authors and acknowledgment
12. License
13. Project status

## (1) Description

A front end React app to illustrate Conway's Game of Life. Built with HTML, JavaScript and CSS.

## (2) Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) 
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) 
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## (3) Visuals

[Visit App deployed to Vercel](https://slotmachine-five.vercel.app/)

![pic2](https://github.com/user-attachments/assets/27063b19-bbc0-4984-925d-58f2fb27da78)

## (4) Installation

```bash
git clone https://github.com/sifzerda/game-of-life.git
cd game-of-life
npm install
npm run start
```

## (5) Usage

+ Play and pause to run and freeze simulation
+ Group size: change the number of cells each group has
+ Group quantity: change the number of groups in the grid.

## (6) Dev Stuff: Building:

The main functions of code:

- React-player has a default appearance, which was changed, setting controls={false} and making useStates to control volume, song progress bar, song time, etc.
- playlist, time, volume, and song location tracked in useStates

## (7) Alternative Config

xxx :
```bash
const ;
```

## (8) Bugs and Further Development: 

Bugs:
- N/A

Optimization:
- ~~use react-virtualized to only render visible stuff~~
- ~~once game basically running, convert it into Redux or Zustand~~
- ~~use a bundler like Webpack or Parcel to optimize build output: Enable code splitting, tree-shaking, and minification to reduce bundle size and improve load times.~~
- ~~Consider memoizing components like Projectile and Particle using React.memo to prevent unnecessary re-renders, especially if their props rarely change.~~

## (9) To do: 

- [x] create 100 x 100 grid
- [x] add game based alternating rules (cells alive or dead + switch)
- [ ] enable changing game screen size/cell size
- [x] enable changing group size input
  - [x] enable manual input
- [x] enable changing group quantity input
  - [ ] enable manual input
 
- [ ] enable changing game speed

## (10) Support

For support, users can contact tydamon@hotmail.com.

## (11) Contributing

Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". 
1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/NewFeature)
3. Commit your Changes (git commit -m 'Add some NewFeature')
4. Push to the Branch (git push origin feature/NewFeature)
5. Open a Pull Request

## (12) Authors and acknowledgment

The author acknowledges and credits those who have contributed to this project including:

- ChatGPT

## (13) License

Distributed under the MIT License. See LICENSE.txt for more information.

## (14) Project status

This project is complete.
