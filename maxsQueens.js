window.countNQueensSolutions = function(n){
  var solutionCount = 0;

  var columns = {};
  var majorDiagonals = {};
  var minorDiagonals = {};

  var checker = function(row) {
    row = row || 0;
    for (var i = 0; i < n; i++) {
      if (!columns[i] && !majorDiagonals[(n-1) - row + i] && !minorDiagonals[row + i]) {
        columns[i] = true;
        majorDiagonals[(n-1) - row + i] = true;
        minorDiagonals[row + i] = true;
        row++;
        if (row < n) {
          checker(row);
        } else {
          solutionCount++;
        }
        row--;
        columns[i] = false;
        majorDiagonals[(n-1) - row + i] = false;
        minorDiagonals[row + i] = false;
      }
    }
  };
  var timeBefore = new Date();
  checker();
  var timeAfter = new Date();
  var timeElapsed = timeAfter - timeBefore;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  console.log(timeElapsed + " ms");
  return solutionCount;
};