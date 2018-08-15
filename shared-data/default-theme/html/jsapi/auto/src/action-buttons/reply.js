
class Reply extends React.Component {
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

    let { status } = this.props
    var checkedMids = this.props.checkedMids;

    let success_count = 0
    for (var mid in status) {
      if (status[mid].auto_order_status == 'complete' &&
          _.includes(checkedMids, mid) &&          
          (status[mid].auto_reply_status == 'initial' ||
           status[mid].auto_reply_status == 'process_fail')
         ) {
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
          >송장 발송</div>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
        >

          <h2>{success_count}개 거래처에 송장번호를 메일로 보내겠습니까?</h2>
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
    let url = '/mpemail/rest_api/email/reply'
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

      let success = _.filter(Object.values(data), (s) => {
        return s.auto_reply_status == 'complete'
      })
      let fail = _.filter(Object.values(data), (s) => {
        return s.auto_reply_status == 'process_fail'
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

Reply = ReactRedux.connect(
  mapStateToProps,
  dispatch => {
    return { dispatch }
  }
)(Reply)


