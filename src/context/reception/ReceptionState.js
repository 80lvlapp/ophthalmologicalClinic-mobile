import React, { useReducer, useContext } from 'react';
import { ReceptionContext } from './ReceptionContext';
import { AppContext } from '../app/AppContext';
import { ReceptionReducer } from './ReceptionReducer';
import { Alert } from "react-native";
import {
    SCHEDULE_REQUEST,
    SCHEDULE_SUCCESS,
    SCHEDULE_FAILURE,
    SERVICES_REQUEST,
    SERVICES_SUCCESS,
    SERVICES_FAILURE,
    PATIENT_GALLERY_REQUEST,
    PATIENT_GALLERY_SUCCESS,
    PATIENT_GALLERY_FAILURE,
    GET_HTML_REQUEST,
    GET_HTML_FAILURE,
    GET_HTML_SUCCESS,
    DOCTORSSCHEDULE_SORT,
    SET_FILD,
    OPEN_PATIENT,
    OPEN_SERVICE,
    SERVICE_DATA_REQUEST,
    SERVICE_DATA_SUCCESS,
    SERVICE_DATA_FAILURE,
    SAVE_COMENT_REQUEST,
    SAVE_COMENT_SUCCESS,
    SAVE_COMENT_FAILURE,
    DELETE_PHOTO_REQUEST,
    DELETE_PHOTO_SUCCESS,
    DELETE_PHOTO_FAILURE,
    GET_LIST_PATIENTS_REQUEST, 
    GET_LIST_PATIENTS_FAILURE, 
    GET_LIST_PATIENTS_SUCCESS, 
    SET_SEARCHTEXT_PATIENTS,
    SAVE_VALUE_PARAMETR_REQUEST,
    SAVE_VALUE_PARAMETR_SUCCESS,
    SAVE_VALUE_PARAMETR_FAILURE
} from '../types';

import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';
import RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import { min } from 'date-fns';

export const ReceptionState = ({ children }) => {

    const initialState = {
        //Schedule
        doctorsSchedule: [],
        loadingDoctorsSchedule: false,
        doctors: [],
        errorSchedule: "",
        currentPatient: null,
        currentMedicalCard: null,

        curentGuidService: '',
        date: moment().toDate(),
        fDoctor: "",
        fNamePatient: "",

        fildSort: "time",
        firstOpen: true,

        //Patient
        loadingServices: false,
        services: [],
        patientParameters: [],
        errorServices: "",

        //patientGallery
        loadingPatientGallery: false,
        patientGallery: [],
        errorpatientGallery: "",
        indexpatientGallery: 0,
        typesGallery: "",

        //HTML
        currentHTML: null,
        loadingHTML: false,
        errorHTML: '',
        titleHtml: '',

        //Photo
        arrayPhoto: [],
        arrayCameraPhoto: [],
        currentService: null,
        uploadStart: false,

        //PatientService
        errorDataService: '',
        loadingDataService: false,
        dataService: {},

        //coment
        saveComentLoading: false,
        errorComentloading: "",

        //deletePhoto
        deletePhotoLoading: false,
        errorDeletePhoto: "",
        errorText: "",
    
        //seaech patient
        searchTextPatients: '',
        listPatients: [],
        loadingListPatients: false,
        errorloadingListPatients: '',


         //save_value_parametr
         saveValueParametrLoading: false,
         errorSaveValueParametr: "",
       
         comment: ''

    };

    const [state, dispatch] = useReducer(ReceptionReducer, initialState);
    const { authAxios, getSourceImage, accessToken, getApiUrl } = useContext(AppContext);

    const sort = (fildSort) => {
        dispatch({ type: DOCTORSSCHEDULE_SORT, payload: { fildSort, doctorsSchedule: getSortAray(fildSort, state.doctorsSchedule.slice()) } })
    }

    const getSortAray = (fildSort, aray) => {
        if (fildSort == "name") {
            aray.sort(function (a, b) {
                var nameA = a.patient.name.toLowerCase(), nameB = b.patient.name.toLowerCase()
                if (nameA < nameB) //сортируем строки по возрастанию
                    return -1
                if (nameA > nameB)
                    return 1
                return 0 // Никакой сортировки
            })
        }
        else if (fildSort == "time") {
            aray.sort(function (a, b) {
                return a.order - b.order
            })
        }
        return aray;
    }

    const getDoctorsSchedule = async (date, fDoctor) => {

        dispatch({ type: SCHEDULE_REQUEST });

        const response = await getTestConnection();
        //console.log(response.status);

        try {
            const response = await authAxios.post('/?typerequest=getDoctorsSchedule', {
                "guiEmployee": fDoctor,
                "date": date
            });
            const { schedule, employees, currentEmployee } = response.data;

            dispatch({
                type: SCHEDULE_SUCCESS,
                payload: { doctorsSchedule: getSortAray(state.fildSort, schedule), doctors: employees, currentEmployee }
            });

        } catch (error) {
            console.log("ошибка получения schedule", error.toString());
            dispatch({ type: SCHEDULE_FAILURE, payload: error.toString() })
        }
    }

    const getTestConnection = async () => {
        const response = await fetch(`${getApiUrl()}?typerequest=testconnection`, {
            headers: {
                'Accept': 'application/json',
            },
            method: 'post',
            body: {}
        });

        return response;
    }

    const getServices = async (guidPatient) => {

        dispatch({ type: SERVICES_REQUEST });

        const response = await getTestConnection();

        try {
            const response = await authAxios.post('/?typerequest=getAllServicesForPatient', { guidPatient });
            const { services, patientParameters } = response.data;
            dispatch({ type: SERVICES_SUCCESS, payload: { services, patientParameters } });
        } catch (error) {
            console.log("ошибка получения services", error.toString());
            dispatch({ type: SERVICES_FAILURE, payload: error.toString() });
        }

    }

    const getDataService = async (guidService, guidServiceRef) => {
        dispatch({ type: SERVICE_DATA_REQUEST });
        try {
            const response = await authAxios.post('/?typerequest=getDataService', { guidService, guidServiceRef });
            dispatch({ type: SERVICE_DATA_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("ошибка получения services", error.toString());
            dispatch({ type: SERVICE_DATA_FAILURE, payload: error.toString() });
        }
    }

    const getPatientGallery = async (types = "") => {

        let stateTypes = "";

        if (types) {
            setFild("typesGallery", types);
            stateTypes = types;
        } else {
            stateTypes = state.typesGallery;
        }

        let parameters;
        if (stateTypes == "PatientGallery") {
            parameters = { guidPatient: state.currentPatient.guid }
        }
        else if (stateTypes == "PatientServiceGallery") {
            parameters = { guidPatient: state.currentPatient.guid, guidService: state.currentService.guidService }
        }
     

        dispatch({ type: PATIENT_GALLERY_REQUEST });
        try {
            const response = await authAxios.post('/?typerequest=getArrayPreviewPhoto', parameters);
            dispatch({ type: PATIENT_GALLERY_SUCCESS, payload: response.data.map((item) => { return { ...item, loading: false } }) });
        } catch (error) {
            console.log("ошибка получения patient gallery", error.toString());
            dispatch({ type: PATIENT_GALLERY_FAILURE, payload: error.toString() });
        }
    }

  
    const openHTML = async (navigation, options, title) => {

        dispatch({ type: GET_HTML_REQUEST, payload: title });
        navigation.navigate('Html');
        try {
            const response = await authAxios.post('/?typerequest=getHTML', options);
            dispatch({ type: GET_HTML_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("ошибка получения html", error.toString());
            dispatch({ type: GET_HTML_FAILURE, payload: error.toString() });
        }
    }

    const setFild = (fild, value) => {
        dispatch({ type: SET_FILD, payload: { fild, value } });
    }

    const openPatient = (patient, medicalCard, guidService, navigation) => {
        if (!patient.guid) {
            return;
        }
        dispatch({ type: OPEN_PATIENT, payload: { patient: { ...patient }, medicalCard: { ...medicalCard }, guidService} });
        getServices(patient.guid);
        navigation.navigate('Patient');
    }

    const openService = (service, navigation) => {

        dispatch({ type: OPEN_SERVICE, payload: { service: { ...service } } });
        getDataService(service.guidService, service.service.guid);
        navigation.navigate('PatientService');
    }

    const openPatientGallery = (navigation, type = "PatientGallery") => {

        getPatientGallery(type);
        navigation.navigate('PhotoGrid');
    
    }


    const uploadPhoto = async (photoItem, endhandler = null, successHandler = null) => {

    
        if (! await RNFS.exists(photoItem.uri)) {
            console.log("нет файлика");
        }
      
        
        try {
            var data = new FormData();
            data.append('photo_service', {
                uri: photoItem.uri,
                name: 'photo.jpg',
                type: 'image/jpg'
            })

            data.append('photo_service_meta', JSON.stringify({ ...photoItem }))

            const response = await fetch(`${getApiUrl()}?typerequest=uploadPhoto`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + accessToken
                },
                method: 'post',
                body: data
            });

            const dataRespons = await ({
                'status': response.status,
                'text': await response.text()
            })

            if (dataRespons.status == 200) {
                if (successHandler) {
                    successHandler();
                    setFild("errorText", "");

                }
            }
        }
        catch (e) {
            console.log(e);
            console.log("Ошибка отправки!!!");
            setFild("errorText", e.toString());
        }

        if (endhandler) {
            endhandler();
        }
    }

    const getPhotoSourcesFromId = (arrayId, typeUrl) => {

        return arrayId.map(item => getSourceImage(item[typeUrl], item.version))
    }

   
   
    const deletePhotos = async (imageItems, index) => {

        const parameters = imageItems.map((imageItem) => { return { ...imageItem, guid: imageItem.guidFullPhoto } })

        dispatch({ type: DELETE_PHOTO_REQUEST });
        try {

            const response = await authAxios.post('/?typerequest=deletePhoto', parameters);
            const { result, error } = response.data;

            if (error) {
                dispatch({ type: DELETE_PHOTO_FAILURE, payload: error });
            } else {

                dispatch({ type: DELETE_PHOTO_SUCCESS, payload: { result, index } });
            }

        } catch (error) {
            dispatch({ type: DELETE_PHOTO_FAILURE, payload: error.toString() });
        }
    }


    const saveComent = async () => {

        dispatch({ type: SAVE_COMENT_REQUEST });
        try {

            const parameters = {

                guidService: state.curentGuidService,
                comment: state.comment,
            }

            const response = await authAxios.post('/?typerequest=saveComment', parameters);
            const { result, comment, newComment } = response.data;

            if (result) {
                dispatch({ type: SAVE_COMENT_SUCCESS, payload: newComment });
                //navigation.navigate('Patient');

            } else {
                dispatch({ type: SAVE_COMENT_FAILURE, payload: comment });
            }

        } catch (error) {
            dispatch({ type: SAVE_COMENT_FAILURE, payload: error.toString() });
        }
    }

   

    const executeGetListPatients = async (additionalLoading = false, searchTextPatients = "") => {

        if (searchTextPatients.length < 4) {
            dispatch({ type: GET_LIST_PATIENTS_SUCCESS, payload: { data: [], searchTextPatients } });
            return;
        }


        dispatch({ type: GET_LIST_PATIENTS_REQUEST });

        try {

            let endName = ""
            if (additionalLoading && state.listPatients.length) {
                endName = state.listPatients[state.listPatients.length - 1].name;
            }

            const parameters = {

                name: searchTextPatients,
                endName: endName,
            }

            const response = await authAxios.post('/?typerequest=findPatient', parameters);
            const type = GET_LIST_PATIENTS_SUCCESS;
            dispatch({ type, payload: { data: response.data, searchTextPatients } });

        } catch (error) {
            console.log("ошибка получения списка пациентов", error.toString());
            dispatch({ type: GET_LIST_PATIENTS_FAILURE, payload: error.toString() });
        }

    }

    const setSearchTextListPatients = (searchTextPatients) => {

        dispatch({ type: SET_SEARCHTEXT_PATIENTS, payload: searchTextPatients });
        executeGetListPatients(false, searchTextPatients);

    }


    const saveValueParametr = async (id, value, guidService) => {

        dispatch({ type: SAVE_VALUE_PARAMETR_REQUEST });
        try {

            const parameters = {
                id, value, guidService
            }
            
            const response = await authAxios.post('/?typerequest=saveValueParametr', parameters);
            dispatch({ type: SAVE_VALUE_PARAMETR_SUCCESS, payload: parameters });
          
        } catch (error) {
            dispatch({ type: SAVE_VALUE_PARAMETR_FAILURE, payload: error.toString() });
        }
    }

    const getDataMedicalDocumentData = async (guidService) => {
            const response = await authAxios.post('/?typerequest=getDataMedicalDocumentData', {guidService});
            return response;
    }


    const saveMedicalDocument = async (id, guidService, medicalDocumentData) => {
        const response = await authAxios.post('/?typerequest=saveMedicalDocument', {id, guidService, medicalDocumentData});
        return response;
    }

    return (<ReceptionContext.Provider value={{
        doctorsSchedule: state.doctorsSchedule,
        doctors: state.doctors,
        loadingDoctorsSchedule: state.loadingDoctorsSchedule,
        loadingDoctorsSchedule: state.loadingDoctorsSchedule,
        errorDoctorsSchedule: state.errorDoctorsSchedule,
        currentPatient: state.currentPatient,
        fDoctor: state.fDoctor,
        fNamePatient: state.fNamePatient,
        fildSort: state.fildSort,
        currentMedicalCard: state.currentMedicalCard,
        date: state.date,
        loadingServices: state.loadingServices,
        services: state.services,
        errorServices: state.errorServices,
        patientParameters: state.patientParameters,
        loadingPatientGallery: state.loadingPatientGallery,
        patientGallery: state.patientGallery,
        errorpatientGallery: state.errorpatientGallery,
        indexpatientGallery: state.indexpatientGallery,
        currentHTML: state.currentHTML,
        loadingHTML: state.loadingHTML,
        errorHTML: state.errorHTML,
        titleHtml: state.titleHtml,
        arrayPhoto: state.arrayPhoto,
        currentService: state.currentService,
        arrayCameraPhoto: state.arrayCameraPhoto,
        loadingEditFile: state.loadingEditFile,
        errorDataService: state.errorDataService,
        loadingDataService: state.loadingDataService,
        dataService: state.dataService,
        typesGallery: state.typesGallery,
        saveComentLoading: state.saveComentLoading,
        errorComentloading: state.errorComentloading,
        deletePhotoLoading: state.deletePhotoLoading,
        errorDeletePhoto: state.errorDeletePhoto,
        searchTextPatients: state.searchTextPatients,
        listPatients: state.listPatients,
        loadingListPatients: state.loadingListPatients,
        errorloadingListPatients: state.errorloadingListPatients,
        comment:  state.comment,
        curentGuidService:state.curentGuidService,

        saveValueParametrLoading: state.saveValueParametrLoading,
        errorSaveValueParametr: state.errorSaveValueParametr,

        getDoctorsSchedule,
        sort,
        openPatient,
        setFild,
        getServices,
        openPatientGallery,
        getPatientGallery,
        getPhotoSourcesFromId,
        openHTML,
        uploadPhoto,
        openService,
        
        saveComent,
        deletePhotos,
        getTestConnection,
        executeGetListPatients,
        setSearchTextListPatients,

        saveValueParametr,
        getDataMedicalDocumentData,
        saveMedicalDocument
     
    }}>{children}</ReceptionContext.Provider>)

}
