describe("ChessboardModel", function() {
  var model, collection;

  beforeEach(function() {
    model = new ChessboardModel({n:8});
  });

  it("should find non conflicts", function() {
    model.setSimpleBoard([
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ]);
    expect(model.hasAnyRowConflict()).toBe(false);
    expect(model.hasAnyColConflict()).toBe(false);
    expect(model.hasAnyUpLeftConflict()).toBe(false);
    expect(model.hasAnyUpRightConflict()).toBe(false);
    expect(model.hasRooksConflict()).toBe(false);
    expect(model.hasQueensConflict()).toBe(false);
  });

  it("should find row conflicts", function() {
    model.setSimpleBoard([
      [false, false, false, false],
      [true,  true,  false, false],
      [false, false, false, false],
      [false, false, false, false]
    ]);
    expect(model.hasAnyRowConflict()).toBe(true);
    expect(model.hasAnyColConflict()).toBe(false);
    expect(model.hasAnyUpLeftConflict()).toBe(false);
    expect(model.hasAnyUpRightConflict()).toBe(false);
    expect(model.hasRooksConflict()).toBe(true);
    expect(model.hasQueensConflict()).toBe(true);
  });

  it("should find column conflicts", function() {
    model.setSimpleBoard([
      [true,  false, false, false],
      [false, false, false, false],
      [true,  false, false, false],
      [false, false, false, false]
    ]);
    expect(model.hasAnyRowConflict()).toBe(false);
    expect(model.hasAnyColConflict()).toBe(true);
    expect(model.hasAnyUpLeftConflict()).toBe(false);
    expect(model.hasAnyUpRightConflict()).toBe(false);
    expect(model.hasRooksConflict()).toBe(true);
    expect(model.hasQueensConflict()).toBe(true);
  });

  it("should find back-slash-style conflicts", function() {
    model.setSimpleBoard([
      [false, true,  false, false],
      [false, false, true,  false],
      [false, false, false, false],
      [false, false, false, false]
    ].reverse());
    expect(model.hasAnyRowConflict()).toBe(false);
    expect(model.hasAnyColConflict()).toBe(false);
    expect(model.hasAnyUpLeftConflict()).toBe(true);
    expect(model.hasAnyUpRightConflict()).toBe(false);
    expect(model.hasRooksConflict()).toBe(false);
    expect(model.hasQueensConflict()).toBe(true);
  });

  it("should find forward-slash-style conflicts", function() {
    model.setSimpleBoard([
      [false, false, true,  false],
      [false, false, false, false],
      [true,  false, false, false],
      [false, false, false, false]
    ].reverse());
    expect(model.hasAnyRowConflict()).toBe(false);
    expect(model.hasAnyColConflict()).toBe(false);
    expect(model.hasAnyUpLeftConflict()).toBe(false);
    expect(model.hasAnyUpRightConflict()).toBe(true);
    expect(model.hasRooksConflict()).toBe(false);
    expect(model.hasQueensConflict()).toBe(true);
  });

});
