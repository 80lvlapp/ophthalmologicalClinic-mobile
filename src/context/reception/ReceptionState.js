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
    ADD_PHOTO,
    REMOVE_PHOTO,
    OPEN_SERVICE,
    SERVICE_DATA_REQUEST,
    SERVICE_DATA_SUCCESS,
    SERVICE_DATA_FAILURE,
    DOWNLOAD_EDIPHOTO_REQUEST,
    DOWNLOAD_EDIPHOTO_FAILURE,
    DOWNLOAD_EDIPHOTO_SUCCESS,
    SHARE_EDIPHOTO_REQUEST,
    SHARE_EDIPHOTO_FAILURE,
    SHARE_EDIPHOTO_SUCCESS,
    CHANGE_FAVORITE_REQUEST,
    CHANGE_FAVORITE_FAILURE,
    CHANGE_FAVORITE_SUCCESS,
    CLEARE_FAVORITE_SUCCESS,
    GET_TAGS_REQUEST,
    GET_TAGS_SUCCESS,
    GET_TAGS_FAILURE,
    SAVE_COMENT_REQUEST,
    SAVE_COMENT_SUCCESS,
    SAVE_COMENT_FAILURE,
    CHANGE_TAG_REQUEST,
    CHANGE_TAG_SUCCESS,
    CHANGE_TAG_FAILURE,
    DELETE_PHOTO_REQUEST,
    DELETE_PHOTO_SUCCESS,
    DELETE_PHOTO_FAILURE,
    GET_LIST_PATIENTS_REQUEST, GET_LIST_PATIENTS_FAILURE, GET_LIST_PATIENTS_SUCCESS, SET_SEARCHTEXT_PATIENTS
} from '../types';

import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';
import PhotoEditor from 'react-native-photo-editor';
import RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import Share from 'react-native-share';
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

        date: moment().toDate(),
        fDoctor: "",
        fNamePatient: "",
        fOperating: false,
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

        loadingEditFile: false,
        errorploadingEditFile: "",

        loadingSharefile: false,
        errorploadingSharefile: "",

        loadingChangeFavorite: false,
        loadingChangeFavoriteError: false,

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

        //TAGS
        arrayTagsByPhoto: [],
        allArrayTags: [],
        errorGetTags: '',
        loadingTags: false,
        curentPhoto: null,

        tagName: '',
        changeTagloading: false,
        errorChangeTag: '',
        typeChangeTag: '',
        curentGuidTag: '',
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

    };

    const [state, dispatch] = useReducer(ReceptionReducer, initialState);
    const { authAxios, getSourceImage, accessToken, getApiUrl } = useContext(AppContext);

    React.useEffect(() => {
        const timerId = setInterval(async () => {
            try {
                await uploadFiles(null);
            } catch (e) {
                console.log(e.toString());
            }

        }, 120000);
        return () => {
            clearInterval(timerId);
        };

    }, [state, accessToken]);

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
        //console.log(response.status);

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
        else if (stateTypes == "PatientFavoritesGallery") {
            parameters = { guidPatient: state.currentPatient.guid, favorites: true }
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

    const getTags = async (photo) => {

        dispatch({ type: GET_TAGS_REQUEST });
        try {
            const response = await authAxios.post('/?typerequest=getTagsByPhoto', { guid: photo.guidFullPhoto });
            dispatch({ type: GET_TAGS_SUCCESS, payload: { allArrayTags: response.data.allArrayTags, arrayTagsByPhoto: response.data.arrayTagsByPhoto } });
        } catch (error) {
            console.log("ошибка получения tags", error.toString());
            dispatch({ type: GET_TAGS_FAILURE, payload: error.toString() });
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

    const openPatient = (patient, medicalCard, navigation) => {
        if (!patient.guid) {
            return;
        }
        dispatch({ type: OPEN_PATIENT, payload: { patient: { ...patient }, medicalCard: { ...medicalCard } } });
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

    const setPhoto = (photos) => {
        const guidService = state.currentService.guidService;
        const guidServiceRef = state.currentService.service.guid
        const guidPatient = state.currentPatient.guid;
        const newPhoto = photos.map(item => { return { ...item, guidService, guidServiceRef, guidPatient } })
        uploadFiles(newPhoto);
    }

    const uploadFiles = async (arrayPhoto = null) => {

        let uploadArray;
        let allFiles;

        console.log("Запуск uploadFiles!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        if (arrayPhoto != null) {
            allFiles = await addArrayPhotoFromAsyncStorage(arrayPhoto);
        } else {
            allFiles = await getArrayPhotoFromAsyncStorage();
            if (state.uploadStart) {
                console.log("Уже идет отправка");
                return;
            }
        }

        if (!(state.arrayPhoto.length == 0 && allFiles.length == 0)) {
            dispatch({ type: ADD_PHOTO, payload: { photo: allFiles } });
        }


        if (arrayPhoto != null) {
            uploadArray = arrayPhoto;
        } else {

            uploadArray = allFiles;
        }

        if (!uploadArray.length) {
            return;
        }

        setFild("uploadStart", true);

        try {

            for (let step = 0; step < uploadArray.length; step++) {

                const item = uploadArray[step];

                const successHandler = async () => {
                    await removeArrayPhotoFromAsyncStorage(item);
                    if (item.fromCamera) {
                        if (await RNFS.exists(item.filepath)) {
                            RNFS.unlink(item.filepath);
                        }
                    }
                };

                await uploadPhoto(item, null, successHandler);

                if (step == uploadArray.length - 1) {
                    setFild("uploadStart", false);
                }
            }



        } catch (err) {
            console.log(err);
            setFild("uploadStart", false);
        }
    }

    const getArrayPhotoFromAsyncStorage = async () => {
        try {
            arrayPhotostr = await AsyncStorage.getItem('arrayPhoto');
            if (arrayPhotostr) {
                return JSON.parse(arrayPhotostr);
            }
            return [];
        } catch (e) {
            return [];
        }
    }

    const addArrayPhotoFromAsyncStorage = async (arrayPhoto) => {

        const arrayPhotoAsyncStorage = await getArrayPhotoFromAsyncStorage();
        const newArrayPhoto = [...arrayPhotoAsyncStorage, ...arrayPhoto];
        await AsyncStorage.setItem('arrayPhoto', JSON.stringify(newArrayPhoto));
        return newArrayPhoto;
    }

    const removeArrayPhotoFromAsyncStorage = async (item) => {

        const arrayPhoto = await getArrayPhotoFromAsyncStorage();
        const newArrayPhoto = arrayPhoto.filter(itemStor => itemStor.filepath != item.filepath);
        await AsyncStorage.setItem('arrayPhoto', JSON.stringify(newArrayPhoto));
        dispatch({ type: REMOVE_PHOTO, payload: item });
        return newArrayPhoto;

    }

    const EditPhoto = async (imageItem) => {

        dispatch({ type: DOWNLOAD_EDIPHOTO_REQUEST });

        const fileName = uuid.v4();
        const SourceImage = getSourceImage(imageItem['guidFullPhoto'], imageItem.version);
        const path = `${RNFS.DocumentDirectoryPath}/${fileName}.jpeg`;
        const headers = SourceImage.headers;

        const options = {
            fromUrl: SourceImage.uri,
            toFile: path,
            headers: headers
        }

        try {

            const response = await RNFS.downloadFile(options);
            return response.promise.then(res => {

                dispatch({ type: DOWNLOAD_EDIPHOTO_SUCCESS });
                console.log(path);
                console.log(headers);

                PhotoEditor.Edit({
                    path: path,

                    onCancel: () => { },
                    onDone: (result) => {

                        const imageUpload = { ...imageItem, filepath: path, version: uuid.v4(), guid: imageItem.guidFullPhoto, idFile: uuid.v4(), loading: false }
                        const successHandler = () => {
                            const newpatientGallery = state.patientGallery.map(item => item.guidFullPhoto == imageUpload.guidFullPhoto ? imageUpload : item);
                            setFild("patientGallery", newpatientGallery);
                        }

                        uploadPhoto(imageUpload, null, successHandler);

                    },
                })
            }).catch(error => dispatch({ type: DOWNLOAD_EDIPHOTO_FAILURE, payload: error.toString() }))

        } catch (error) {
            dispatch({ type: DOWNLOAD_EDIPHOTO_FAILURE, payload: error.toString() });
        }

    }

    const sharePhoto = async (imageItems) => {

        dispatch({ type: SHARE_EDIPHOTO_REQUEST });

        let urls = [];

        let i;
        for (i = 0; i < imageItems.length; i++) {

            console.log(i);
            let imageItem = imageItems[i];

            const fileName = uuid.v4();
            const SourceImage = getSourceImage(imageItem['guidFullPhoto'], imageItem.version);
            const path = `${RNFS.DocumentDirectoryPath}/${fileName}.jpeg`;
            const headers = SourceImage.headers;

            const options = {
                fromUrl: SourceImage.uri,
                toFile: path,
                headers: headers
            }

            try {
                const response = await RNFS.downloadFile(options);

                response.promise.then(res => RNFS.readFile(path, 'base64'))
                    .then(base64Data => {
                        const base64DataUrl = `data:image/jpeg;base64,` + base64Data;

                        urls.push(base64DataUrl);
                        RNFS.unlink(path);

                        if (urls.length == imageItems.length) {
                            Share.open({ urls });
                            dispatch({ type: SHARE_EDIPHOTO_SUCCESS });
                        }
                    }
                    ).catch(error => dispatch({ type: SHARE_EDIPHOTO_FAILURE, payload: error.toString() }))

            } catch (error) {
                dispatch({ type: SHARE_EDIPHOTO_FAILURE, payload: error.toString() });
            }
        }
    }

    const uploadPhoto = async (currentPhoto, endhandler = null, successHandler = null) => {

        if (! await RNFS.exists(currentPhoto.filepath)) {
            if (successHandler) {
                successHandler();
                return undefined;
            }
            if (endhandler) {
                endhandler();
            }
        }

        try {
            var data = new FormData();
            data.append('photo_service', {
                uri: "file://" + currentPhoto.filepath,
                name: 'photo.jpg',
                type: 'image/jpg'
            })

            data.append('photo_service_meta', JSON.stringify({ ...currentPhoto }))

            const response = await fetch(`${getApiUrl()}?typerequest=uploadPhoto&idFile=${currentPhoto.idFile}`, {
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
            console.log("Ошибка отправки..........................!!!!!!!!!!!!!!!!!!");
            setFild("errorText", e.toString());
        }

        if (endhandler) {
            endhandler();
        }
    }

    const getPhotoSourcesFromId = (arrayId, typeUrl) => {

        return arrayId.map(item => getSourceImage(item[typeUrl], item.version))
    }

    const changeFavorite = async (imageItems, IncludedInFavoriteGallery, сlear = false) => {


        if (imageItems.length > 4 && IncludedInFavoriteGallery) {
            Alert.alert("В галерею до и после нельзя добавить более 4 фотографий");
            return;
        }

        const parameters = {
            сlear,
            arrayPhotos: imageItems.map((imageItem) => { return { ...imageItem, guid: imageItem.guidFullPhoto } }),
            IncludedInFavoriteGallery,
            guidPatient: state.currentPatient.guid
        }

        const createThreeButtonAlert = (error) =>
            Alert.alert(
                "Превышен лимит, \nочистить галерею до и после?",
                "",
                [
                    {
                        text: "Отмена",
                        onPress: () => dispatch({ type: CHANGE_FAVORITE_FAILURE, payload: error }),
                        style: "cancel"
                    },

                    { text: "OK", onPress: () => changeFavorite(imageItems, IncludedInFavoriteGallery, true) }

                ]);


        dispatch({ type: CHANGE_FAVORITE_REQUEST });
        try {

            const response = await authAxios.post('/?typerequest=incExcPhotoInFavoriteGallery', parameters);
            const { result, error, overflow } = response.data;

            if (error) {
                if (overflow) {
                    createThreeButtonAlert(error);
                } else {
                    dispatch({ type: CHANGE_FAVORITE_FAILURE, payload: error });
                }
            } else {
                dispatch({ type: CHANGE_FAVORITE_SUCCESS, payload: { IncludedInFavoriteGallery, imageItems } });
            }

        } catch (error) {
            dispatch({ type: CHANGE_FAVORITE_FAILURE, payload: error.toString() });
        }
    }

    const changeFavoritePhotoGrid = async (imageItems, IncludedInFavoriteGallery) => {



        if (IncludedInFavoriteGallery) {

            if (imageItems.length > 4) {
                Alert.alert("Максимальное кол-во фото в До-После 4!");
                return;
            }

            const parameters = {
                сlear: false,
                arrayPhotos: imageItems.map((imageItem) => { return { ...imageItem, guid: imageItem.guidFullPhoto } }),
                IncludedInFavoriteGallery: true,
                guidPatient: state.currentPatient.guid
            }

            dispatch({ type: CHANGE_FAVORITE_REQUEST });
            try {

                const response = await authAxios.post('/?typerequest=incExcPhotoInFavoriteGallery', parameters);
                const { result, error, overflow } = response.data;

                if (error) {
                    if (overflow) {
                        dispatch({ type: CHANGE_FAVORITE_FAILURE, payload: error });
                        Alert.alert("Максимальное кол-во фото в До-После 4!");
                    } else {
                        dispatch({ type: CHANGE_FAVORITE_FAILURE, payload: error });
                    }
                } else {
                    dispatch({ type: CHANGE_FAVORITE_SUCCESS, payload: { IncludedInFavoriteGallery, imageItems } });
                }

            } catch (error) {
                dispatch({ type: CHANGE_FAVORITE_FAILURE, payload: error.toString() });
            }

        } else {

            const parameters = {
                сlear: true,
                arrayPhotos: [],
                IncludedInFavoriteGallery: true,
                guidPatient: state.currentPatient.guid
            }

            dispatch({ type: CHANGE_FAVORITE_REQUEST });
            try {

                const response = await authAxios.post('/?typerequest=incExcPhotoInFavoriteGallery', parameters);
                const { result, error, overflow } = response.data;


                dispatch({ type: CLEARE_FAVORITE_SUCCESS });

            } catch (error) {

                dispatch({ type: CHANGE_FAVORITE_FAILURE, payload: error.toString() });
            
            }

        }


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


    const saveComent = async (navigation) => {

        dispatch({ type: SAVE_COMENT_REQUEST });
        try {

            const parameters = {

                guidService: state.currentService.guidService,
                guidServiceRef: state.currentService.service.guid,
                comment: state.dataService.comment
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

    const changeTag = async (guidTag = '', nameTag = '', remove = false) => {

        let typeChangeTag = "";
        if (remove) {
            typeChangeTag = "remove";
        } else if (guidTag != '') {
            typeChangeTag = "add";
        } else {
            typeChangeTag = "addNew";
        }

        dispatch({ type: CHANGE_TAG_REQUEST, payload: { typeChangeTag, curentGuidTag: guidTag } });
        try {

            const response = await authAxios.post(`/?typerequest=${remove ? 'deleteTagsByPhoto' : 'addNewTagsByPhoto'}`, { guidTag, nameTag, guidPhoto: state.curentPhoto.guidFullPhoto });
            const { allArrayTags, arrayTagsByPhoto } = response.data;
            dispatch({ type: CHANGE_TAG_SUCCESS, payload: { allArrayTags, arrayTagsByPhoto } });

        } catch (error) {
            dispatch({ type: CHANGE_TAG_FAILURE, payload: error.toString() });
        }
    }


    const openTags = (photo, navigation) => {


        setFild("curentPhoto", { ...photo });

        getTags(photo);
        navigation.navigate('Tags');

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

    return (<ReceptionContext.Provider value={{
        doctorsSchedule: state.doctorsSchedule,
        doctors: state.doctors,
        loadingDoctorsSchedule: state.loadingDoctorsSchedule,
        loadingDoctorsSchedule: state.loadingDoctorsSchedule,
        errorDoctorsSchedule: state.errorDoctorsSchedule,
        currentPatient: state.currentPatient,
        fDoctor: state.fDoctor,
        fNamePatient: state.fNamePatient,
        fOperating: state.fOperating,
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
        loadingSharefile: state.loadingSharefile,
        loadingChangeFavorite: state.loadingChangeFavorite,

        arrayTagsByPhoto: state.arrayTagsByPhoto,
        allArrayTags: state.allArrayTags,
        errorGetTags: state.errorGetTags,
        loadingTags: state.loadingTags,

        typesGallery: state.typesGallery,

        saveComentLoading: state.saveComentLoading,
        errorComentloading: state.errorComentloading,

        typeChangeTag: state.typeChangeTag,
        errorChangeTag: state.errorChangeTag,
        curentGuidTag: state.curentGuidTag,

        deletePhotoLoading: state.deletePhotoLoading,
        errorDeletePhoto: state.errorDeletePhoto,

        tagName: state.tagName,
        loadingChangeFavoriteError: state.loadingChangeFavoriteError,

        searchTextPatients: state.searchTextPatients,
        listPatients: state.listPatients,
        loadingListPatients: state.loadingListPatients,
        errorloadingListPatients: state.errorloadingListPatients,

        getDoctorsSchedule,
        sort,
        openPatient,
        setFild,
        getServices,
        openPatientGallery,
        getPatientGallery,
        getPhotoSourcesFromId,
        openHTML,
        setPhoto,
        uploadPhoto,
        EditPhoto,
        openService,
        sharePhoto,
        changeFavorite,
        openTags,
        saveComent,
        changeTag,
        deletePhotos,
        getTestConnection,
        executeGetListPatients,
        setSearchTextListPatients,
        changeFavoritePhotoGrid,

    }}>{children}</ReceptionContext.Provider>)

}
