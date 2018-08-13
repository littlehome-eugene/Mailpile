const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class OrderComplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
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
    this.setState({modalIsOpen: false});
  }

  render() {

    let { status } = this.props
      let { checkedMids } = this.props

    let success_count = 0
    for (var mid in status) {
      if (status[mid].auto_order_status == 'process_success' && _.includes(checkedMids, mid)) {
        
        success_count += 1
      }
    }

    let backgroundColor = 'grey'
    let color = 'white'

    let clickHandler = this.dummy
    if (success_count > 0) {
      backgroundColor = 'blue'
      clickHandler = this.openModal
    }

    return (
      <div style={{margin:0}}>
        <div
          onClick={clickHandler}
          style={{
            backgroundColor,color,padding:5,margin:0
          }}
          >주문 완료</div>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
        >

          <h2>{success_count} 개를 주문 완료하시겠습니까?</h2>
          <button onClick={this.closeModal}>취소</button>
          <button onClick={this.clickComplete}>확인</button>
        </ReactModal>
      </div>
    )
  }


  clickComplete() {
    let url = '/mpemail/rest_api/email/order_complete'
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

    this.closeModal()
  }
  
}


const mapStateToProps = (state, ownProps) => {

  return {
    checkedMids: state.checkedMids,
    status: state.status
  }
}

OrderComplete = ReactRedux.connect(
  mapStateToProps,
  dispatch => {
    return { dispatch }
  }
)(OrderComplete)


