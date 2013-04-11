describe("Board", function() {

  var capitalize = function(word){
    return word[0].toUpperCase() + word.slice(1);
  };

  var checkAllConflictTypes = function(matrix, conflictExpectations){
    var board = new Board(matrix);
    _.map('row col rooks majorDiagonal minorDiagonal queens'.split(' '), function(conflictType){
      var conflictDetected = board['hasAny' + capitalize(conflictType) + 'Conflicts']();
      var conflictExpected = conflictExpectations[conflictType];
      expect(conflictDetected).toEqual(conflictExpected);
    });
  };

  it("should find non conflicts", function() {
    checkAllConflictTypes([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ], {
      row: false,
      col: false,
      majorDiagonal: false,
      minorDiagonal: false,
      rooks: false,
      queens: false
    });
  });

  it("should find row conflicts", function() {
    checkAllConflictTypes([
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ], {
      row: true,
      col: false,
      majorDiagonal: false,
      minorDiagonal: false,
      rooks: true,
      queens: true
    });
  });

  it("should find column conflicts", function() {
    checkAllConflictTypes([
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ], {
      row: false,
      col: true,
      majorDiagonal: false,
      minorDiagonal: false,
      rooks: true,
      queens: true
    });
  });

  it("should find major diagonal conflicts", function() {
    checkAllConflictTypes([
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ], {
      row: false,
      col: false,
      majorDiagonal: true,
      minorDiagonal: false,
      rooks: false,
      queens: true
    });

  });

  it("should find minor diagonal conflicts", function() {
    checkAllConflictTypes([
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ], {
      row: false,
      col: false,
      majorDiagonal: false,
      minorDiagonal: true,
      rooks: false,
      queens: true
    });
  });

});
