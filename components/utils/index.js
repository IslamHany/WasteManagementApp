import axios from 'axios';

const url = "https://beta.masterofthings.com";
export const getConsolId = async (floor) => {
  const body = {
    AppId: 31,
    ConditionList: [{
      Reading: "Floor",
      Condition: "e",
      Value: floor
    }],
    Auth: {
      Key: "QC3Xh34JCn5yT4LP1623668412098waste_devices_form"
    }
  };

  try{
    const res = await axios.post(`${url}/GetAppReadingValueList`, body);
    return {res: res.data.Result[0].SensorIdConsole, err: null};
  }catch(e){
    return {res: null, err: "something went worng"};
  }
};

export const getMaxIds = async (sensorNumber) => {
  const body = {
    SensorId: sensorNumber,
    Aggregate: [
        {
            "function": "max",
            "reading": "id"
        }
    ],
    GroupBy: ["SensorId"],
    Auth: {
        DriverManagerId: "1",
        DriverManagerPassword: "123"
    }
  };

  const res = await axios.post(`${url}/GetSensorReadingValueList`, body);
  const sensors = res.data.Result.map(reading => reading['max(id)']);
  return sensors;
};

export const getSensorsInfo = async (idsArr, sensorId) => {
  //alert(sensorId);
  const dataPromises = await idsArr.map(async (id) => {
    const body = {
            SensorId: sensorId,
            ConditionList: [{
              reading: "id",
              condition: "e",
              value: id
            }],
            Auth: {
              DriverManagerId: "1",
              DriverManagerPassword: "123"
            }
    };

    return await axios.post(`${url}/GetSensorReadingValueList`, body);
  });

  const data = await Promise.all(dataPromises);
  const readableData = data.map(el => {
    return el.data.Result[0];
  });
  return readableData;

};