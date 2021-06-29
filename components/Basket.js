import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import axios from 'axios';

const Basket = (props) => {
  const [size, setSize] = useState(null);

  useEffect(() => {
    const url = "https://beta.masterofthings.com/GetAppReadingValueList";
    const body = {
      AppId: 31,
      ConditionList: [{
        Reading: "BasketName",
        Condition: "e",
        Value: props.data.name
      }],
      Auth: {
        Key: "QC3Xh34JCn5yT4LP1623668412098waste_devices_form"
      }
    };

    axios.post(url, body)
      .then(res => {
        setSize(res.data.Result[0].Size);
      });

  }, []);
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../assets/wasteBasket.png')}/>
        {props.data.fillLevel ? <Text>Fill Level: {props.data.fillLevel}</Text> : <Text>Fill Level: {size ? (Math.floor(props.data.depth*100/size)): "Loading..."}%</Text>}
        <Text>Battery: {props.data.battery}%</Text>
        <Text>Name: {props.data.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 45
  },
  container: {
    width: "80%",
    borderRadius: 12,
    padding: 8,
    backgroundColor: "#fff",
    marginTop: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: 128,
    height: 128,
    marginBottom: 8
  }
});

export default Basket;