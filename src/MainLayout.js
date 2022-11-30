import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from './screens/Main';
import { Patient } from './screens/Patient';
import { Login } from './screens/Login';
import { Info } from './screens/Info';
import { Html } from './screens/Html';
import { Gallery } from './screens/Gallery';
import { ChangeApiUrl } from './screens/ChangeApiUrl';
import {PatientList} from './screens/searchPatient/PatientList'

import { PatientService } from './screens/PatientService';
import { PhotoSelection } from './screens/PhotoSelection';

import { AppCamera } from './components/AppCamera';
import { THEME } from './themes';
import { AppContext } from './context/app/AppContext';
import { AppLoaderSmall } from './components/ui/AppLoaderSmall';
import * as Keychain from 'react-native-keychain';
import { PhotoGrid } from './screens/PhotoGrid';
import { Tags } from './screens/Tags';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export const MainLayout = () => {

    const [status, setStatus] = React.useState('loading');
    const { authenticated, restoreLogin, apiUrl } = useContext(AppContext);

    const loadJWT = React.useCallback(async () => {

        let apiUrlAsyncStorage = '';

        try {
            apiUrlAsyncStorage = await AsyncStorage.getItem('apiUrl');
        } catch (e) {
            console.log(e);
        }

        try {
            const value = await Keychain.getGenericPassword();

            const jwt = JSON.parse(value.password);

            restoreLogin(jwt.accessToken || null, jwt.refreshToken || null, jwt.accessToken !== null, apiUrlAsyncStorage);
            setStatus('success');
        } catch (error) {
            setStatus('error');
            console.log(`Keychain Error: ${error.message}`);
            restoreLogin(null, null, false, apiUrlAsyncStorage);
        }
    }, []);

    React.useEffect(() => {
        loadJWT();
    }, [loadJWT]);



    console.log("Мы тут", apiUrl);

    if (status === 'loading') {
        return <AppLoaderSmall />;
    }

    if (!apiUrl) {
        return (<ChangeApiUrl />)
    }


    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer >

            {!authenticated && <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="ChangeApiUrl" component={ChangeApiUrl} options={{ headerShown: false }} />
            </Stack.Navigator>}

            {authenticated && <Stack.Navigator
                screenOptions={{
                    title: "Поликлиника",
                    headerStyle: { backgroundColor: THEME.MAIN_COLOR },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold', textAlign: 'center', color: '#fff'
                    },
                    headerTitleAlign: 'center'
                }}>

                <Stack.Screen name="Main" component={Main}
                    options={({ navigation, route }) => ({
                        headerLeft: () => (
                            <TouchableOpacity style={{ paddingHorizontal: 15 }}>
                                <Icon name='account-search-outline' type='material-community' color='#fff' size={30}
                                    onPress={() => navigation.navigate('PatientList')} />
                            </TouchableOpacity>
                        )
                    })} />
                <Stack.Screen name="Patient" component={Patient} />
                <Stack.Screen name="PhotoGrid" component={PhotoGrid} options={{ headerShown: false }} />
                <Stack.Screen name="Info" component={Info} />
                <Stack.Screen name="AppCamera" component={AppCamera} options={{ headerShown: false }} />
                <Stack.Screen name="PatientService" component={PatientService} />
                <Stack.Screen name="PhotoSelection" component={PhotoSelection} />
                <Stack.Screen name="Html" component={Html} />
                <Stack.Screen name="Gallery" component={Gallery} options={{ headerShown: false }} />
                <Stack.Screen name="ChangeApiUrl" component={ChangeApiUrl} options={{ headerShown: false }} />
                <Stack.Screen name="Tags" component={Tags} />
                <Stack.Screen name="PatientList" component={PatientList} />


            </Stack.Navigator>}
        </NavigationContainer>
    );
}