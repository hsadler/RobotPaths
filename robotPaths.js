var createGrid = function(width, height) {
  var arr = [];
  var grid = [];
  for (var i = 0; i < width; i++) {
    arr.push(false);
  }
  for (var i = 0; i < height; i++) {
    grid.push(arr.slice());
  };
  return grid;
};

var countPaths = function(grid){
  /*
   *  With the grid as the input, count the total number of paths from the upper left to bottom right corner.
   *  Extra credit:  can you generalize this to work even if there are obstacles in the way? (obstacles will be represented by 0's)
   *  Extra extra credit:  can you make your solution work for extremely large grids  (say, greater than 100x100?)
   */

  if(grid.length === 0) {
    return 0;
  }

  var board = grid.slice();
  var targetSpace;
  var solutionCount;

  var toggleSpace = function(coordinates) {
    var x = coordinates[0];
    var y = coordinates[1];
    board[y][x] = !board[y][x];
    robotLoc = [x, y];
  };

  var getSpaceDown = function(coor) {
    return [coor[0], coor[1] + 1];
  };
  var getSpaceRight = function(coor) {
    return [coor[0] + 1, coor[1]];
  };

  var moveIsValid = function(coordinates) {
    var x = coordinates[0];
    var y = coordinates[1];
    if(board[y] === undefined || board[y][x] === undefined || board[y][x] === true || board[y][x] === 0) {
      return false;
    } else {
      return true;
    }
  };

  var compareCoors = function(coor1, coor2) {
    var test = true;
    _.each(coor1, function(num, index) {
      if(num !== coor2[index]) {
        test = false;
      }
    });
    // console.log(test);
    return test;
  };

  var exploreBoard = function() {
    targetSpace = [grid.length - 1, grid[0].length - 1];
    solutionCount = 0;

    // recursive explore function
    var explore = function(robotLoc) {

      // base case: target hit
      console.log(robotLoc, targetSpace);
      if(compareCoors(robotLoc, targetSpace)) {
        solutionCount++;
        return;
      }
      // else, move both directions if valid recursively
      // try down
      if(moveIsValid(getSpaceDown(robotLoc))) {
        var newRobotLoc = getSpaceDown(robotLoc);
        toggleSpace(newRobotLoc);
        explore(newRobotLoc);
        // toggleSpace back
        toggleSpace(newRobotLoc);
      }
      // try right
      if(moveIsValid(getSpaceRight(robotLoc))) {
        var anotherNewRobotLoc = getSpaceRight(robotLoc);
        toggleSpace(anotherNewRobotLoc);
        explore(anotherNewRobotLoc);
        // toggleSpace back
        toggleSpace(anotherNewRobotLoc);
      }
      // if cant move down or right, return
      return;
    };
    // set explore in motion with initial top-left placement
    explore([0, 0]);

    return solutionCount;
  };
  var result = exploreBoard();



  // testing
  console.log('grid size: ', grid.length);
  console.log('board: ', board);
  console.log('target space: ', targetSpace);
  console.log('result: ', result);
  return result
}

// countPaths(createGrid(3, 3));
