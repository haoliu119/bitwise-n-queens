(function(){

  var ChessboardModel = Backbone.Model.extend({
    initialize: function(params){
      this.board = [];
      var sign = false;
      for(var i = 0; i < params.n; i++){
        this.board.push([]);
        for(var j = 0; j < params.n; j++){
          this.board[i][j] = {piece:false, sign: !((i+j)%2)};
          sign = !sign;
        }
      }
    },

    addPiece: function(r, c){
      board[r][c].piece = true;
    },

    conflictCount: function(){
    }

  });

  this.ChessboardModel = ChessboardModel;
}());