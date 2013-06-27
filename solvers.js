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
  var counter = 0;
  var solboard = new Board(makeEmptyMatrix(n));
  var recurseRow = function(r, c){
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
      // outputTable;
      }
      //if it's not solved yet
      if (!solboard.hasColConflictAt(n-1)){
        recurseRow(r+1, 0);
      } else {
        var rowWithLastCol = findRowWithLastColumn();
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
  var findRowWithLastColumn = function(){
    for (var i = 0; i < n; i++){
      if (solboard.attributes[i][n-1] === 1){
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
      for (var j = 0; j < n; i++){
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
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
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