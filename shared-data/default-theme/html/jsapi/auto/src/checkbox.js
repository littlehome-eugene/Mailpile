'use strict';


const styles = {
  outer: {
    borderRadius: 5,
    border: '2px solid gray',
    width: 30,
    height: 30,
    cursor: 'pointer',
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


let checkedMids = []
let allMids = []

const check = (mid) => {
  checkedMids = _.union(checkedMids, [mid])
}

const uncheck = (mid) => {
  checkedMids = _.pull(checkedMids, mid)
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
  }

  componentWillMount() {
    allMids = _.union(allMids, [this.mid])
  }

  componentWillUnmount() {
    allMids = _.pull(allMids, this.mid)
  }

  render() {
    console.log(this.state)
    return (
      <div 
        onClick={this.handleClick}
        style={styles.outer}>
        <div style={styles.inner(this.state.checked)} />
      </div>
    )
  }

  handleClick() {
    let { checked } = this.state

    if (checked) {
      uncheck(this.mid)
    } else {
      check(this.mid)
    }
    this.setState({ checked: !checked, })    
  }
}


