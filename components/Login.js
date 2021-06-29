import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as actions from './store/actions';

const Login = (props) => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onPress = async () => {
    await props.getUserInfo(name.trim(), password.trim());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Waste Managment</Text>

      <View>
        <TextInput style={styles.input} placeholder="User Name" value={name} onChangeText={setName}/>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword}
        />
        {(props.auth.isLoading ? <Text style={styles.paragraph}>Loading....</Text> : 
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={styles.white}>Login</Text>
        </TouchableOpacity>)}
      </View>

      {props.auth.error ? <Text style={styles.paragraph}>{props.auth.error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#0b0121',
    padding: 8,
  },
  btn: {
    border: 1,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#f46242",
    padding: 7,
    borderRadius: 10
  },
  white: {
    color: "white",
    textAlign: 'center'
  },
  input:{
    backgroundColor: "white",
    padding: 5,
    margin: 5,
    borderRadius: 15
  },
  paragraph: {
    margin: 15,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: "#f46242",
    padding: 5,
    color: "#FFF",
    borderRadius: 10
  },
});

const mapStateToProps = state => {
  return {
    auth: state
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: (name, password) => dispatch(actions.getUserInfo(name, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);