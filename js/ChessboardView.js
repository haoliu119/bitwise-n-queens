(function(){

  var ChessboardView = Backbone.View.extend({

    tagName: "table",
    template: Mustache.compile(
      "{{#board}}"
        + "<tr class='row'>"
          + "{{#.}}"
            + "<td class='square {{#sign}}positive{{/sign}}{{^sign}}negative{{/sign}}'>"
              + "{{#piece}}&#9813;{{/piece}}"
            + "</td>"
          + "{{/.}}"
        + "</tr>"
      + "{{/board}}"
    ),

    initialize: function() {
      this.model = new ChessboardModel({n: 8});
    },

    render: function() {
      return this.$el.html(this.template(this.model));
    }

  });

  this.ChessboardView = ChessboardView;
}());