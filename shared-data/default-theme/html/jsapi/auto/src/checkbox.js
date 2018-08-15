'use strict';


const styles = {
  outer: {
    borderRadius: 5,
    border: '2px solid gray',
    width: 30,
    height: 30,
    cursor: 'pointer',
    display:'inline-block',
  },
  inner: checked => ({
    borderRadius: '50%',
    height: 28,
    width: 28,
    backgroundColor: checked ? 'red' : 'transparent',
    margin: 1,
    transition: 'background-color 0.2s ease',
  })
}





class Checkbox extends React.Component {
  constructor(props) {
    super(props)

    let { mid } = props
    this.mid = mid
    this.state = {
      checked: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.dummy = this.dummy.bind(this)
    const { dispatch } = this.props

    this.componentCleanup = this.componentCleanup.bind(this)
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
  }

  componentWillMount() {
    allMids = _.union(allMids, [this.mid])
  }

  componentWillUnmount() {
    this.componentCleanup()
    window.removeEventListener('beforeunload', this.componentCleanup); 
  }

  componentCleanup() {
    allMids = _.pull(allMids, this.mid)
  }

  dummy() {

     const el = ReactDOM.findDOMNode(this.refs.checkbox);
    const { dispatch } = this.props
    var self = this
    
    
    $(el).change(function(){
    if($(this).is(':checked')) {
      // Checkbox is checked..
      console.log('checked')
      dispatch({
        type: 'CHECK_MID',
        mid: self.mid
      })
      self.setState({ checked: true })    

    } else {
      console.log('unchecked')
      // Checkbox is not checked..
            dispatch({
        type: 'UNCHECK_MID',
        mid: self.mid
      })
      self.setState({ checked: false })    

    }
})

  }

  render() {
    let { checkedMids } = this.props
    let isChecked = false

    if (_.includes(checkedMids, this.mid)) {
      isChecked = true
    }
    
    return <div
    className='checkbox'
    onClick={this.handleClick}
      >

      <input
    type="checkbox"
    name='mid'
    value={this.mid}
    checked={isChecked}
    ref='checkbox'
      />

    </div>
  }

  handleChange(event) {
    console.log(event.target.checked)
  }

  render_() {
    return (
      <div 
        style={styles.outer}>
        <div style={styles.inner(this.state.checked)} />
      </div>
    )
  }

  handleClick() {
    let { checked } = this.state

    const { dispatch } = this.props

    if (checked) {
      dispatch({
        type: 'UNCHECK_MID',
        mid: this.mid
      })
      
    } else {
      dispatch({
        type: 'CHECK_MID',
        mid: this.mid
      })
    }
    this.setState({ checked: !checked, })    
  }
}


const mapStateToProps = (state, ownProps) => {

  return {
    checkedMids: state.checkedMids,
    status: state.status
  }
}

Checkbox = ReactRedux.connect(
  mapStateToProps,
  dispatch => {
    return { dispatch }
  }
)(Checkbox)


