import * as actionTypes from './actionTypes';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  user: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SET_LOADING:
      return {...state, isLoading: action.isLoading};
    case actionTypes.SET_USER:
      return {...state, user: action.user, error: null, isLoggedIn: true};
    case actionTypes.SET_ERROR:
      return {...state, error: action.msg};
    case actionTypes.SET_LOGOUT:
      return {...state, user: null, error: null, isLoggedIn: false}    
    default:
      return state;
  }
};

export default reducer;