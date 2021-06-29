import * as actionTypes from './actionTypes';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

export const tryAuth = () => {
  return async dispatch => {
    const user = await AsyncStorage.getItem("user");
    if(user){
      dispatch({
        type: actionTypes.SET_USER,
        user: JSON.parse(user),
        isLoggedIn: true
      });
    }
  };
};

export const getUserInfo = (name, password) => {
  return dispatch => {
    dispatch(setLoading(true));
    const url = "https://beta.masterofthings.com/GetAppReadingValueList";
    const body = {
      AppId: 30,
      Auth: {
        Key: "CCY5Xbab7jU3FMJe1623667639892waste_users_form"
      },
      ConditionList: [
        {
          Reading: "Name",
          Condition: "e",
          Value: name
        }
      ]
    };

    axios.post(url, body)
      .then(async (res) => {
        const data = res.data.Result[0];
        //alert(JSON.stringify(res.data.Result[0]));
        if(data?.Password == password && data?.Name == name){
          try{await AsyncStorage.setItem("user", JSON.stringify(data));}catch(e){alert(JSON.stringify(e))}
          return dispatch({
            type: actionTypes.SET_USER,
            user: res.data.Result[0],
            isLoggedIn: true
          });
        }

        dispatch({
          type: actionTypes.SET_ERROR,
          msg: "Invalid Credentials"
        })

      })
      .catch(err => {
        dispatch({
          type: actionTypes.SET_ERROR,
          msg: "something went wrong"
        })
      })
      .finally(() => dispatch(setLoading(false)));

  };
};

export const setLoading = (isLoading) => {
  return {
    type: actionTypes.SET_LOADING,
    isLoading
  }
};

export const logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: actionTypes.SET_LOGOUT
    });
  };
};