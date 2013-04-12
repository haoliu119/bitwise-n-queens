// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
/* START_PROMPT
  var solution = undefined; //fixme
END_PROMPT */

/* START_SOLUTION */
  var solution = _.range(n).map(function(rowIndex){
    return _.range(n).map(function(colIndex){
      return +(rowIndex === colIndex);
    });
  });
/* END_SOLUTION */

  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n){
/* START_PROMPT
  var solutionCount = undefined; //fixme
END_PROMPT */
/* START_SOLUTION */
  function factorial (n){
    return factorial[n] = n <= 1 ? 1 : factorial[n] || n * factorial(n-1);
  };
  var solutionCount = factorial(n); //fixme
/* END_SOLUTION */

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
/* START_PROMPT
  var solutionCount = undefined; //fixme
END_PROMPT */

/* START_SOLUTION */
  var Q=function(n){
    var s=0,c=(1<<n)-1,f=function(l,o,r,c){
      var v=~(l|o|r)&c;
      while(v>0){
        var t=-v&v;
        v=v^t;
        f((l|t)<<1,(o|t),(r|t)>>1,c);
      }
      o==c&&s++;
    };
    f(0,0,0,c);
    return s;
  };
  var solutionCount = Q(n); //fixme
/* END_SOLUTION */

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
