(function(){

  var ChessboardView = Backbone.View.extend({

    tagName: "table",
    template: Mustache.compile(
      "{{#reversedRows}}"
        + "<tr class='row'>"
          + "{{#.}}"
            + "<td class='square {{#inConflict}}inConflict{{/inConflict}} {{#sign}}positive{{/sign}}{{^sign}}negative{{/sign}}' data-row='{{row}}' data-col='{{col}}'>"
              + "{{#piece}}&#9813;{{/piece}}"
            + "</td>"
          + "{{/.}}"
        + "</tr>"
      + "{{/reversedRows}}"
    ),

    initialize: function() {
      var that = this;
      this.$el.on('click', '.square', function(e){
        that.model.togglePiece($(this).data('row'), $(this).data('col'));
      });
      this.model = new ChessboardModel({n: 8});
      this.model.on('change', this.render.bind(this));
    },

    render: function() {
      return this.$el.html(this.template(this.model));
    }

  });

  this.ChessboardView = ChessboardView;
}());