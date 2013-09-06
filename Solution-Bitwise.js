window.countNQueensSolutions = function(n){
  var count = n === 0? 1 : 0;
  for(var i=0,trim=0;i<n;i++){
    trim+=Math.pow(2,i);
  }
  // var pCol = 0, pMaj = 0, pMin = 0;
  function check(r,pCol,pMaj,pMin){
    pMaj = pMaj >> 1 & trim, pMin = pMin << 1 & trim;
    for(var c = n-1;c >= 0;c--){
      var cCol = Math.pow(2,c);
      if(!(cCol & (pCol | pMaj | pMin))){
        if (r === 0){
          count++;
        }else if (r > 0){
          check(r-1,cCol|pCol,cCol|pMaj,cCol|pMin);
        }
      }
    }
  }
  check(n-1,0,0,0);
  return count;
};