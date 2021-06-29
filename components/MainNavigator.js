import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {AsyncStorage} from 'react-native';
import {tryAuth} from './store/actions';
import {connect} from 'react-redux';
import Login from './Login';
import Floor from './Floor';

const Stack = createStackNavigator();

const MainNavigator = (props) => {

  useEffect(() => {
    props.tryAuth();
  }, []);

  return (
    <Stack.Navigator>
          {
            (
              props.auth.isLoggedIn ? <Stack.Screen name="Floor" component={Floor} />
            :
               <Stack.Screen name="Login" component={Login} />
            )
          }
    </Stack.Navigator>
  );
}; 

const mapStateToProps = state => {
  return {
    auth: state
  }
};

export default connect(mapStateToProps, {tryAuth})(MainNavigator);