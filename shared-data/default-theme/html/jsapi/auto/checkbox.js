'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  outer: {
    borderRadius: 5,
    border: '2px solid gray',
    width: 30,
    height: 30,
    cursor: 'pointer',
    display: 'inline-block'
  },
  inner: function inner(checked) {
    return {
      borderRadius: '50%',
      height: 28,
      width: 28,
      backgroundColor: checked ? 'red' : 'transparent',
      margin: 1,
      transition: 'background-color 0.2s ease'
    };
  }
};

var Checkbox = function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props));

    var mid = props.mid;

    _this.mid = mid;
    _this.state = {
      checked: false
    };
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.dummy = _this.dummy.bind(_this);
    var dispatch = _this.props.dispatch;


    _this.componentCleanup = _this.componentCleanup.bind(_this);
    return _this;
  }

  _createClass(Checkbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('beforeunload', this.componentCleanup);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      allMids = _.union(allMids, [this.mid]);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.componentCleanup();
      window.removeEventListener('beforeunload', this.componentCleanup);
    }
  }, {
    key: 'componentCleanup',
    value: function componentCleanup() {
      allMids = _.pull(allMids, this.mid);
    }
  }, {
    key: 'dummy',
    value: function dummy() {

      var el = ReactDOM.findDOMNode(this.refs.checkbox);
      var dispatch = this.props.dispatch;

      var self = this;

      $(el).change(function () {
        if ($(this).is(':checked')) {
          // Checkbox is checked..
          console.log('checked');
          dispatch({
            type: 'CHECK_MID',
            mid: self.mid
          });
          self.setState({ checked: true });
        } else {
          console.log('unchecked');
          // Checkbox is not checked..
          dispatch({
            type: 'UNCHECK_MID',
            mid: self.mid
          });
          self.setState({ checked: false });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var checkedMids = this.props.checkedMids;

      var isChecked = false;

      if (_.includes(checkedMids, this.mid)) {
        isChecked = true;
      }

      return React.createElement(
        'div',
        {
          className: 'checkbox',
          onClick: this.handleClick
        },
        React.createElement('input', {
          type: 'checkbox',
          name: 'mid',
          value: this.mid,
          checked: isChecked,
          ref: 'checkbox'
        })
      );
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      console.log(event.target.checked);
    }
  }, {
    key: 'render_',
    value: function render_() {
      return React.createElement(
        'div',
        {
          style: styles.outer },
        React.createElement('div', { style: styles.inner(this.state.checked) })
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var checked = this.state.checked;
      var dispatch = this.props.dispatch;


      if (checked) {
        dispatch({
          type: 'UNCHECK_MID',
          mid: this.mid
        });
      } else {
        dispatch({
          type: 'CHECK_MID',
          mid: this.mid
        });
      }
      this.setState({ checked: !checked });
    }
  }]);

  return Checkbox;
}(React.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {

  return {
    checkedMids: state.checkedMids,
    status: state.status
  };
};

Checkbox = ReactRedux.connect(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(Checkbox);