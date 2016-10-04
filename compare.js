'use strict';


function consoleTime(f) {
  return function() {
    var timing = [new Date().getTime()];
    f.apply(this, arguments);
    timing.push(new Date().getTime());
    window.setTimeout(function() {
      timing.push(new Date().getTime());
      console.timeEnd('update');
      console.log('%s: App %s ms | Browser %s ms | Total %s ms',
        Model.actionName,
        timing[1] - timing[0],
        timing[2] - timing[1],
        timing[2] - timing[0]
      );
    });
  }
}

var Model = {
  'actionName': 'Init',
  'action': function(node) {
    if (node.nodeName.toLowerCase() === 'td') {
      switch(node.parentNode.parentNode.nodeName.toLowerCase()) {
        case 'thead':
          this.sort(node.cellIndex);
          break;
        case 'tbody':
          this.dashes(node.parentNode.rowIndex - 1, node.cellIndex);
          break;
      }
    }
  },
  'meta': {'cols': ['Id', 'Column 0', 'Column 1', 'Column 2', 'Column 3']},
  'data': [],
  'sort': function(col) {
    var order = this.col === col ? (this.col = -1, 1) : (this.col = col, -1);
    this.data.sort(function(a, b) {
      return a[col] === b[col] ? 0 : (a[col] < b[col]) ? -order : order;
    });
    this.actionName = 'Sort';
  },
  'dashes': function(y, x) {
    this.data[y][x] = '---';
    this.actionName = '1 node';
  },
  'pluses': function() {
    for (var i = 0; i < 20; i++) {
      this.data[i][2] = '+++';
    }
    this.actionName = '20 nodes';
  },
};

for (var i = 0; i < 1000; i++) {
  var row = [i];
  for (var j = 0; j < Model.meta.cols.length - 1; j++) {
    row.push(Math.random().toString(36).substr(2, 11));
  }
  Model['data'].push(row);
}


timing.push(new Date().getTime());

run(window, Model);

window.setTimeout(function() {
  timing.push(new Date().getTime() - 10);
  console.log('Parse %s ms | App %s ms | Browser %s ms | Total %s ms',
    timing[1] - timing[0],
    timing[2] - timing[1],
    timing[3] - timing[2],
    timing[3] - timing[0]);
}, 10);

timing.push(new Date().getTime());
