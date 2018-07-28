'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DJANGO_URL = 'http://zibann.kr:10044';

var Order = function (_React$Component) {
  _inherits(Order, _React$Component);

  function Order(props) {
    _classCallCheck(this, Order);

    var _this = _possibleConstructorReturn(this, (Order.__proto__ || Object.getPrototypeOf(Order)).call(this, props));

    _this.handleClick = _this.handleClick.bind();
    return _this;
  }

  _createClass(Order, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'button',
        { onClick: this.handleClick },
        '\uC8FC\uBB38'
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      console.log('order');

      var url = '/mpemail/rest_api/email/order';
      var baseURL = DJANGO_URL;
      var config = {
        url: url,
        baseURL: baseURL,
        method: 'POST',
        mode: 'no-cors',
        // headers: {
        //   'Access-Control-Allow-Origin': '*',
        // },
        // withCredentials: true,
        credentials: 'same-origin'
      };

      axios(config).then(function (response) {
        return response;
      });
    }
  }]);

  return Order;
}(React.Component);

var OrderComplete = function (_React$Component2) {
  _inherits(OrderComplete, _React$Component2);

  function OrderComplete(props) {
    _classCallCheck(this, OrderComplete);

    var _this2 = _possibleConstructorReturn(this, (OrderComplete.__proto__ || Object.getPrototypeOf(OrderComplete)).call(this, props));

    _this2.handleClick = _this2.handleClick.bind();
    return _this2;
  }

  _createClass(OrderComplete, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'button',
        { onClick: this.handleClick },
        '\uC8FC\uBB38\uC644\uB8CC'
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      console.log('order complete');
    }
  }]);

  return OrderComplete;
}(React.Component);

$(document).ready(function () {

  var domContainer = document.querySelector('#ann-order');
  ReactDOM.render(React.createElement(Order, null), domContainer);

  var domContainer2 = document.querySelector('#ann-order-complete');
  ReactDOM.render(React.createElement(OrderComplete, null), domContainer2);
});