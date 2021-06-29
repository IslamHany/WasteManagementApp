import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet, FlatList, AsyncStorage} from 'react-native';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {
  getConsolId,
  getMaxIds,
  getSensorsInfo
} from './utils';
import * as actions from './store/actions';
import Basket from './Basket';

const url = "https://waste-mgmt-gp.herokuapp.com/";
const socket = io(url);

const Floor = (props) => {

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {

    socket.on(`iTi/2021/Waste/Floor${props.auth.user?.Floor}`, msg => {
      //alert(JSON.stringify(msg));
      setData(prevState => {
        let newState = [...prevState];
        newState = newState.map(el => {
          if(el.name == msg.bName){
            el.battery = msg.battery.slice(0, -1);
            el['fillLevel'] = msg.fillLevel;
          }
          return el;
        });
        return newState;
      });
    });

    (async () => {
      setIsLoading(true);
      try{
        const {res: sensorNumber, err} = await getConsolId(props.auth.user?.Floor);
        if(err)
          throw new Error(err);

        const ids = await getMaxIds(sensorNumber);  
        const data = await getSensorsInfo(ids, sensorNumber);
        //alert(JSON.stringify(data))
        setData(data);
      }catch(e){
        setError("Error grabing sensors data");
      }finally{
        setIsLoading(false);
      }

    })();

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  const onPress = () => {
    props.logoutUser();
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.white}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>Floor{props.auth.user?.Floor} Page</Text>
      <Text style={styles.paragraph}>Welcome {props.auth.user?.Name}</Text>
      {isLoading && <Text style={styles.paragraph}>Loading...</Text>}
      {error ? <Text style={styles.paragraph}>{error}</Text> : null}
      {data ? <FlatList 
        style={styles.list}
        data={data}
        renderItem={({item}) => (
          <Basket data={item} />
        )}/> : 
      null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#0b0121',
    padding: 8
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
  list: {
    marginBottom: 50
  },
  white:{
    color: "#fff",
    textAlign: "center"
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
    logoutUser: () => dispatch(actions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Floor);