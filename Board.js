(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
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
/* START_SOLUTION */
      return 1 < _(_.range(this.get('n'))).reduce(function(pieceCount, colIndex){
        return pieceCount + this.get(rowIndex)[colIndex];
      }, 0, this);
/* END_SOLUTION */
/* START_PROMPT
      return false; // fixme
END_PROMPT */
    },

    hasAnyRowConflicts: function(){
/* START_SOLUTION */
      return _(_.range(this.get('n'))).reduce(function(conflictFound, rowIndex){
        return conflictFound || this.hasRowConflictAt(rowIndex);
      }, false, this);
/* END_SOLUTION */
/* START_PROMPT
      return false; // fixme
END_PROMPT */
    },

    hasColConflictAt: function(colIndex){
/* START_SOLUTION */
      return 1 < _(_.range(this.get('n'))).reduce(function(pieceCount, rowIndex){
        return pieceCount + this.get(rowIndex)[colIndex];
      }, 0, this);
/* END_SOLUTION */
/* START_PROMPT
      return false; // fixme
END_PROMPT */
    },

    hasAnyColConflicts: function(){
/* START_SOLUTION */
      return _(_.range(this.get('n'))).reduce(function(conflictFound, colIndex){
        return conflictFound || this.hasColConflictAt(colIndex);
      }, false, this);
/* END_SOLUTION */
/* START_PROMPT
      return false; // fixme
END_PROMPT */
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
/* START_SOLUTION */
      return 1 < _(_.range(this.get('n'))).reduce(function(pieceCount, rowIndex){
        var colIndex = majorDiagonalColumnIndexAtFirstRow + rowIndex;
        return pieceCount + (this._isInBounds(rowIndex, colIndex) && this.get(rowIndex)[colIndex]);
      }, 0, this);
/* END_SOLUTION */
/* START_PROMPT
      return false; // fixme
END_PROMPT */
    },

    hasAnyMajorDiagonalConflicts: function(){
/* START_SOLUTION */
      return _(_.range(-this.get('n') + 1, this.get('n'))).reduce(function(conflictFound, majorDiagonalColumnIndexAtFirstRow){
        return conflictFound || this.hasMajorDiagonalConflictAt(majorDiagonalColumnIndexAtFirstRow);
      }, false, this);
/* END_SOLUTION */
/* START_PROMPT
      return false; // fixme
END_PROMPT */
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
/* START_SOLUTION */
      return 1 < _(_.range(this.get('n'))).reduce(function(pieceCount, rowIndex){
        var colIndex = minorDiagonalColumnIndexAtFirstRow - rowIndex;
        return pieceCount + (this._isInBounds(rowIndex, colIndex) && this.get(rowIndex)[colIndex]);
      }, 0, this);
/* END_SOLUTION */
/* START_PROMPT
      return false; // fixme
END_PROMPT */
    },

    hasAnyMinorDiagonalConflicts: function(){
/* START_SOLUTION */
      return _(_.range(this.get('n') * 2 - 1)).reduce(function(conflictFound, minorDiagonalColumnIndexAtFirstRow){
        return conflictFound || this.hasMinorDiagonalConflictAt(minorDiagonalColumnIndexAtFirstRow);
      }, false, this);
/* END_SOLUTION */
/* START_PROMPT
      return false; // fixme
END_PROMPT */
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
