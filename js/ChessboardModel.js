(function(){

  var ChessboardModel = Backbone.Model.extend({
    initialize: function(params){
      if (params.n) {
        this.clearPieces();
      } else {
        this.set('board', this.makeBoardFromSimpleBoard(params.board));
        params.n = this.board.length;
      }
    },

    clearPieces: function(){
      this.set('board', this.makeEmptyBoard());
    },

    makeBoardFromSimpleBoard: function(simpleBoard){
      return _.map(simpleBoard, function(cols, r){
        return _.map(cols, function(hasPiece, c){
          return {
            row: r,
            col: c,
            piece: hasPiece,
            sign: !((r+c)%2)
          };
        }, this);
      }, this);
    },

    makeEmptyBoard: function(){
      var board = [];
      _.times(this.get('n'), function(){
        var row = [];
        _.times(this.get('n'), function(){
          row.push(false);
        }, this);
        board.push(row);
      }, this);
      return this.makeBoardFromSimpleBoard(board);
    },

    togglePiece: function(r, c){
      this.get('board')[r][c].piece = !this.get('board')[r][c].piece;
      this.trigger('change');
    },

    hasConflict: function(){
      return hasRowConflict() || hasColConflict() || hasUpLeftConflict() || hasUpRightConflict();
    },

    hasRowConflict: function(){
    },

    hasRowConflictAt: function(i){
    },

    hasColConflict: function(){
    },

    hasColConflictAt: function(i){
    },

    hasUpLeftConflict: function(){
    },

    hasUpLeftConflictAt: function(i){
    },

    hasUpRightConflict: function(){
    },

    hasUpRightConflictAt: function(i){
    }

  });

  this.ChessboardModel = ChessboardModel;

}());