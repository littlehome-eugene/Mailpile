


// $(document).ready(function() {
Mailpile.ActionButtons = {};
Mailpile.ActionButtons.init = function() {
  const domContainer4 = document.querySelector('#ann-checkbox-all');

  if (domContainer4) {
  ReactDOM.render(
    <ReactRedux.Provider store={store}>
      <CheckboxAll/>
    </ReactRedux.Provider>,
    domContainer4);
  
  const domContainer = document.querySelector('#ann-order');
  ReactDOM.render(
    <ReactRedux.Provider store={store}>
      <Order/>
    </ReactRedux.Provider>,
    domContainer);
  
  const domContainer2 = document.querySelector('#ann-order-complete');
  ReactDOM.render(
    <ReactRedux.Provider store={store}>
      <OrderComplete/>
    </ReactRedux.Provider>,
    domContainer2);

  var domContainer3 = document.querySelector('#ann-songjang');
  ReactDOM.render(React.createElement(
    ReactRedux.Provider,
    { store: store },
    React.createElement(Reply, null)
  ), domContainer3);
  }
  
}
// })