import React, { useReducer, useContext } from 'react';
import { AppContext } from './AppContext';
import { AppReducer } from './AppReducer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_LOGOUT, REFRESH_TOKEN, FAILURE_REFRESH_TOKEN, RESTORE_LOGIN, SET_API_URL } from '../types';


export const AppState = ({ children }) => {

    const initialState = {
        errlogin: "",
        authenticated: false,
        authenticatedRequest: false,
        accessToken: null,
        refreshToken: null,
        apiUrl: null
    };
    const getApiUrl = () => {
        return state.apiUrl;
    }

    

    const [state, dispatch] = useReducer(AppReducer, initialState);
    
    console.log(getApiUrl());

    const authAxios = axios.create({ baseURL: getApiUrl()});
    const publicAxios = axios.create({ baseURL: getApiUrl()});
    const getAccessToken = () => {
        return state.accessToken;
    };

  
    React.useEffect(() => {
        const timer = setTimeout(() => {
            refreshAuthLogic();
        }, 86400000);// 1 день
        return () => clearTimeout(timer);
    }, [state.refreshToken]);

    authAxios.interceptors.request.use(
        config => {
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${getAccessToken()}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );

    const refreshAuthLogic = (failedRequest = null) => {
        const data = {
            refreshToken: state.refreshToken,
        };

        const options = {
            method: 'POST',
            data,
            url: `${getApiUrl()}/?typerequest=mobilerefreshToken`,
        };

        return axios(options)
            .then(async tokenRefreshResponse => {

                if (failedRequest) {
                    failedRequest.response.config.headers.Authorization =
                        'Bearer ' + tokenRefreshResponse.data.accessToken;
                }

                executRefreshToken(tokenRefreshResponse.data.accessToken, tokenRefreshResponse.data.refreshToken);

                await Keychain.setGenericPassword(
                    'token',
                    JSON.stringify({
                        accessToken: tokenRefreshResponse.data.accessToken,
                        refreshToken: tokenRefreshResponse.data.refreshToken,
                    }),
                );

                return Promise.resolve();
            })
            .catch(e => {

                if (failedRequest) {
                    executFailurerefReshToken();
                }
            });
    }

    createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

    const executLogin = async (login, password) => {

        dispatch({ type: LOGIN_REQUEST });

        try {
            const response = await publicAxios.post('/?typerequest=login', {
                login,
                password,
            });

            const { accessToken, refreshToken, error } = response.data;
            await Keychain.setGenericPassword(
                'token',
                JSON.stringify({
                    accessToken,
                    refreshToken,
                }),
            );
            if (error) {
                dispatch({ type: LOGIN_FAILURE, payload: error })
            } else {
                dispatch({ type: LOGIN_SUCCESS, payload: { accessToken, refreshToken } });
            }

        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, payload: error.toString() });
        }
    }


    const restoreLogin = async (accessToken, refreshToken, authenticated, apiUrl) => {
        dispatch({ type: RESTORE_LOGIN, payload: { accessToken, refreshToken, authenticated, apiUrl} });
    }

    const logOut = async () => {
        dispatch({ type: LOGIN_LOGOUT });
        await Keychain.resetGenericPassword();
    }

    const executRefreshToken = (accessToken, refreshToken) => {
        dispatch({ type: REFRESH_TOKEN, payload: { accessToken, refreshToken } });
    }

    const executFailurerefReshToken = () => {
        dispatch({ type: FAILURE_REFRESH_TOKEN });
    }

    const getSourceImage = (uri, version) => {
        
        const headers = {Authorization: `Bearer ${getAccessToken()}`};
        const uri_api = `${getApiUrl()}?typerequest=getPhoto&guid=${uri}&version=${version}`;

        return  {
            uri:uri_api, 
            url:`${uri_api}&token=${getAccessToken()}`,
            headers,
            props: {headers, uri:uri_api} 
        }
     
    }

    const setApiUrl=(ApiUrl)=>{

        AsyncStorage.setItem('apiUrl', ApiUrl);
        dispatch({ type: SET_API_URL, payload:ApiUrl});
        

    } 


    return (<AppContext.Provider value={{
        authAxios: authAxios,
        authenticated: state.authenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        errlogin: state.errlogin,
        apiUrl:state.apiUrl,
        executLogin,
        logOut,
        getAccessToken,
        executRefreshToken,
        executFailurerefReshToken,
        restoreLogin,
        getSourceImage,
        getApiUrl,
        setApiUrl
    }}>{children}</AppContext.Provider>)
}
