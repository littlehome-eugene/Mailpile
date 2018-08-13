
const initialState = {
  status: {},
  mids: [],
  checkedMids: [],
}

const reducers = (state=initialState, action) => {
  switch(action.type) {
  case 'UPDATE_STATUS': 
    return _.merge({}, state, {
      status: action.status
    })

  case 'CHECK_MID':

    checkedMids = _.union(state.checkedMids, [action.mid])
    return _.merge({}, state, {
      checkedMids
    })
  case 'UNCHECK_MID':
    checkedMids = _.pull(state.checkedMids, action.mid)
    return _.merge({}, state, {
      checkedMids
    })

  default:
    return state
  }
}

