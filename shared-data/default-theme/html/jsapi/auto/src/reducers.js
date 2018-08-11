
const initialState = {
  status: {},
  mids: [],
}

const reducers = (state=initialState, action) => {
  switch(action.type) {
  case 'UPDATE_STATUS': 
    return _.merge({}, state, {
      status: action.status
    })

  default:
    return state
  }
}

