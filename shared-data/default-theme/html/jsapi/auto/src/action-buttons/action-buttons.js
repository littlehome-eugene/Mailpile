

const store = Redux.createStore(reducers)

// $(document).ready(function() {
Mailpile.ActionButtons = {};
Mailpile.ActionButtons.init = function() {
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

}
// })