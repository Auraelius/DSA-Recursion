/* eslint-disable no-console */
'use strict';

/* 
  generic algorithm to find one solution to a maze

  we start in 0,0 but any location should work.

  if (x,y outside maze) return false
  if (x,y is goal) return true
  if (x,y not open - its blocked or already used) return false
  mark x,y as part of solution path
  if (explore(north next cell) == true) return true
  if (explore(east) == true) return true
  if (explore(south) == true) return true
  if (explore(west) == true) return true
  unmark x,y as part of solution path if no adjacent cells reach the goal. this performs the back track
  return false - whoever called me should look elsewhere

  Note, this method presumes a reachable goal. There is no detecting error cases.
*/

let mySmallMaze = [
  [' ', ' ', ' '],
  [' ', '*', ' '],
  [' ', ' ', 'e']
];

let theMaze = [
  [' ', ' ', ' ', '*', ' ', ' ', ' '],
  ['*', '*', ' ', '*', ' ', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', '*', '*', '*', '*', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', 'e']
];

function explore(maze, row, col) {
  /* 
    returns true if the current cell contains the goal
    returns true if one of the adjacent cells eventually gets to the goal (via recursion)
    returns false if it's blocked or at the edge of the maze
  */

  if (debug) console.log(`r ${row} c ${col}`);

  if (row>=maze.length || row<0) { 
    if (debug) console.log(`row ${row} out of range`); 
    return false; 
  }

  if (col>=maze[0].length || col <0) { 
    if (debug) console.log(`col ${col} out of range`); 
    return false; 
  }

  if (maze[row][col] === '*') {
    if (debug) console.log('blocked'); 
    return false;
  } 

  if (maze[row][col] === 'X') {
    if (debug) console.log('been here'); 
    return false;
  } 

  if (maze[row][col] === 'e') {
    console.log('Solved'); // base case
    return true;
  } 

  maze[row][col] = 'X'; // so far, so good; mark current location as part of path

  // try exploring in all four directions
  // if we get a true back, it means that the next cell eventually led to a solution, 
  // so we can return a true to indicate that the current cell leads to a solution.

  /* NOTE
    the console.log outputs get buffered and really represent paths attempted, 
    so they don't end up reflecting the true solution, so they are commented out.
  
  */

  if (explore(maze, row+1, col) === true) {
    // console.log('R');
    return true;
  }

  if (explore(maze, row, col+1) === true) {
    // console.log('D');
    return true;
  }

  if (explore(maze, row-1, col) === true) {
    // console.log('L');
    return true;
  }

  if (explore(maze, row, col-1) === true) {
    // console.log('U');
    return true;
  }

  // if we're here in the code and we haven't returned yet, 
  // it means our current location doesn't lead to the solution

  maze[row][col] = ' '; //unmark current location
  return false;         // return to sender, path unknown
}

let debug=true;
console.table(theMaze);
if (debug) console.log(`theMaze.length= ${theMaze.length}, theMaze[row].length= ${theMaze[0].length}`);
explore(theMaze, 0,0); // start at upper left
theMaze[0][0]='s'; // mark the start position so it's visible in the output.
console.table(theMaze);

