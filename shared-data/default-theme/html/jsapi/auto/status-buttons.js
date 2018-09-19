

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

  function fetchStatus() {
    var url = '/mpemail/rest_api/email/status';
    var baseURL = DJANGO_URL;

    var config = {
      url: url,
      baseURL: baseURL,
      method: 'POST',
      mode: 'no-cors',
      data: {
        mids: allMids
      },
      credentials: 'same-origin',
      crossDomain: true
    };

    console.log('fetchStatus');

    var self = this;
    axios(config).then(function (response) {
      var data = response.data;

      store.dispatch({
        type: 'UPDATE_STATUS',
        status: data
      });

      // setTimeout(fetchStatus, 1500);      
    }).catch(function (error) {
      console.log(error.response);
    });
  }

  fetchStatus();
};
// })