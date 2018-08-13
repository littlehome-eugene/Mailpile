
var initialState = {
  status: {},
  mids: [],
  checkedMids: []
};

var reducers = function reducers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'UPDATE_STATUS':
      return _.merge({}, state, {
        status: action.status
      });

    case 'CHECK_MID':

      checkedMids = _.union(state.checkedMids, [action.mid]);
      return _.merge({}, state, {
        checkedMids: checkedMids
      });
    case 'UNCHECK_MID':
      checkedMids = _.pull(state.checkedMids, action.mid);
      return _.merge({}, state, {
        checkedMids: checkedMids
      });

    default:
      return state;
  }
};