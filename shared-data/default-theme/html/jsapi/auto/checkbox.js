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
    cursor: 'pointer'
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

var checkedMids = [];
var allMids = [];

var check = function check(mid) {
  checkedMids = _.union(checkedMids, [mid]);
};

var uncheck = function uncheck(mid) {
  checkedMids = _.pull(checkedMids, mid);
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
    return _this;
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
    key: 'render',
    value: function render() {
      console.log(this.state);
      return React.createElement(
        'div',
        {
          onClick: this.handleClick,
          style: styles.outer },
        React.createElement('div', { style: styles.inner(this.state.checked) })
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var checked = this.state.checked;


      if (checked) {
        uncheck(this.mid);
      } else {
        check(this.mid);
      }
      this.setState({ checked: !checked });
    }
  }]);

  return Checkbox;
}(React.Component);