import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { AppContext } from '../context/app/AppContext';
import { THEME } from '../themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import start from '../assets/start.png';
import { TextError } from '../components/TextError';
import { AppLoader } from '../components/ui/AppLoader';
import { color } from 'react-native-reanimated';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

export const Login = ({ navigation, route }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { executLogin, errlogin, authenticatedRequest } = useContext(AppContext);



    return (

        <ScrollView>

            <View style={styles.container}>


                <TouchableOpacity style={{ paddingHorizontal: 1, marginTop: 1, zIndex: 1000, position: 'absolute', top: 10, right: 10}}>
                    <IconAntDesign name='setting' onPress={() => navigation.navigate('ChangeApiUrl')} size={25} color={THEME.MAIN_COLOR} />
                </TouchableOpacity>

                <Text style={styles.textStyle}>Центр флебологии и лазерной хирургии г.Сочи</Text>

                <Image
                    source={start}
                    resizeMode={"contain"}
                    style={{ height: 300, marginBottom: 15 }}
                />
                {(errlogin != "") && (<TextError textError={errlogin} />)}

                <Input

                    value={username}
                    onChangeText={username => setUsername(username)}
                    // label='Имя пользователя'
                    placeholder="Имя пользователя"
                    inputStyle={styles.input}
                    containerStyle={styles.containerStyle}
                    labelStyle={styles.labelStyle}
                    placeholderTextColor={THEME.MAIN_COLOR}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color={THEME.MAIN_COLOR}
                        />

                    }

                />
                <Input
                    value={password}
                    onChangeText={password => setPassword(password)}
                    //label='Пароль'
                    labelStyle={styles.labelStyle}
                    secureTextEntry={true}
                    containerStyle={styles.containerStyle}
                    style={styles.input}
                    placeholderTextColor={THEME.MAIN_COLOR}
                    placeholder="Пароль"
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color={THEME.MAIN_COLOR}
                        />
                    }
                />

                <Button
                    onPress={() => executLogin(username, password)}
                    disabled={authenticatedRequest}
                    title={"Войти"}

                    buttonStyle={{


                        width: 200,

                        marginTop: 10,
                        backgroundColor: THEME.BUTTON_COLOR
                        //  marginBottom: 10
                    }}

                />

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15,
        color: THEME.MAIN_COLOR,
        marginTop: 40,
    },

    containerStyle: {

        color: THEME.MAIN_COLOR,
        //borderColor: THEME.MAIN_COLOR,
        borderColor: THEME.MAIN_COLOR,
        borderBottomColor: THEME.MAIN_COLOR,
    },

    labelStyle: {
        color: THEME.MAIN_COLOR,
        marginTop:20,

        borderColor: "white",

    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

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

export default Login;
