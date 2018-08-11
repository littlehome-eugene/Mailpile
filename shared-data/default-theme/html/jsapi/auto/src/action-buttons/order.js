'use strict';

const DJANGO_URL = 'http://zibann.kr:10044'

class Order extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }


  render() {
    return (
      <div onClick={this.handleClick}>
        주문
      </div>
    )
  }

  handleClick() {
    console.log('order')

    let url = '/mpemail/rest_api/email/order'
    let baseURL = DJANGO_URL
    let { dispatch } = this.props
    
    let config = {
      url,
      baseURL,
      method: 'POST',
      mode: 'no-cors',
      data: {
        mids: checkedMids
      },
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      // },
      // withCredentials: true,
      credentials: 'same-origin',
    }

    axios(config).then(
    response => {
      let {data} = response
      dispatch({
        type: 'UPDATE_STATUS', 
        status: data
      })
    })
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    status: state.status
  }
}

Order = ReactRedux.connect(
  mapStateToProps,
  dispatch => {
    return { dispatch }
  }
)(Order)
