(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
      this.buildSquares(this);
    },

    buildSquares: function(){
      var self = this;
      _(this.get('n')).times(function(rowIndex){
        _(this.get('n')).times(function(colIndex){
          this.get(rowIndex)[colIndex] = {
  // todo ASDFASDF .row -> .rowIndex
            rowIndex: rowIndex,
            colIndex: colIndex,
            hasPiece: self.get(rowIndex)[colIndex],
            sign: !!((rowIndex + colIndex) % 2),
            inConflict: function(){
              // todo: how expensive is .inConflict() to compute?
              return (
                self.hasRowConflictAt(rowIndex) ||
                self.hasColConflictAt(colIndex) ||
                self.hasMajorDiagonalConflictAt(self._getMajorDiagonalIndex(rowIndex, colIndex)) ||
                self.hasMinorDiagonalConflictAt(self._getMinorDiagonalIndex(rowIndex, colIndex))
              );
            }
          };
        }, this);
      }, this);
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

// asdfasdf todo
    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex].hasPiece = + !this.get(rowIndex)[colIndex].hasPiece;
      this.trigger('change');
    },

    _getMajorDiagonalIndex: function(rowIndex, colIndex){
      return rowIndex + colIndex;
    },

    _getMinorDiagonalIndex: function(rowIndex, colIndex){
      return this.get('n') - 1 + rowIndex - colIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      return 1 < _(_.range(this.get('n'))).reduce(function(pieceCount, colIndex){
        return pieceCount + this.get(rowIndex)[colIndex].hasPiece;
      }, 0, this);
      return false; // fixme
    },

    hasAnyRowConflicts: function(){
      return _(_.range(this.get('n'))).reduce(function(conflictFound, rowIndex){
        return conflictFound || this.hasRowConflictAt(rowIndex);
      }, false, this);
      return false; // fixme
    },

    hasColConflictAt: function(colIndex){
      return 1 < _(_.range(this.get('n'))).reduce(function(pieceCount, rowIndex){
        return pieceCount + this.get(rowIndex)[colIndex].hasPiece;
      }, 0, this);
      return false; // fixme
    },

    hasAnyColConflicts: function(){
      return _(_.range(this.get('n'))).reduce(function(conflictFound, colIndex){
        return conflictFound || this.hasColConflictAt(colIndex);
      }, false, this);
      return false; // fixme
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      return 1 < _(_.range(this.get('n'))).reduce(function(pieceCount, rowIndex){
        var colIndex = majorDiagonalColumnIndexAtFirstRow + rowIndex;
        return pieceCount + (this._isInBounds(rowIndex, colIndex) && this.get(rowIndex)[colIndex].hasPiece);
      }, 0, this);

      var max = this.get('n') - 1;
      var rowIndex = Math.max(0, majorDiagonalIndex - max);
      var colIndex = Math.max(0, max - majorDiagonalIndex);
      var pieceCount = 0;
      while(this._isInBounds(rowIndex, colIndex)){
        pieceCount += this.get(rowIndex)[colIndex].hasPiece;
        rowIndex++;
        colIndex++;
      }
      return 1 < pieceCount;
      return false; // fixme
    },

    hasAnyMajorDiagonalConflicts: function(){
      return _(_.range(-this.get('n') + 1, this.get('n'))).reduce(function(conflictFound, majorDiagonalColumnIndexAtFirstRow){
        return conflictFound || this.hasMajorDiagonalConflictAt(majorDiagonalColumnIndexAtFirstRow);
      }, false, this);
      return false; // fixme
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      return 1 < _(_.range(this.get('n'))).reduce(function(pieceCount, rowIndex){
        var colIndex = minorDiagonalColumnIndexAtFirstRow - rowIndex;
        return pieceCount + (this._isInBounds(rowIndex, colIndex) && this.get(rowIndex)[colIndex].hasPiece);
      }, 0, this);

      var max = this.get('n') - 1;
      var rowIndex = Math.max(max, minorDiagonalIndex - max);
      var colIndex = Math.min(max, minorDiagonalIndex);
      var pieceCount = 0;
      while(this._isInBounds(rowIndex, colIndex)){
        pieceCount += this.get(rowIndex)[colIndex].hasPiece;
        rowIndex++;
        colIndex--;
      }
      return 1 < pieceCount;
      return false; // fixme
    },

    hasAnyMinorDiagonalConflicts: function(){
      return _(_.range(this.get('n') * 2 - 1)).reduce(function(conflictFound, minorDiagonalColumnIndexAtFirstRow){
        return conflictFound || this.hasMinorDiagonalConflictAt(minorDiagonalColumnIndexAtFirstRow);
      }, false, this);
      return false; // fixme
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
