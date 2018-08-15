'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Order = function (_React$Component) {
  _inherits(Order, _React$Component);

  function Order(props) {
    _classCallCheck(this, Order);

    var _this = _possibleConstructorReturn(this, (Order.__proto__ || Object.getPrototypeOf(Order)).call(this, props));

    _this.state = {
      modalIsOpen: false,
      resultModalIsOpen: false
    };

    _this.openModal = _this.openModal.bind(_this);
    _this.afterOpenModal = _this.afterOpenModal.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    _this.clickComplete = _this.clickComplete.bind(_this);
    _this.dummy = _this.dummy.bind(_this);

    return _this;
  }

  _createClass(Order, [{
    key: 'openModal',
    value: function openModal() {
      this.setState({ modalIsOpen: true });
    }
  }, {
    key: 'dummy',
    value: function dummy() {}
  }, {
    key: 'afterOpenModal',
    value: function afterOpenModal() {
      // references are now sync'd and can be accessed.
      // this.subtitle.style.color = '#f00';

    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      this.setState({
        modalIsOpen: false,
        resultModalIsOpen: false,
        result_msg: ''
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var checkedMids = this.props.checkedMids;
      var status = this.props.status;


      var success_count = 0;
      for (var mid in status) {
        if ((status[mid].auto_order_status == 'process_fail' || status[mid].auto_order_status == 'initial') && _.includes(checkedMids, mid)) {

          success_count += 1;
        }
      }

      var clickHandler = this.dummy;
      if (success_count > 0) {
        backgroundColor = 'blue';
        clickHandler = this.openModal;
      }

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          {
            onClick: clickHandler,
            style: { padding: 5, margin: 0, backgroundColor: 'red', color: 'white' } },
          '\uC8FC\uBB38'
        ),
        React.createElement(
          ReactModal,
          {
            isOpen: this.state.modalIsOpen,
            onAfterOpen: this.afterOpenModal,
            onRequestClose: this.closeModal,
            style: customStyles,
            ariaHideApp: false
          },
          React.createElement(
            'h2',
            null,
            success_count,
            ' \uAC1C\uB97C \uC8FC\uBB38 \uCC98\uB9AC\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?'
          ),
          React.createElement(
            'button',
            { onClick: this.closeModal },
            '\uCDE8\uC18C'
          ),
          React.createElement(
            'button',
            { onClick: this.clickComplete },
            '\uD655\uC778'
          )
        ),
        React.createElement(
          ReactModal,
          {
            isOpen: this.state.resultModalIsOpen,
            onRequestClose: this.closeModal,
            style: customStyles,
            ariaHideApp: false
          },
          React.createElement(
            'div',
            null,
            this.state.result_msg
          ),
          React.createElement(
            'button',
            { onClick: this.closeModal },
            '\uD655\uC778'
          )
        )
      );
    }
  }, {
    key: 'clickComplete',
    value: function clickComplete() {
      var _this2 = this;

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

      this.closeModal();

      axios(config).then(function (response) {
        var data = response.data;

        dispatch({
          type: 'UPDATE_STATUS',
          status: data
        });

        var success = _.filter(data, function (s) {
          return s.auto_order_status == 'process_success';
        });
        var fail = _.filter(data, function (s) {
          return s.auto_order_status == 'process_fail';
        });

        var result_msg = success.length + '개 성공 ' + fail.length + '개 실패 하였습니다';
        _this2.setState({
          result_msg: result_msg,
          resultModalIsOpen: true
        });
      }).catch(function (error) {
        var result_msg = error.response;
        _this2.setState({
          result_msg: result_msg,
          resultModalIsOpen: true
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