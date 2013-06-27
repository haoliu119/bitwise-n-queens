// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = [];
  var solboard = new Board(makeEmptyMatrix(n));
  console.log(solboard);
  var recurseRow = function(r, c){
    solboard.togglePiece(r,c);
    if (solboard.hasAnyRooksConflicts()){ // if it fails the tests
      solboard.togglePiece(r,c);
      if (c+1 < n){
        recurseRow(r, c+1);
      } else if (r+1 === n){
        // return solution;
        //counter++;
      } else {
        recurseRow(r+1, 0);
      }
    } else { // if it doesn't fail the tests, do this
      if (r+1 === n){ // if we're on row 1, then 2 is not greater than 2 --> false --> return solution
        // return solution;
      } else {
        recurseRow(r+1, 0);
      }
    }
  }; recurseRow(0,0);
  var finalarr = [];
  for (var i = 0; i < n; i++){
    finalarr.push(solboard.attributes[i]);
  }
  console.log('Single solution for ' + n + ' rooks:', finalarr);
  return finalarr;
};

window.countNRooksSolutions = function(n){
  if (n === 0 || n === 1){
    return 1;
  }
  var counter = 0;
  var solboard = new Board(makeEmptyMatrix(n));
  console.log(solboard);
  var findRowWithLastColumn = function(v){
    // debugger;
    for (var i = 0; i < n; i++){
      if (solboard.attributes[i][v-1] === 1){
        return i;
      }
    }
  };
  var findWhichColumn = function(rowIndex){
    for (var i = 0; i < n; i++){
      if (solboard.attributes[rowIndex][i] === 1){
        return i;
      }
    }
  };

  var clearAllRowsBelow = function(rowIndex){
    for (var i = rowIndex; i < n; i++){
      for (var j = 0; j < n; j++){
        solboard.attributes[i][j] = 0;
      }
    }
  };
  var outputTable = function(){
    var finalarr = [];
    for (var i = 0; i < n; i++){
      finalarr.push(solboard.attributes[i]);
    }
  };
  var recurseRow = function(r, c){
    if (n === 3){
      debugger;
    }
    solboard.togglePiece(r,c);
    if (solboard.hasAnyRooksConflicts()){ // if it fails the tests
      solboard.togglePiece(r,c);
      if (c+1 < n){
        recurseRow(r, c+1);
      } else {
        recurseRow(r+1, 0);
      }
    } else { // if it doesn't fail the tests, do this
      if (r+1 === n){ // if we're on row 1, then 2 is not greater than 2 --> false --> return solution
        counter++;
        // console.log(findRowWithLastColumn());
      // outputTable;
      }
      if (r+1 !== n){ // if last column isn't take, do this
      // if (findRowWithLastColumn() !== undefined){
        recurseRow(r+1, 0);
        // console.log(findRowWithLastColumn());
      // } else if () // if last column is taken, do this
      } else {
        
        var rowWithLastCol = findRowWithLastColumn();
        if (rowWithLastCol === 0 && solboard.attributes[n-1][0] === 1){
          return counter;
        }
        // debugger;
        if (rowWithLastCol === 0){
          rowWithLastCol = 2;

        }
        var v = n;
        var colToReplace = findWhichColumn(rowWithLastCol-1);
        clearAllRowsBelow(rowWithLastCol-1);
        recurseRow(rowWithLastCol-1, colToReplace+1);
      }
      //if it has been solved

      //if there is already something in the last column
      //untoggle everything from that row and down
      //recurse from the point above the last column filled, c+1
    }
  }; recurseRow(0,0);

  console.log('Number of solutions for ' + n + ' rooks:', counter);
  return counter;
};

// window.findNQueensSolution = function(n){
//   var solution = undefined; //fixme

//   console.log('Single solution for ' + n + ' queens:', solution);
//   return solution;
// };

// window.countNQueensSolutions = function(n){
//   var solutionCount = undefined; //fixme

//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};

var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };