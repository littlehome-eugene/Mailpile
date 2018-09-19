



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


function fetchStatus() {
  let url = '/mpemail/rest_api/email/status'
  let baseURL = DJANGO_URL
  
  let config = {
    url,
    baseURL,
    method: 'POST',
    mode: 'no-cors',
    data: {
      mids: allMids
    },
    credentials: 'same-origin',
    crossDomain: true,
  }

  console.log('fetchStatus')

  let self = this
  axios(config).then(
    response => {
      let {data} = response
      store.dispatch({
        type: 'UPDATE_STATUS', 
        status: data
      })

    // setTimeout(fetchStatus, 1500);      
    }).catch(error => {
      console.log(error.response)
    })

}

  fetchStatus()
  
}
// })

