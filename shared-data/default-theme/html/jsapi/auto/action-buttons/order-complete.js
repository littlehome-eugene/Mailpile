var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

var OrderComplete = function (_React$Component) {
  _inherits(OrderComplete, _React$Component);

  function OrderComplete(props) {
    _classCallCheck(this, OrderComplete);

    var _this = _possibleConstructorReturn(this, (OrderComplete.__proto__ || Object.getPrototypeOf(OrderComplete)).call(this, props));

    _this.state = {
      modalIsOpen: false
    };

    _this.openModal = _this.openModal.bind(_this);
    _this.afterOpenModal = _this.afterOpenModal.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    _this.clickComplete = _this.clickComplete.bind(_this);
    _this.dummy = _this.dummy.bind(_this);
    return _this;
  }

  _createClass(OrderComplete, [{
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
      this.setState({ modalIsOpen: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var status = this.props.status;


      var success_count = 0;
      for (var mid in status) {
        if (status[mid].auto_order_status == 'process_success') {
          success_count += 1;
        }
      }

      var backgroundColor = 'grey';
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
            style: {
              backgroundColor: backgroundColor
            }
          },
          '\uC8FC\uBB38 \uC644\uB8CC'
        ),
        React.createElement(
          ReactModal,
          {
            isOpen: this.state.modalIsOpen,
            onAfterOpen: this.afterOpenModal,
            onRequestClose: this.closeModal,
            style: customStyles
          },
          React.createElement(
            'h2',
            null,
            success_count,
            ' \uAC1C\uB97C \uC8FC\uBB38 \uC644\uB8CC\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?'
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
        )
      );
    }
  }, {
    key: 'clickComplete',
    value: function clickComplete() {
      var url = '/mpemail/rest_api/email/order_complete';
      var baseURL = DJANGO_URL;
      var dispatch = this.props.dispatch;


      var config = {
        url: url,
        baseURL: baseURL,
        method: 'POST',
        mode: 'no-cors',
        data: {
          mids: checkedMids
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

      this.closeModal();
    }
  }]);

  return OrderComplete;
}(React.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {

  return {
    status: state.status
  };
};

OrderComplete = ReactRedux.connect(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(OrderComplete);