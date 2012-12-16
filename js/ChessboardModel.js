(function(){

  var ChessboardModel = Backbone.Model.extend({
    initialize: function(params){
      if (params.n) {
        this.clearPieces();
      } else {
        this.setSimpleBoard(params.board);
      }
    },

    clearPieces: function(){
      this.set('board', this.makeEmptyBoard());
    },

    setSimpleBoard: function(simpleBoard){
      this.set('board', this.makeBoardFromSimpleBoard(simpleBoard));
      this.set('n', this.get('board').length);
    },

    makeBoardFromSimpleBoard: function(simpleBoard){
      var that = this;
      return _.map(simpleBoard, function(cols, r){
        return _.map(cols, function(hasPiece, c){
          return {
            row: r,
            col: c,
            piece: hasPiece,
            sign: ((r+c)%2),
            inConflict: function(){
              // todo: how expensive is this inConflict() to compute?
              return (
                that.hasRowConflictAt(r) ||
                that.hasColConflictAt(c) ||
                that.hasUpLeftConflictAt(that._getUpLeftIndex(r, c)) ||
                that.hasUpRightConflictAt(that._getUpRightIndex(r, c))
              );
            }
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

    // we want to see the first row at the bottom, but html renders things from top down
    // So we provide a reversing function to visualize better
    reversedRows: function(){
      return _.extend([], this.get('board')).reverse();
    },

    togglePiece: function(r, c){
      this.get('board')[r][c].piece = !this.get('board')[r][c].piece;
      this.trigger('change');
    },

    _getUpLeftIndex: function(r, c){
      return r + c;
    },

    _getUpRightIndex: function(r, c){
      return this.get('n') - c + r - 1;
    },


    hasRooksConflict: function(){
      return this.hasAnyRowConflict() || this.hasAnyColConflict();
    },

    hasQueensConflict: function(){
      return this.hasRooksConflict() || this.hasAnyUpLeftConflict() || this.hasAnyUpRightConflict();
    },


    // todo: fill in all these functions - they'll help you!

    hasAnyRowConflict: function(){
      for(var i = 0; i < this.get('n'); i++){
        if(this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false;
    },

    hasRowConflictAt: function(r){
      var firstPiece = false;
      for(var c = 0; c < this.get('n'); c++){
        if(this.get('board')[r][c].piece){
          if(firstPiece){
            return true;
          } else {
            firstPiece = true;
          }
        }
      }
      return false;
    },

    hasAnyColConflict: function(){
      for(var c = 0; c < this.get('n'); c++){
        if(this.hasColConflictAt(c)){
          return true;
        }
      }
      return false;
    },

    hasColConflictAt: function(c){
      var firstPiece = false;
      for(var r = 0; r < this.get('n'); r++){
        if(this.get('board')[r][c].piece){
          if(firstPiece){
            return true;
          } else {
            firstPiece = true;
          }
        }
      }
      return false;
    },

    hasAnyUpLeftConflict: function(){
      for(var i = 0; i < this.get('n') * 2 - 1; i++){
        if(this.hasUpLeftConflictAt(i)){
          return true;
        }
      }
      return false;
    },

    _isInBounds: function(r, c){
      return 0 <= r && r < this.get('n') && 0 <= c && c < this.get('n');
    },

    hasUpLeftConflictAt: function(upLeftIndex){
      var n = this.get('n');
      var max = n - 1;
      var r = upLeftIndex - max < 0 ? 0 : upLeftIndex - max;
      var c = max < upLeftIndex ? max : upLeftIndex;
      var firstPiece = false;
      while(this._isInBounds(r, c)){
        if(this.get('board')[r][c].piece){
          if(firstPiece){
            return true;
          } else {
            firstPiece = true;
          }
        }
        r = r + 1;
        c = c - 1;
      }
      return false;
    },

    hasAnyUpRightConflict: function(){
      for(var i = 0; i < this.get('n') * 2 - 1; i++){
        if(this.hasUpRightConflictAt(i)){
          return true;
        }
      }
      return false;
    },

    hasUpRightConflictAt: function(upRightIndex){
      var n = this.get('n');
      var max = n - 1;
      var r = upRightIndex - max;
      r < 0 && (r = 0);
      var c = max - upRightIndex;
      c < 0 && (c = 0);
      var firstPiece = false;
      while(this._isInBounds(r, c)){
        if(this.get('board')[r][c].piece){
          if(firstPiece){
            return true;
          } else {
            firstPiece = true;
          }
        }
        r = r + 1;
        c = c + 1;
      }
      return false;
    }
  });

  this.ChessboardModel = ChessboardModel;

}());
