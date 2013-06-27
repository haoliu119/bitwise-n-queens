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

    colHash: {
    },

    majDiagHash: {
    },

    minDiagHash: {
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      // alert('hi');
      // console.log('rowindex', rowIndex);
      // console.log('the row array: '+this.get(rowIndex));
      var total = _.reduce(this.get(rowIndex+''), function(sum, value){
        return sum + value;
      }, 0);
      // // // take in row index
      // // // reduce row
      // // // if sum is greater than 1 return false
      return (total > 1);
    },

    hasAnyRowConflicts: function(){
      var results = [];
      for (var i = 0; i < this.get('n'); i++){
        results.push(this.hasRowConflictAt(i));
      }
      return _.some(results);
      //iterate of all rows in the board. _.any with rowConflict
      //run hasRowConflictAt on n
    },

    hasColConflictAt: function(colIndex){
      var cols = [];
      for (var i = 0; i < this.get('n'); i++){
        cols.push(this.get(i)[colIndex]);
        //iterate through every row
        //check a value of a given column for every row
        // add that to an array
      }
      var total = _.reduce(cols, function(sum, value){
        return sum + value;
      }, 0);
      //reduce that array
      return (total > 1); // fixme
    },

    hasAnyColConflicts: function(){
      var results = [];
      for (var i = 0; i < this.get('n'); i++){
        results.push(this.hasColConflictAt(i));
      }
      return _.some(results); // fixme
    },

    // hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
    //   var total = 0;

    //   //start with a negative column of -(n-1)
    //   // console.log(majorDiagonalColumnIndexAtFirstRow);
    //   // for (var i = 0; i < this.get('n'); i++){

    //   // }
    //   //passed in a rowIndex
    //   //iterate through every element in the row. check if there is a value at the +1,+1 or -1,+1.
    //   //if so, return true
    //   return false; // fixme
    // },
    hasMajorDiagonalConflictAt: function(r,c,n,sum,flag){
      flag = flag || false;
      sum = sum || 0;

      sum += this.get(r)[c];
      flag = sum>1;
      if (!flag && r+1<n && c+1<n){
        flag = this.hasMajorDiagonalConflictAt(r+1,c+1,n,sum,flag);
      }
      return flag;
    },

    hasAnyMajorDiagonalConflicts: function(){
      var n = this.get('n');
      var flag = false;
      for (var c = 0; c < n-1; c++){
        flag = flag || this.hasMajorDiagonalConflictAt(0,c,n);
      }
      for (var r = 1; r < n-1; r++){
        flag = flag || this.hasMajorDiagonalConflictAt(r,0,n);
      }
      return flag;
    },

    hasMinorDiagonalConflictAt: function(r,c,n,sum,flag){
      flag = flag || false;
      sum = sum || 0;

      sum += this.get(r)[c];
      flag = sum>1;
      if (!flag && r+1<n && c-1>=0){
        flag = this.hasMinorDiagonalConflictAt(r+1,c-1,n,sum,flag);
      }
      return flag;
    },

    hasAnyMinorDiagonalConflicts: function(){
      var n = this.get('n');
      var flag = false;
      for (var c = 1; c < n; c++){
        flag = flag || this.hasMinorDiagonalConflictAt(0,c,n);
      }
      for (var r = 1; r < n-1; r++){
        flag = flag || this.hasMinorDiagonalConflictAt(r,n-1,n);
      }
      return flag;
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