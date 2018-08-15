class CheckboxAll extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: false,
    }
    this.handleClick = this.handleClick.bind(this)

  }


  render() {
    return <div
    className='checkbox'
    onClick={this.handleClick}
      >

      <input
    type="checkbox"
    name='mid-all'
    checked={this.state.checked}
    ref='checkbox'
      />

    </div>
  }


  handleClick() {
    let { checked } = this.state

    const { dispatch } = this.props

    if (checked) {
      dispatch({
        type: 'UNCHECK_ALL',
      })
      
    } else {
      dispatch({
        type: 'CHECK_ALL',
        mids: allMids,
      })
    }
    this.setState({ checked: !checked, })    
  }
}


const mapStateToProps = (state, ownProps) => {

  return {
    status: state.status
  }
}

CheckboxAll = ReactRedux.connect(
  mapStateToProps,
  dispatch => {
    return { dispatch }
  }
)(CheckboxAll)


