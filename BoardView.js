(function(){

  window.BoardView = Backbone.View.extend({

    tagName: 'table',
    template: Mustache.compile('{{#rows}}' +
      '<tr class="row">' +
        '{{#.}}' +
          '<td class="square {{#inConflict}}inConflict{{/inConflict}} {{#sign}}positive{{/sign}}{{^sign}}negative{{/sign}}" data-row-index="{{rowIndex}}" data-col-index="{{colIndex}}">' +
            '{{#hasPiece}}&#9813;{{/hasPiece}}' +
          '</td>' +
        '{{/.}}' +
      '</tr>' +
    '{{/rows}}'),

    initialize: function() {
//asdfasdf todo: move this to the events hash
      var that = this;
      this.$el.on('click', '.square', function(e){
        that.model.togglePiece($(this).data('row-index'), $(this).data('col-index'));
      });
      this.model = new Board({n: 8});
      this.model.on('change', this.render, this);
    },

    render: function() {
      return this.$el.html(this.template(this.model));
    }

  });

}());