
var initialState = {
  status: {},
  mids: []
};

var reducers = function reducers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'UPDATE_STATUS':
      return _.merge({}, state, {
        status: action.status
      });

    default:
      return state;
  }
};