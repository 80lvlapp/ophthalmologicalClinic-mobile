import {
    SCHEDULE_REQUEST,
    SCHEDULE_SUCCESS,
    SCHEDULE_FAILURE,
    SET_FILD,
    SERVICES_REQUEST,
    SERVICES_SUCCESS,
    SERVICES_FAILURE,
    DOCTORSSCHEDULE_SORT,
    PATIENT_GALLERY_REQUEST,
    PATIENT_GALLERY_SUCCESS,
    PATIENT_GALLERY_FAILURE,
    GET_HTML_REQUEST,
    GET_HTML_FAILURE,
    GET_HTML_SUCCESS,
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

} from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ReceptionReducer = (state, action) => {

    console.log("action///////////////////", action);
    let newState = { ...state };

    switch (action.type) {
        case SET_FILD:

            newState[action.payload.fild] = action.payload.value;
            if (action.payload.fild == 'fDoctor') {
                newState.firstOpen = false;
            }
            return newState
        case SCHEDULE_REQUEST:
            return { ...state, errorDoctorsSchedule: "", loadingDoctorsSchedule: true, doctorsSchedule: [] }
        case SCHEDULE_SUCCESS:
            if (state.firstOpen) {
                return {
                    //если пользолватель не менял доктора то обновляем его текущим значение из сервера
                    ...state,
                    loadingDoctorsSchedule: false,
                    doctorsSchedule: action.payload.doctorsSchedule,
                    doctors: action.payload.doctors,
                    fDoctor: action.payload.currentEmployee.guid,
                    firstOpen: false
                }
            } else {
                return {
                    ...state,
                    loadingDoctorsSchedule: false,
                    doctorsSchedule: action.payload.doctorsSchedule,
                    doctors: action.payload.doctors
                }
            }
        case SCHEDULE_FAILURE:
            return { ...state, errorSchedule: action.payload, loadingDoctorsSchedule: false }
        case SERVICES_REQUEST:
            return { ...state, errorServices: "", loadingServices: true, services: [], patientParameters: [] }
        case SERVICES_SUCCESS:
            return { ...state, loadingServices: false, services: action.payload.services, patientParameters: action.payload.patientParameters }
        case SERVICES_FAILURE:
            return { ...state, loadingServices: false, sererrorServicesvices: action.payload }
        case SERVICE_DATA_REQUEST:
            return { ...state, errorDataService: "", loadingDataService: true, dataService: {}, errorComentloading: "", saveComentLoading: false }
        case SERVICE_DATA_SUCCESS:
            return { ...state, loadingDataService: false, dataService: action.payload }
        case SERVICE_DATA_FAILURE:
            return { ...state, loadingDataService: false, errorDataService: action.payload }
        case DOCTORSSCHEDULE_SORT:
            return { ...state, doctorsSchedule: action.payload.doctorsSchedule, fildSort: action.payload.fildSort }
        case PATIENT_GALLERY_REQUEST:
            return { ...state, errorpatientGallery: "", loadingPatientGallery: true, patientGallery: [] }
        case PATIENT_GALLERY_SUCCESS:
            return { ...state, loadingPatientGallery: false, patientGallery: action.payload }
        case PATIENT_GALLERY_FAILURE:
            return { ...state, loadingPatientGallery: false, errorpatientGallery: action.payload }
        case GET_HTML_REQUEST:
            return { ...state, loadingHTML: true, errorHTML: '', currentHTML: null, titleHtml: action.payload }
        case GET_HTML_SUCCESS:
            return { ...state, currentHTML: action.payload, loadingHTML: false }
        case GET_HTML_FAILURE:
            return { ...state, errorHTML: action.payload, loadingHTML: false }
        case OPEN_PATIENT:
            return { ...state, currentPatient: action.payload.patient, currentMedicalCard: action.payload.medicalCard }

        case OPEN_SERVICE:
            return { ...state, currentService: action.payload.service }

        case ADD_PHOTO:
            newState.arrayPhoto = action.payload.photo;
            return newState;
        case REMOVE_PHOTO:
            newState.arrayPhoto = newState.arrayPhoto.filter(item => item.filepath != action.payload.filepath);
            return newState;
        case DOWNLOAD_EDIPHOTO_REQUEST:
            newState.loadingEditFile = true;
            newState.errorploadingSharefile = "";
            return newState;
        case DOWNLOAD_EDIPHOTO_FAILURE:
            newState.loadingEditFile = false;
            return newState
        case DOWNLOAD_EDIPHOTO_SUCCESS:
            newState.loadingEditFile = false;
            newState.errorploadingEditFile = action.payload;
            return newState;

        case SHARE_EDIPHOTO_REQUEST:
            newState.loadingSharefile = true;
            newState.errorploadingSharefile = "";
            return newState;
        case SHARE_EDIPHOTO_FAILURE:
            newState.loadingSharefile = false;
            return newState
        case SHARE_EDIPHOTO_SUCCESS:
            newState.loadingSharefile = false;
            newState.errorploadingSharefile = action.payload;
            return newState;

        case CHANGE_FAVORITE_REQUEST:
            newState.loadingChangeFavorite = true;
            newState.loadingChangeFavoriteError = "";
            return newState;
        case CHANGE_FAVORITE_SUCCESS:
            newState.loadingChangeFavorite = false;
            newState.patientGallery = state.patientGallery.map(item => {
                if (action.payload.imageItems.find(itemF => itemF.guidFullPhoto == item.guidFullPhoto)) {
                    return { ...item, IncludedInFavoriteGallery: action.payload.IncludedInFavoriteGallery }
                } else {
                    return item
                }
            })

            return newState
        case CLEARE_FAVORITE_SUCCESS:

            newState.loadingChangeFavorite = false;
            newState.patientGallery = state.patientGallery.map(item => {

                return { ...item, IncludedInFavoriteGallery: false }

            })

            return newState

        case CHANGE_FAVORITE_FAILURE:
            newState.loadingChangeFavorite = false;
            newState.loadingChangeFavoriteError = action.payload;
            return newState;

        case GET_TAGS_REQUEST:
            return { ...state, loadingTags: true, errorGetTags: '', arrayTagsByPhoto: [], allArrayTags: [], typeChangeTag: '', curentGuidTag: '', tagName: '' }
        case GET_TAGS_SUCCESS:
            return { ...state, arrayTagsByPhoto: action.payload.arrayTagsByPhoto, allArrayTags: action.payload.allArrayTags, loadingTags: false }
        case GET_TAGS_FAILURE:
            return { ...state, errorGetTags: action.payload, loadingTags: false }
        case SAVE_COMENT_REQUEST:
            newState.saveComentLoading = true;
            newState.errorComentloading = "";
            return newState;
        case SAVE_COMENT_SUCCESS:
            newState.saveComentLoading = false;
            newState.dataService.historyComments = [action.payload, ...state.dataService.historyComments,];
            return newState;
        case SAVE_COMENT_FAILURE:
            newState.saveComentLoading = false;
            newState.errorComentloading = action.payload;
            return newState;
        case CHANGE_TAG_REQUEST:
            newState.errorChangeTag = "";
            newState.typeChangeTag = action.payload.typeChangeTag;
            newState.curentGuidTag = action.payload.curentGuidTag;

            return newState;
        case CHANGE_TAG_SUCCESS:
            newState.allArrayTags = action.payload.allArrayTags;
            newState.arrayTagsByPhoto = action.payload.arrayTagsByPhoto;
            newState.tagName = '';
            newState.typeChangeTag = '';
            newState.curentGuidTag = '';

            return newState;
        case CHANGE_TAG_FAILURE:
            newState.typeChangeTag = '';
            newState.errorChangeTag = action.payload;
            newState.curentGuidTag = '';
            return newState;
        case DELETE_PHOTO_REQUEST:
            newState.deletePhotoLoading = true;
            newState.loadingPatientGallery = true;

            newState.errorDeletePhoto = "";
            return newState;
        case DELETE_PHOTO_SUCCESS:
            newState.loadingPatientGallery = false;
            newState.deletePhotoLoading = false;
            newState.patientGallery = newState.patientGallery.filter((item) => {
                if (action.payload.result.find(itemF => itemF == item.guidFullPhoto) == undefined) {
                    return true;
                } else {
                    return false;
                }
            }
            )

            let index = Math.min(action.payload.index, (newState.patientGallery.length - 1));
            index = Math.max(index, 0);
            newState.indexpatientGallery = index;
            return newState;

        case DELETE_PHOTO_FAILURE:
            newState.deletePhotoLoading = false;
            newState.loadingPatientGallery = false;
            newState.errorDeletePhoto = action.payload;
            return newState;

        case GET_LIST_PATIENTS_REQUEST:
            return { ...state, loadingListPatients: true, errorloadingListPatients: '' }
        case GET_LIST_PATIENTS_SUCCESS:

            if (state.searchTextPatients == action.payload.searchTextPatients) {
                return { ...state, listPatients: [...action.payload.data], loadingListPatients: false, errorloadingListPatients: '' }
            }
            else {
                return state;
            }

        case GET_LIST_PATIENTS_FAILURE:
            return { ...state, loadingListPatients: false, errorloadingListPatients: action.payload }

        case SET_SEARCHTEXT_PATIENTS:
            return { ...state, searchTextPatients: action.payload }

        default:
            return state
    }
}
