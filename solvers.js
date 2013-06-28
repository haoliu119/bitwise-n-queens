// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = [];
  var solboard = new Board(makeEmptyMatrix(n));
  // console.log(solboard);
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
  // console.log('Single solution for ' + n + ' rooks:', finalarr);
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
  var before = new Date();
  check(0);
  var duration = new Date()-before;
  console.log(n+" Rooks: "+counter+" solutions, took "+duration+" ms("+(duration/1000)+" seconds");
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


window.countNQueensSolutions = function(n){
  var colHash = {},
    majDiagHash = {},
    minDiagHash = {};
  var counter = n === 0 ? 1 : 0;

  var check = function(r){
    for (var c = 0;c < n; c++){
      if(!colHash[c] && !majDiagHash[c+r] && !minDiagHash[n-r+c-1]){
        colHash[c] = true;
        majDiagHash[r + c] = true;
        minDiagHash[n-r+c-1]=true;
        if(r-1>=0) {
          check(r-1);
        } else {
          counter++;
        }
        colHash[c] = false;
        majDiagHash[r + c] = false;
        minDiagHash[n-r+c-1]=false;
      }
    }
  };
  var before = new Date();
  check(n-1);
  var duration = new Date() - before;
  console.log(n+" Queens: "+counter+" solutions, took "+duration+" ms("+(duration/1000)+" seconds");
  return counter;
};

// window.countNQueensSolutions = function(n){
//   // var board = new Board(makeEmptyMatrix(n));
//   var colHash = {},
//     majDiagHash = {},
//     minDiagHash = {};
//   // var toggleHash = function(rowIndex, colIndex){
//   //     colHash[colIndex] = colHash[colIndex] ? 0 : 1;
//   //     majDiagHash[rowIndex + colIndex] = majDiagHash[rowIndex + colIndex] ? 0 : 1;
//   //     minDiagHash[colIndex - rowIndex] = minDiagHash[colIndex - rowIndex] ? 0 : 1;
//   //     // go into hash table, toggle it between 0/1
//   //   };
//   var counter = n === 0 ? 1 : 0;

//   function check(r){  // run check on rth row
//     for (var c=0;c<n;c++){  // iterate over all column indeces on this row
//       // toggleHash(r,c);
//       // debugger;
//       if(!colHash[c] && !majDiagHash[c+r] && !minDiagHash[c-r]){ //no conflict
//         // toggleHash(r,c);
//         colHash[c] = true;
//         majDiagHash[r + c] = true;
//         minDiagHash[c-r]=true;
//         if(r-1>(-n)) {  //more rows to check
//           check(r-1); // run check on next row
//         } else {    //no conflict, and end of rows, found one solution
//           counter++;
//           // printArrays(board.attributes);
//         }
//         // toggleHash(r,c);
//         colHash[c] = false;
//         majDiagHash[r + c] = false;
//         minDiagHash[c-r]=false;
//       }
//       // board.togglePiece(r,c); // toggle it off before checking next column index
//       // toggleHash(r,c);
//     }
//   }
//   var before = new Date();
//   check(0);
//   var duration = new Date() - before;
//   console.log("time taken in seconds: "+ (duration / 1000));
//   console.log("number of "+n+" QUEENS solutions: "+counter);
//   return counter;
// };
// window.countNQueensSolutions = function(n){
//   var board = new Board(makeEmptyMatrix(n));
//   var counter = n === 0? 1 : 0;

//   function check(r){  // run check on rth row
//     for (var c=0;c<n;c++){  // iterate over all column indeces on this row
//       board.togglePiece(r,c);
//       if(!board.hasAnyQueensConflicts()){ //no conflict
//         if(r+1<n){  //more rows to check
//           check(r+1); // run check on next row
//         } else {    //no conflict, and end of rows, found one solution
//           counter++;
//           // printArrays(board.attributes);
//         }
//       }
//       board.togglePiece(r,c); // toggle it off before checking next column index
//     }
//   }
//   var before = new Date();
//   check(0);
//   before = new Date()-before;
//   console.log("time taken in ms: "+before);
//   console.log("number of "+n+" QUEENS solutions: "+counter);
//   return counter;
// };



//   var board = new Board(makeEmptyMatrix(n));
//   var counter = 0;
//   if (n === 0){counter++;}

// // create empty board
// // initial value is 0

// // recursive algorithm to count queens solutions
//   var checkRow = function(row){ // recursive function to check rows
//     for (var col = 0; col < n; col++){ // for loop through all columns
//       board.togglePiece(row, col); // toggle piece
//       if (!board.hasAnyQueensConflicts()){ // if there are no conflicts, do this
//         if (row + 1 < n){
//           checkRow(row+1);
//         } else {
//           counter ++;
//         }
//       }
//       board.togglePiece(row, col);
//     }
//   }; checkRow(0);
//   return counter;
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