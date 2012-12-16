var solveNQueens = function(n){
  var solution = [
    [false, true,  false, false],
    [false, false, false, true ],
    [true,  false, false, false],
    [false, false, true,  false]
  ];

  // the above is a pre-baked solution for when n = 4.
  // Write code here that will find solutions for any n
  // hint: you'll want to start by building your own matrix to put in the solution variable

  // this line hooks into the visualizer
  window.chessboardView.model.setSimpleBoard(solution);
  return solution;
}
