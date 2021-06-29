import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './components/store/reducer';

// You can import from local files
import MainNavigator from './components/MainNavigator';

const Stack = createStackNavigator();

let store = createStore(reducer, applyMiddleware(thunk));

const App = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state,
  };
};

export default App;
