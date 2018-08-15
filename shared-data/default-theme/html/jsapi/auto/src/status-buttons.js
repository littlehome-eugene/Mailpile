



// $(document).ready(function() {
Mailpile.StatusButton = {};
Mailpile.StatusButton.init = function() {


  document.querySelectorAll('.ann-checkbox')
  .forEach(domContainer => {
    // Read the comment ID from a data-* attribute.
    const mid = domContainer.dataset.mid;
    ReactDOM.render(
      <ReactRedux.Provider store={store}>
        <Email
          mid={mid}
          />
      </ReactRedux.Provider>,
      domContainer
    );
  })

  domContainer = document.querySelector('#ann-dummy');  
    ReactDOM.render(
      <ReactRedux.Provider store={store}>
        <Entry
          />
      </ReactRedux.Provider>,
      domContainer
    );

}
// })

