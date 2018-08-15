'use strict';


class Order extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      resultModalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.clickComplete = this.clickComplete.bind(this);
    this.dummy = this.dummy.bind(this)
    
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
  
  dummy() {
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
    
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      resultModalIsOpen: false,
      result_msg: '',
    });
  }
  

  render() {

    let { checkedMids } = this.props
    let { status } = this.props

    let success_count = 0
    for (var mid in status) {
      if ((status[mid].auto_order_status == 'process_fail' || status[mid].auto_order_status == 'initial') && _.includes(checkedMids, mid)) {
        
        success_count += 1
      }
    }

    
    let clickHandler = this.dummy
    if (success_count > 0) {
      backgroundColor = 'blue'
      clickHandler = this.openModal
    }

    
    return (
      <div>
        <div
          onClick={clickHandler}
          style={{padding:5,margin:0,backgroundColor:'red',color:'white'}}>
          주문
        </div>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
        >

          <h2>{success_count} 개를 주문 처리하시겠습니까?</h2>
          <button onClick={this.closeModal}>취소</button>
          <button onClick={this.clickComplete}>확인</button>
        </ReactModal>

        <ReactModal
          isOpen={this.state.resultModalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <div>{this.state.result_msg}</div>
          <button onClick={this.closeModal}>확인</button>
        </ReactModal>
        
      </div>
    )
  }

  clickComplete() {
    console.log('order')

    let url = '/mpemail/rest_api/email/order'
    let baseURL = DJANGO_URL
    let { dispatch } = this.props
      let { checkedMids } = this.props
    
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

    this.closeModal()
    
    axios(config).then(
    response => {
      let {data} = response
      dispatch({
        type: 'UPDATE_STATUS', 
        status: data
      })

      let success = _.filter(data, (s) => {
        return s.auto_order_status == 'process_success'
      })
      let fail = _.filter(data, (s) => {
        return s.auto_order_status == 'process_fail'
      })

      let result_msg = success.length + '개 성공 ' + fail.length + '개 실패 하였습니다'
      this.setState({
        result_msg,
        resultModalIsOpen: true,
      })
      
    }).catch(error => {
      let result_msg = error.response
      this.setState({
        result_msg,
        resultModalIsOpen: true,
      })

    })
  }
  
}

const mapStateToProps = (state, ownProps) => {

  return {
    checkedMids: state.checkedMids,
    status: state.status
  }
}

Order = ReactRedux.connect(
  mapStateToProps,
  dispatch => {
    return { dispatch }
  }
)(Order)
