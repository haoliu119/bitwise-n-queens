(function(){

  var ChessboardModel = Backbone.Model.extend({
    initialize: function(params){
      this.clearPieces();
    },

    clearPieces: function(){
      this.arrange(this.makeEmptyArrangement());
    },

    arrange: function(arrangement){
      this.set('board', arrangement);
    },

    makeEmptyArrangement: function(){
      var board = [];
      for(var r = 0; r < this.get('n'); r++){
        board.push([]);
        for(var c = 0; c < this.get('n'); c++){
          board[r][c] = {piece:false, sign: !((r+c)%2), row: r, col: c};
        }
      }
      return board;
    },

    togglePiece: function(r, c){
      this.get('board')[r][c].piece = !this.get('board')[r][c].piece;
      this.trigger('change');
    },

    conflictCount: function(){
    }

  });

  this.ChessboardModel = ChessboardModel;
}());