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

    _isInBounds: function(r, c){
      return 0 <= r && r < this.get('n') && 0 <= c && c < this.get('n');
    },


    // todo: fill in all these functions - they'll help you!

    hasAnyRowConflict: function(){
      // todo
    },

    hasRowConflictAt: function(r){
      // todo
    },

    hasAnyColConflict: function(){
      // todo
    },

    hasColConflictAt: function(c){
      // todo
    },

    hasAnyUpLeftConflict: function(){
      // todo
    },

    hasUpLeftConflictAt: function(upLeftIndex){
      // todo
    },

    hasAnyUpRightConflict: function(){
      // todo
    },

    hasUpRightConflictAt: function(upRightIndex){
      // todo
    }
  });

  this.ChessboardModel = ChessboardModel;

}());
