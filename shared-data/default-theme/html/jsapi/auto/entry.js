var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DJANGO_URL = 'http://localhost:10044';

var Entry = function (_React$Component) {
  _inherits(Entry, _React$Component);

  function Entry(props) {
    _classCallCheck(this, Entry);

    var _this = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, props));

    _this.fetchStatus = _this.fetchStatus.bind(_this);
    _this.isFetching = false;
    return _this;
  }

  _createClass(Entry, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this.interval = setInterval(this.fetchStatus, 1500);
      // console.log('setInterval')
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // clearInterval(this.interval);
      // console.log('clearInterval')
    }
  }, {
    key: 'fetchStatus',
    value: function fetchStatus() {
      var url = '/mpemail/rest_api/email/status';
      var baseURL = DJANGO_URL;
      var dispatch = this.props.dispatch;

      console.log('fetching');

      var config = {
        url: url,
        baseURL: baseURL,
        method: 'POST',
        mode: 'no-cors',
        data: {
          mids: allMids
        },
        credentials: 'same-origin',
        crossDomain: true
      };

      var self = this;
      axios(config).then(function (response) {
        var data = response.data;

        dispatch({
          type: 'UPDATE_STATUS',
          status: data
        });
        self.isFetching = false;
      }).catch(function (error) {
        console.log(error.response);
        self.isFetching = false;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      // if (!this.isFetching) {
      //   this.isFetching = true

      //   this.fetchStatus()
      // }
      return React.createElement('div', null);
    }
  }]);

  return Entry;
}(React.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {

  return {
    status: state.status
  };
};

Entry = ReactRedux.connect(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(Entry);

// $.propHooks.checked = {
//     set: function (el, value) {
//         if (el.checked !== value) {
//             trigger = true;
//         } else {
//             trigger = false;
//         }
//         el.checked = value;
//         if (trigger) {
//             $(el).trigger('change');
//         }
//     }
// };