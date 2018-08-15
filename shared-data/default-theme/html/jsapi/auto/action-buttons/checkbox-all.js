var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxAll = function (_React$Component) {
  _inherits(CheckboxAll, _React$Component);

  function CheckboxAll(props) {
    _classCallCheck(this, CheckboxAll);

    var _this = _possibleConstructorReturn(this, (CheckboxAll.__proto__ || Object.getPrototypeOf(CheckboxAll)).call(this, props));

    _this.state = {
      checked: false
    };
    _this.handleClick = _this.handleClick.bind(_this);

    return _this;
  }

  _createClass(CheckboxAll, [{
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
          name: 'mid-all',
          checked: this.state.checked,
          ref: 'checkbox'
        })
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var checked = this.state.checked;
      var dispatch = this.props.dispatch;


      if (checked) {
        dispatch({
          type: 'UNCHECK_ALL'
        });
      } else {
        dispatch({
          type: 'CHECK_ALL',
          mids: allMids
        });
      }
      this.setState({ checked: !checked });
    }
  }]);

  return CheckboxAll;
}(React.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {

  return {
    status: state.status
  };
};

CheckboxAll = ReactRedux.connect(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(CheckboxAll);