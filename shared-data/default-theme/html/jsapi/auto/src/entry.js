const DJANGO_URL = 'http://localhost:10044'

class Entry extends React.Component {
  constructor(props) {
    super(props)
    this.fetchStatus = this.fetchStatus.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(() => this.fetchStatus(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchStatus() {
    let url = '/mpemail/rest_api/email/status'
    let baseURL = DJANGO_URL
    let { dispatch } = this.props
    
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

    axios(config).then(
    response => {
      let {data} = response
      dispatch({
        type: 'UPDATE_STATUS', 
        status: data
      })
    }).catch(error => {
      console.log(error.response)
      
    })
  }

  render() {
    return (
      <div></div>
    )
  }
  
}


const mapStateToProps = (state, ownProps) => {

  return {
    status: state.status
  }
}

Entry = ReactRedux.connect(
  mapStateToProps,
  dispatch => {
    return { dispatch }
  }
)(Entry)


$.propHooks.checked = {
    set: function (el, value) {
        if (el.checked !== value) {
            trigger = true;
        } else {
            trigger = false;
        }
        el.checked = value;
        if (trigger) {
            $(el).trigger('change');
        }
    }
};