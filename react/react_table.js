'use strict';



var Table = React.createClass({displayName: 'Table',
  getInitialState: function() {
    return Model;
  },


  action: function(e) {
    Model.action(e.target);
    consoleTime(this.setState).call(this, {data: Model.data});
  },

  button: function(e) {
    Model.pluses();
    consoleTime(this.setState).call(this, {data: Model.data});
  },

  render: function() {
    return (
      React.createElement('div', {},
        React.createElement(
          'span',
          {'className': 'button', 'onClick': this.button},
          'Update +++'),
        React.createElement('table', {'onClick': this.action},
          new Thead(this.state.meta.cols).render(),
          new Tbody(this.state.data).render()
        )
      )
    );
  },
});


var Thead = React.createClass({displayName: 'Thead',
  render: function() {
    return React.createElement('thead', {},
      new TableRow(this.props).render());
  },
});


var Tbody = React.createClass({displayName: 'Tbody',
  render: function() {
    var tbody = ['tbody', {}];
    for (var i = 0; i < this.props.length; i++) {
      tbody.push(new TableRow(this.props[i]).render());
    }
    return React.createElement.apply(null, tbody);
  },
});


var TableRow = React.createClass({displayName: 'TableRow',
  render: function() {
    var row = ['tr', {}];
    for (var i = 0; i < this.props.length; i++) {
      row.push(React.createElement('td', {}, this.props[i]));
    }
    return React.createElement.apply(null, row);
  },
});


function run(w, model) {
  ReactDOM.render(
    React.createElement(Table, null),
    document.querySelector('.TableRoot')
  );
}
