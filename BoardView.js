(function(){

  window.BoardView = Backbone.View.extend({

    tagName: 'table',
    template: Mustache.compile('{{#.}}' +
      '<tr class="row">' +
        '{{#.}}' +
          '<td class="square {{#inConflict}}inConflict{{/inConflict}} {{#sign}}positive{{/sign}}{{^sign}}negative{{/sign}}" data-row-index="{{rowIndex}}" data-col-index="{{colIndex}}">' +
            '{{#hasPiece}}&#9813;{{/hasPiece}}' +
          '</td>' +
        '{{/.}}' +
      '</tr>' +
    '{{/.}}'),

    initialize: function() {
//asdfasdf todo: move this to the events hash
      var that = this;
      this.$el.on('click', '.square', function(e){
        that.model.togglePiece($(this).data('row-index'), $(this).data('col-index'));
      });
      this.model.on('change', this.render, this);
    },

    render: function() {
      var model = this.model;
      var renderableSquares = _(_.range(model.get('n'))).map(function(rowIndex){
        return _(_.range(model.get('n'))).map(function(colIndex){
          return {
  // todo ASDFASDF .row -> .rowIndex
            rowIndex: rowIndex,
            colIndex: colIndex,
            hasPiece: model.get(rowIndex)[colIndex],
            sign: !!((rowIndex + colIndex) % 2),
            inConflict: function(){
              // todo: how expensive is .inConflict() to compute?
              return (
                model.hasRowConflictAt(rowIndex) ||
                model.hasColConflictAt(colIndex) ||
                model.hasMajorDiagonalConflictAt(model._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
                model.hasMinorDiagonalConflictAt(model._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
              );
            }
          };
        }, this);
      }, this);
      return this.$el.html(this.template(renderableSquares));
    }
  });

}());