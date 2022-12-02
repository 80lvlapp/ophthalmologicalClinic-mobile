import React, { useContext, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, ScrollView} from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { AppContext } from '../context/app/AppContext';
import { THEME } from '../themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import start from '../assets/start.png';
import { TextError } from '../components/TextError';
import axios from 'axios';


export const ChangeApiUrl = ({ navigation }) => {

    //const [apiUrlLocal, setapiUrlLocal] = useState('https://webpub.isvs1c.ru/medicine_polyclinic_sbyhalo/hs/mobappdoctorsworkplace');
    const [apiUrlLocal, setapiUrlLocal] = useState('https://sportsrating.ru:444/lvlapp/hs/mobappdoctorsworkplace');

    //const [apiUrlLocal, setapiUrlLocal] = useState('https://ps.angiosochi.ru:5788/lvlApp/hs/mobappdoctorsworkplace');

    const [loading, setLoading] = useState(false);
    const [errConnect, setErrConnect] = useState('');
    const { setApiUrl } = useContext(AppContext);

    const connect = async () => {
        setLoading(true);
        setErrConnect('');
        try {
            const response = await axios.post(`${apiUrlLocal}/?typerequest=testconnection`);
            console.log("ок");
            setLoading(false);
            setApiUrl(apiUrlLocal);
            if (navigation) {
                navigation.goBack();
            }
      

        } catch (error) {
            console.log(error);
            setLoading(false);
            setErrConnect("Не удалось установить соединение");
        }
    }

    return (
        <ScrollView>
        <View  style={styles.container}>


            {loading && (<ActivityIndicator
                size="large"
                color={THEME.BUTTON_COLOR} />)}

            <Text style={styles.textStyle}>Центр флебологии и лазерной хирургии г.Сочи</Text>

            <Image
                source={start}
                resizeMode={"contain"}
                style={{ height: 300, marginBottom: 15}}
            />

            <Input

                value={apiUrlLocal}
                onChangeText={value => setapiUrlLocal(value)}
                // label='Имя пользователя'
                placeholder="API"
                inputStyle={styles.input}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                multiline={true}
                placeholderTextColor={THEME.MAIN_COLOR}
                leftIcon={
                    <Icon
                        name='server'
                        size={24}
                        color={THEME.MAIN_COLOR}
                    />

                }

            />

            <Button onPress={connect} title={"Подключить"} buttonStyle={styles.buttonStyle} />

            {(errConnect != "") && (<TextError textError={errConnect} />)}

        </View >
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15,
        color: THEME.MAIN_COLOR,

    },
    containerStyle: {
        color: THEME.MAIN_COLOR,
        //borderColor: THEME.MAIN_COLOR,
        borderColor: THEME.MAIN_COLOR,
        borderBottomColor: THEME.MAIN_COLOR,
    },

    labelStyle: {
        color: THEME.MAIN_COLOR,
        //borderColor: THEME.MAIN_COLOR,
        borderColor: "white",

    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#00FFFF',
    },
    input: {

        color: THEME.MAIN_COLOR,
        borderColor: THEME.MAIN_COLOR,
        //borderColor: THEME.MAIN_COLOR,
        borderColor: THEME.MAIN_COLOR,
        borderBottomColor: THEME.MAIN_COLOR,
    },



    logo: {
        width: 50,
        height: 50,
        resizeMode: 'stretch',
    },

    buttonStyle: {
        width: 200,
        backgroundColor: THEME.MAIN_COLOR,
    }
});

export default ChangeApiUrl;
