describe("Chessboard", function() {
  var chessboard;

  beforeEach(function() {
    chessboard = new Chessboard();
  });

  it("should exist", function() {
    expect(chessboard).toBeTruthy();
  });
});
