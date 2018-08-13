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

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Order, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { onClick: this.handleClick, style: { padding: 5, margin: 0, backgroundColor: 'red', color: 'white' } },
        '\uC8FC\uBB38'
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      console.log('order');

      var url = '/mpemail/rest_api/email/order';
      var baseURL = DJANGO_URL;
      var dispatch = this.props.dispatch;
      var checkedMids = this.props.checkedMids;


      var config = {
        url: url,
        baseURL: baseURL,
        method: 'POST',
        mode: 'no-cors',
        data: {
          mids: checkedMids
        },
        // headers: {
        //   'Access-Control-Allow-Origin': '*',
        // },
        // withCredentials: true,
        credentials: 'same-origin'
      };

      axios(config).then(function (response) {
        var data = response.data;

        dispatch({
          type: 'UPDATE_STATUS',
          status: data
        });
      });
    }
  }]);

  return Order;
}(React.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {

  return {
    checkedMids: state.checkedMids,
    status: state.status
  };
};

Order = ReactRedux.connect(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(Order);