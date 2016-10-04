'use strict';



function Table(model) {
  this.model = model;
}


Table.prototype.action = function(e) {
  Model.action(e.target);
  consoleTime($.update)(tableApp.render(), root);
};


Table.prototype.button = function(e) {
  Model.pluses();
  consoleTime($.update)(tableApp.render(), root);
};


Table.prototype.render = function() {
  var model = this.model;
  var theadNodes = [];
  var cols = model['meta']['cols'];
  for (var i = 0; i < cols.length; i++) {
    theadNodes.push({name: 'td', nodes: [cols[i]]});
  }
  var tbodyNodes = [];
  var rows = model['data'];
  for (var i = 0; i < rows.length; i++) {
    var rowNodes = [];
    for (var j = 0; j < rows[i].length; j++) {
      rowNodes.push({name: 'td', nodes: [rows[i][j]]});
    }
    tbodyNodes.push({name: 'tr', nodes: rowNodes});
  }
  return {
    name: 'div', nodes: [
      {
        name: 'span',
        attrs: {'class': 'button'},
        events: {'click': this.button},
        nodes: ['Update +++']},
      {
        name: 'table',
        events: {'click': this.action},
        nodes: [
          {name: 'thead', nodes: [{name: 'tr', nodes: theadNodes}]},
          {name: 'tbody', nodes: tbodyNodes},
        ]
      },
    ]
  };
};


function run(w, model) {
  w.tableApp = new Table(model);
  w.tableRoot = document.querySelector('.TableRoot');
  w.root = tableRoot.appendChild($.update(w.tableApp.render()));
}
