$(function(){
  window.chessboardView = new ChessboardView();
  $("body").append(chessboardView.render());

  // note: you can switch this out for solveNQueens when you're ready!
  solveNRooks(8);
});
