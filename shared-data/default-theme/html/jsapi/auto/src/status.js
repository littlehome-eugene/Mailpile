
const statusStyles = {
  outer: {
    borderRadius: 5,
    border: '2px solid gray',
    width: 30,
    height: 30,
    cursor: 'pointer',
    display:'inline-block',
  },
  inner: status => {
    let backgroundColor
    if (status == 'initial') {
      backgroundColor = 'transparent'
    } else if (status == 'process_fail') {
      backgroundColor = 'grey'
    } else if (status == 'process_success') {
      backgroundColor = 'green'
    } else if (status == 'complete') {
      backgroundColor = 'blue'
    }
    
    return {
      borderRadius: '50%',
      height: 28,
      width: 28,
      backgroundColor: backgroundColor,
      margin: 1,
      transition: 'background-color 0.2s ease',
    }
  }
}


let status = {
}


class AutoOrderStatus extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      status: 'initial'
    }
    this.mid = props.mid
  }

  render() {

    let { status } = this.props

    let autoOrderStatus = 'initial'
    if (!status[this.mid]) {
      autoOrderStatus = 'initial'
    } else {
      if (status[this.mid].auto_order_status) {
        autoOrderStatus = status[this.mid].auto_order_status
      }
    }

    let tooltipNode = null

    let tooltipId = `tooltip-${this.mid}`
    if (autoOrderStatus == 'process_fail') {
      tooltipNode = (
        <ReactTooltip id={tooltipId} type='error'>
          <span>{status[this.mid].error}</span>
        </ReactTooltip>
      )
    }

  
    return (
      <div 
        style={statusStyles.outer}>
        <a data-tip data-for={tooltipId}>  
          <div style={statusStyles.inner(autoOrderStatus)} />
        </a>
        {tooltipNode}
        
      </div>
    )
  }


  
}


const mapStateToProps = (state, ownProps) => {

  return {
    status: state.status
  }
}

const { connect } = ReactRedux;

AutoOrderStatus = connect(
  mapStateToProps,
  dispatch => {
    return { dispatch }
  }
)(AutoOrderStatus)


class AutoReplyStatus extends React.Component {
  constructor(props) {
    super(props)
    this.mid = props.mid
  }

  render() {

    let { status } = this.props

    let auto_Status = 'initial'
    if (!status[this.mid]) {
      auto_Status = 'initial'
    } else {
      if (status[this.mid].auto_reply_status) {
        auto_Status = status[this.mid].auto_reply_status
      }
    }
    
    return (
      <div 
        style={statusStyles.outer}>
        <div style={statusStyles.inner(auto_Status)} />
      </div>
    )
  }


}


AutoReplyStatus = connect(
  mapStateToProps,
  dispatch => {
    return { dispatch }
  }
)(AutoReplyStatus)


class ManualOrderStatus extends React.Component {
  constructor(props) {
    super(props)
    this.mid = props.mid

    this.clickToggle = this.clickToggle.bind(this)
  }

  render() {

    let { status } = this.props
    if (!status[this.mid]) {
      manual_status = 'initial'
    } else {
      if (status[this.mid].manual_order_status) {
        manual_status = status[this.mid].manual_order_status
      }
    }
    
    return (
      <div
        onClick={this.clickToggle}
        style={statusStyles.outer}
        >
        <div style={statusStyles.inner(manual_status)} />
      </div>
    )
  }

  clickToggle() {
    let url = `/mpemail/rest_api/email/manual_order_toggle`
    let baseURL = DJANGO_URL
    let { dispatch } = this.props
    
    let config = {
      url,
      baseURL,
      method: 'POST',
      mode: 'no-cors',
      data: {
        mid: this.mid
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

  }

}


ManualOrderStatus = connect(
  mapStateToProps,
  dispatch => {
    return { dispatch }
  }
)(ManualOrderStatus)



class ManualReplyStatus extends React.Component {
  constructor(props) {
    super(props)
    this.mid = props.mid

    this.clickToggle = this.clickToggle.bind(this)
  }

  render() {

    let { status } = this.props

    let manual_status = 'initial'
    if (!status[this.mid]) {
      manual_status = 'initial'
    } else {
      if (status[this.mid].manual_reply_status) {
        manual_status = status[this.mid].manual_reply_status
      }
    }
    
    return (
      <div
        onClick={this.clickToggle}
        style={statusStyles.outer}
        >
        <div style={statusStyles.inner(manual_status)} />
      </div>
    )
  }

  clickToggle() {
    let url = `/mpemail/rest_api/email/manual_reply_toggle`
    let baseURL = DJANGO_URL
    let { dispatch } = this.props
    
    let config = {
      url,
      baseURL,
      method: 'POST',
      mode: 'no-cors',
      data: {
        mid: this.mid
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

  }

}


ManualReplyStatus = connect(
  mapStateToProps,
  dispatch => {
    return { dispatch }
  }
)(ManualReplyStatus)



