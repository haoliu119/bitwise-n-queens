describe("ChessboardModel", function() {
  var model, collection;

  beforeEach(function() {
    model = new ChessboardModel({n:8});
  });

  it("should be initialized with no pieces", function() {
    expect(model).toBeTruthy();
  });

});
