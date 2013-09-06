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
