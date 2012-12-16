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
      this.set('n', this.get('board', length));
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
                that.hasUpLeftConflictAt(that._getUpRightIndex(r, c))
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
      return this.get('n') - r + c;
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
      return false;
    },

    hasAnyUpLeftConflict: function(){
      return false;
    },

    hasUpLeftConflictAt: function(upLeftIndex){
      return false;
    },

    hasAnyUpRightConflict: function(){
      return false;
    },

    hasUpRightConflictAt: function(upRightIndex){
      return false;
    }

  });

  this.ChessboardModel = ChessboardModel;

}());
