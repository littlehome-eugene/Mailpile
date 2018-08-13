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

var allMids = [];

var CheckboxInternal = function (_React$Component) {
  _inherits(CheckboxInternal, _React$Component);

  function CheckboxInternal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CheckboxInternal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CheckboxInternal.__proto__ || Object.getPrototypeOf(CheckboxInternal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isChecked: false
    }, _this.toggleCheckboxChange = function () {
      var _this$props = _this.props,
          handleCheckboxChange = _this$props.handleCheckboxChange,
          label = _this$props.label;
      var isChecked = _this.state.isChecked;

      _this.setState({
        isChecked: !isChecked
      });
      // this.setState(({ isChecked }) => (
      //   {
      //     isChecked: !isChecked,
      //   }
      // ));

      handleCheckboxChange(!isChecked);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CheckboxInternal, [{
    key: 'render',
    value: function render() {
      var label = this.props.label;
      var isChecked = this.state.isChecked;
      var mid = this.props.mid;


      return React.createElement(
        'div',
        { className: 'checkbox' },
        React.createElement(
          'label',
          null,
          React.createElement('input', {
            type: 'checkbox',
            name: 'mid',
            value: mid,
            checked: isChecked,
            onChange: this.toggleCheckboxChange
          }),
          label
        )
      );
    }
  }]);

  return CheckboxInternal;
}(React.Component);

var Checkbox = function (_React$Component2) {
  _inherits(Checkbox, _React$Component2);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    var _this2 = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props));

    var mid = props.mid;

    _this2.mid = mid;
    _this2.state = {
      checked: false
    };
    _this2.handleClick = _this2.handleClick.bind(_this2);
    _this2.handleChange = _this2.handleChange.bind(_this2);
    _this2.dummy = _this2.dummy.bind(_this2);
    var dispatch = _this2.props.dispatch;


    var self = _this2;

    //     $(document).on("change", `input[name=mid][value=${mid}]`, function() {
    //     // $(`input[name=mid][value=${mid}]`).change(function(){
    //     if($(this).is(':checked')) {
    //       // Checkbox is checked..
    //       console.log('checked')
    //       dispatch({
    //         type: 'CHECK_MID',
    //         mid: self.mid
    //       })
    //       self.setState({ checked: true })    

    //     } else {
    //       console.log('unchecked')
    //       // Checkbox is not checked..
    //             dispatch({
    //         type: 'UNCHECK_MID',
    //         mid: self.mid
    //       })
    //       self.setState({ checked: false })    

    //     }
    // })

    _this2.timeoutHandle = setTimeout(function () {
      _this2.dummy();
    }, 100);
    return _this2;
  }

  _createClass(Checkbox, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      allMids = _.union(allMids, [this.mid]);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
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
          checked: this.state.checked,
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
    status: state.status
  };
};

Checkbox = ReactRedux.connect(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(Checkbox);