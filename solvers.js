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
  var board = new Board(makeEmptyMatrix(n));
  var counter = n === 0? 1 : 0;

  function check(r){  // run check on rth row
    for (var c=0;c<n;c++){  // iterate over all column indeces on this row
      board.togglePiece(r,c);
      if(!board.hasColConflictAt(c)){ //no conflict
      // if(!board.hasAnyRooksConflicts()){ //no conflict
        if(r+1<n){  //more rows to check
          check(r+1); // run check on next row
        } else {    //no conflict, and end of rows, found one solution
          counter++;
          // printArrays(board.attributes);
        }
      }
      board.togglePiece(r,c); // toggle it off before checking next column index
    }
  }
  // var before = new Date();
  check(0);
  // before = new Date()-before;
  // console.log("time taken: "+before);
  // console.log("number of "+n+" rooks solutions: "+counter);
  return counter;
};

function printArrays(obj){
  for(var i in obj){
    console.log(obj[i]);
  }
}
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