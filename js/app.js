$(function(){
  var chessboard = new ChessboardView();

  $("body").append(
    chessboard.render()
  );

});
