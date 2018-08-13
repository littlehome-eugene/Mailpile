

var store = Redux.createStore(reducers);

// $(document).ready(function() {
Mailpile.ActionButtons = {};
Mailpile.ActionButtons.init = function () {
  var domContainer = document.querySelector('#ann-order');
  ReactDOM.render(React.createElement(
    ReactRedux.Provider,
    { store: store },
    React.createElement(Order, null)
  ), domContainer);

  var domContainer2 = document.querySelector('#ann-order-complete');
  ReactDOM.render(React.createElement(
    ReactRedux.Provider,
    { store: store },
    React.createElement(OrderComplete, null)
  ), domContainer2);

  var domContainer3 = document.querySelector('#ann-songjang');
  ReactDOM.render(React.createElement(ReactRedux.Provider, { store: store }, React.createElement(Reply, null)), domContainer3);
};
// })