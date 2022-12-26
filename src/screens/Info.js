import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { THEME } from '../themes';
import DeviceInfo from 'react-native-device-info';
import { AppContext } from '../context/app/AppContext';
import { Button } from 'react-native-elements';
import start from '../assets/start.png';
import { TextError } from '../components/TextError'
import { Picker } from '@react-native-picker/picker';

import { ReceptionContext } from '../context/reception/ReceptionContext';
import moment from 'moment';

export const Info = ({ navigation, route }) => {

  const { logOut, apiUrl, authenticated } = useContext(AppContext);
  const { setFild, doctors, fDoctor, date, errorText, getDoctorsSchedule } = useContext(ReceptionContext);


  const hendlerGetDoctorsSchedule = (fDoctorNew) => {
    setFild("fDoctor", fDoctorNew);
    getDoctorsSchedule(moment(date).format('YYYYMMDD'), fDoctorNew);

  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Настройки',
    });
  }, [route]);

  return (
    <View style={styles.main}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={start}
          resizeMode={"contain"}
          style={{ height: 300, marginBottom: 5 }}
        />
      </View>

      <Text style={styles.textStyle}>Центр флебологии и лазерной хирургии г.Сочи</Text>
      <Text style={{ marginTop: 2 }} >Версия  приложения: {DeviceInfo.getVersion()}</Text>
      <Text style={{ margin: 2 }}>API: {apiUrl}</Text>

      {authenticated && <Button
        onPress={logOut}
        raised={false}
        title={"Выйти из приложения"}
        buttonStyle={{
          backgroundColor: THEME.BUTTON_COLOR
        }}
      />}

      <Button
        onPress={() => navigation.navigate('ChangeApiUrl')}
        raised={false}
        title={"Установить адрес API"}
        buttonStyle={{
          backgroundColor: THEME.BUTTON_COLOR
        }}

        containerStyle={{ marginTop: 5 }}
      />

      <TextError textError={errorText} />
    </View>


  );
}

const styles = StyleSheet.create(
  {

    buttonStyle: {
      width: 200
    },

    main: {
      padding: 4,
      flexDirection: 'column',
      alignContent: "center",
      justifyContent: 'center'
    },
    textStyle: {
      fontSize: 20,
      textAlign: 'center'
    }
  }
)