import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_LOGOUT,
    REFRESH_TOKEN,
    FAILURE_REFRESH_TOKEN,
    RESTORE_LOGIN,
    SET_API_URL
} from '../types'

export const AppReducer = (state, action) => {
   // console.log("Вход---------------", action);
    switch (action.type) {

        case SET_API_URL:
            return { ...state, apiUrl:action.payload }
        
        case LOGIN_LOGOUT:
            return { ...state, authenticated: false, authenticatedRequest: false, accessToken: null, refreshToken: null, errlogin: "" }
        case LOGIN_REQUEST:
            return { ...state, authenticated: false, authenticatedRequest: true, accessToken: null, refreshToken: null, errlogin: "" }
        case LOGIN_FAILURE:
            return { ...state, authenticated: false, authenticatedRequest: false, accessToken: null, refreshToken: null, errlogin: action.payload }
        case LOGIN_SUCCESS:
            return { ...state, authenticated: true, authenticatedRequest: false, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken, errlogin: "" }
        case REFRESH_TOKEN:
            return { ...state, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken }
        case FAILURE_REFRESH_TOKEN:
            return { ...state, accessToken: null, refreshToken: null, authenticated: false }
        case RESTORE_LOGIN:
            return { ...state, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken, authenticated: action.payload.authenticated, apiUrl:action.payload.apiUrl}
        default:
            return state
    }
}
