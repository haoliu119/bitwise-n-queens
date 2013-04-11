describe("Board", function() {

  var checkAllConflictTypes = function(matrix, conflictExpectations){
    var board = new Board(matrix);
    _.map({
      row: 'hasAnyRowConflicts',
      col: 'hasAnyColConflicts',
      rooks: 'hasAnyRooksConflicts',
      upLeft: 'hasAnyUpLeftConflicts',
      upRight: 'hasAnyUpRightConflicts',
      queens: 'hasAnyQueensConflicts'
    }, function(conflictDetectorMethodName, conflictType){
      var conflictDetected = board[conflictDetectorMethodName]();
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
      upLeft: false,
      upRight: false,
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
      upLeft: false,
      upRight: false,
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
      upLeft: false,
      upRight: false,
      rooks: true,
      queens: true
    });
  });

  it("should find back-slash-style conflicts", function() {
    checkAllConflictTypes([
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ].reverse(), {
      row: false,
      col: false,
      upLeft: true,
      upRight: false,
      rooks: false,
      queens: true
    });

  });

  it("should find forward-slash-style conflicts", function() {
    checkAllConflictTypes([
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ].reverse(), {
      row: false,
      col: false,
      upLeft: false,
      upRight: true,
      rooks: false,
      queens: true
    });
  });

});
