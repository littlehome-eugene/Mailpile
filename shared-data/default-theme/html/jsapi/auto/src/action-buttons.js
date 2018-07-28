'use strict';

const DJANGO_URL = 'http://zibann.kr:10044'

class Order extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind()
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        주문
      </button>
    )
  }

  handleClick() {
    console.log('order')

    let url = '/mpemail/rest_api/email/order'
    let baseURL = DJANGO_URL
    let config = {
      url,
      baseURL,
      method: 'POST',
      mode: 'no-cors',
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      // },
      // withCredentials: true,
      credentials: 'same-origin',
    }
    
    axios(config).then(
    response => {
      return response
    })
  }
}


class OrderComplete extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind()
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        주문완료
      </button>
    )
  }

  handleClick() {
    console.log('order complete')
  }
  
}


$(document).ready(function() {

  const domContainer = document.querySelector('#ann-order');
  ReactDOM.render(<Order/>, domContainer);
  
  const domContainer2 = document.querySelector('#ann-order-complete');
  ReactDOM.render(<OrderComplete/>, domContainer2);
  
})