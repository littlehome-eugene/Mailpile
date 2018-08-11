

var store = Redux.createStore(reducers);

// $(document).ready(function() {
Mailpile.StatusButton = {};
Mailpile.StatusButton.init = function () {
  document.querySelectorAll('.ann-checkbox').forEach(function (domContainer) {
    // Read the comment ID from a data-* attribute.
    var mid = domContainer.dataset.mid;
    ReactDOM.render(React.createElement(
      ReactRedux.Provider,
      { store: store },
      React.createElement(Email, {
        mid: mid
      })
    ), domContainer);
  });

  domContainer = document.querySelector('#ann-dummy');
  ReactDOM.render(React.createElement(
    ReactRedux.Provider,
    { store: store },
    React.createElement(Entry, null)
  ), domContainer);
};
// })