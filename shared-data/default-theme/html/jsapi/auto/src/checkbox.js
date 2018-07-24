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

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    }
  }

  render() {
    console.log(this.state)
    return (
      <div 
        onClick={() => this.setState({ checked: !this.state.checked, })}
        style={styles.outer}>
        <div style={styles.inner(this.state.checked)} />
      </div>
    )
  }
}


$(document).ready(function() {

  document.querySelectorAll('.ann-checkbox')
  .forEach(domContainer => {
    // Read the comment ID from a data-* attribute.
    const mid = parseInt(domContainer.dataset.mid, 10);
    ReactDOM.render(
      <Checkbox
        mid
        />,
      domContainer
    );
  })
})

