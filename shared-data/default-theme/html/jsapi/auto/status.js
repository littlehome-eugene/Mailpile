var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = Redux.createStore(reducers);

// $('#pile-bottom').on('click', '', fetchStatus)
// $('#pile-previous').click(fetchStatus)
// $('#pile-next').click(fetchStatus)
// $('#pile-more').click(fetchStatus)


// jQuery(window).on('hashchange', function(){
//     var hash = window.location.hash;
//     console.log(hash);
// });

// var href = ''
// function check() {
//   if (href != window.location.href) {
//     href = window.location.href
//     fetchStatus()

//   }
// }

// console.log('setInterval')
// setInterval(check, 1500);


var statusStyles = {
  outer: {
    borderRadius: 5,
    border: '2px solid gray',
    width: 30,
    height: 30,
    cursor: 'pointer',
    display: 'inline-block'
  },
  inner: function inner(status) {
    var backgroundColor = void 0;
    if (status == 'initial') {
      backgroundColor = 'transparent';
    } else if (status == 'process_fail') {
      backgroundColor = 'grey';
    } else if (status == 'process_success') {
      backgroundColor = 'green';
    } else if (status == 'complete') {
      backgroundColor = 'blue';
    }

    return {
      borderRadius: '50%',
      height: 28,
      width: 28,
      backgroundColor: backgroundColor,
      margin: 1,
      transition: 'background-color 0.2s ease'
    };
  }
};

var status = {};

var AutoOrderStatus = function (_React$Component) {
  _inherits(AutoOrderStatus, _React$Component);

  function AutoOrderStatus(props) {
    _classCallCheck(this, AutoOrderStatus);

    var _this = _possibleConstructorReturn(this, (AutoOrderStatus.__proto__ || Object.getPrototypeOf(AutoOrderStatus)).call(this, props));

    _this.state = {
      status: 'initial'
    };
    _this.mid = props.mid;
    return _this;
  }

  _createClass(AutoOrderStatus, [{
    key: 'render',
    value: function render() {
      var status = this.props.status;


      var autoOrderStatus = 'initial';
      if (!status[this.mid]) {
        autoOrderStatus = 'initial';
      } else {
        if (status[this.mid].auto_order_status) {
          autoOrderStatus = status[this.mid].auto_order_status;
        }
      }

      var tooltipNode = null;

      var tooltipId = 'tooltip-' + this.mid;
      if (autoOrderStatus == 'process_fail') {
        tooltipNode = React.createElement(
          ReactTooltip,
          { id: tooltipId, type: 'error' },
          React.createElement(
            'span',
            null,
            status[this.mid].error
          )
        );
      }

      return React.createElement(
        'div',
        {
          style: statusStyles.outer },
        React.createElement(
          'a',
          { 'data-tip': true, 'data-for': tooltipId },
          React.createElement('div', { style: statusStyles.inner(autoOrderStatus) })
        ),
        tooltipNode
      );
    }
  }]);

  return AutoOrderStatus;
}(React.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {

  return {
    status: state.status
  };
};

var _ReactRedux = ReactRedux,
    connect = _ReactRedux.connect;


AutoOrderStatus = connect(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(AutoOrderStatus);

var AutoReplyStatus = function (_React$Component2) {
  _inherits(AutoReplyStatus, _React$Component2);

  function AutoReplyStatus(props) {
    _classCallCheck(this, AutoReplyStatus);

    var _this2 = _possibleConstructorReturn(this, (AutoReplyStatus.__proto__ || Object.getPrototypeOf(AutoReplyStatus)).call(this, props));

    _this2.mid = props.mid;
    return _this2;
  }

  _createClass(AutoReplyStatus, [{
    key: 'render',
    value: function render() {
      var status = this.props.status;


      var auto_Status = 'initial';
      if (!status[this.mid]) {
        auto_Status = 'initial';
      } else {
        if (status[this.mid].auto_reply_status) {
          auto_Status = status[this.mid].auto_reply_status;
        }
      }

      var tooltipNode = null;

      var tooltipId = 'tooltip-' + this.mid;
      if (auto_Status == 'process_fail') {
        tooltipNode = React.createElement(
          ReactTooltip,
          { id: tooltipId, type: 'error' },
          React.createElement(
            'span',
            null,
            status[this.mid].auto_reply_error
          )
        );
      }

      return React.createElement(
        'div',
        {
          style: statusStyles.outer },
        React.createElement(
          'a',
          { 'data-tip': true, 'data-for': tooltipId },
          React.createElement('div', { style: statusStyles.inner(auto_Status) })
        ),
        tooltipNode
      );
    }
  }]);

  return AutoReplyStatus;
}(React.Component);

AutoReplyStatus = connect(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(AutoReplyStatus);

var ManualOrderStatus = function (_React$Component3) {
  _inherits(ManualOrderStatus, _React$Component3);

  function ManualOrderStatus(props) {
    _classCallCheck(this, ManualOrderStatus);

    var _this3 = _possibleConstructorReturn(this, (ManualOrderStatus.__proto__ || Object.getPrototypeOf(ManualOrderStatus)).call(this, props));

    _this3.mid = props.mid;

    _this3.clickToggle = _this3.clickToggle.bind(_this3);
    return _this3;
  }

  _createClass(ManualOrderStatus, [{
    key: 'render',
    value: function render() {
      var status = this.props.status;

      if (!status[this.mid]) {
        manual_status = 'initial';
      } else {
        if (status[this.mid].manual_order_status) {
          manual_status = status[this.mid].manual_order_status;
        }
      }

      return React.createElement(
        'div',
        {
          onClick: this.clickToggle,
          style: statusStyles.outer
        },
        React.createElement('div', { style: statusStyles.inner(manual_status) })
      );
    }
  }, {
    key: 'clickToggle',
    value: function clickToggle() {
      var url = '/mpemail/rest_api/email/manual_order_toggle';
      var baseURL = DJANGO_URL;
      var dispatch = this.props.dispatch;


      var config = {
        url: url,
        baseURL: baseURL,
        method: 'POST',
        mode: 'no-cors',
        data: {
          mid: this.mid
        },
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

  return ManualOrderStatus;
}(React.Component);

ManualOrderStatus = connect(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(ManualOrderStatus);

var ManualReplyStatus = function (_React$Component4) {
  _inherits(ManualReplyStatus, _React$Component4);

  function ManualReplyStatus(props) {
    _classCallCheck(this, ManualReplyStatus);

    var _this4 = _possibleConstructorReturn(this, (ManualReplyStatus.__proto__ || Object.getPrototypeOf(ManualReplyStatus)).call(this, props));

    _this4.mid = props.mid;

    _this4.clickToggle = _this4.clickToggle.bind(_this4);
    return _this4;
  }

  _createClass(ManualReplyStatus, [{
    key: 'render',
    value: function render() {
      var status = this.props.status;


      var manual_status = 'initial';
      if (!status[this.mid]) {
        manual_status = 'initial';
      } else {
        if (status[this.mid].manual_reply_status) {
          manual_status = status[this.mid].manual_reply_status;
        }
      }

      return React.createElement(
        'div',
        {
          onClick: this.clickToggle,
          style: statusStyles.outer
        },
        React.createElement('div', { style: statusStyles.inner(manual_status) })
      );
    }
  }, {
    key: 'clickToggle',
    value: function clickToggle() {
      var url = '/mpemail/rest_api/email/manual_reply_toggle';
      var baseURL = DJANGO_URL;
      var dispatch = this.props.dispatch;


      var config = {
        url: url,
        baseURL: baseURL,
        method: 'POST',
        mode: 'no-cors',
        data: {
          mid: this.mid
        },
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

  return ManualReplyStatus;
}(React.Component);

ManualReplyStatus = connect(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(ManualReplyStatus);