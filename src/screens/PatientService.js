import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { Card, ListItem, Input, Image, Text, Divider, Button } from 'react-native-elements';
import { ReceptionContext } from '../context/reception/ReceptionContext';
import { THEME } from '../themes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconDoctor from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextError } from '../components/TextError';
import uuid from 'react-native-uuid';
import { launchCamera } from 'react-native-image-picker';

const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs camera permission',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    } else return true;
};

const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'External Storage Write Permission',
                    message: 'App needs write permission',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            alert('Write permission err', err);
        }
        return false;
    } else return true;
};



export const PatientService = ({ navigation, route }) => {

    const [groupIsOpen, setGroupIsOpen] = React.useState(false);
    const {uploadPhoto, currentPatient, arrayPhoto, setPhoto, currentService, setFild, dataService, openHTML, loadingDataService, errorDataService, openPatientGallery, saveComentLoading, errorComentloading, saveComent } = useContext(ReceptionContext);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: currentService.nomenclature.name,
            headerTitleStyle: {
                fontSize: 13,
            },
        });

    }, [route]);


    const captureImage = async () => {

        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera({
                saveToPhotos: true,
                mediaType: 'photo',
                includeBase64: false,
            }, (response) => {

                if (response.didCancel) {
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    return;
                } else if (response.errorCode == 'permission') {
                    return;
                } else if (response.errorCode == 'others') {
                    return;
                }

                console.log(response);
                const photoItem = {
                    uri:response.assets[0].uri,
                    guidService: currentService.guidService,
                    guidServiceRef: currentService.service.guid,
                    guidPatient: currentPatient.guid,
                };

                uploadPhoto(photoItem, ()=>{}, ()=>{});

            });
        }
    };

    const loadFoto = arrayPhoto.find(item => item.guidServiceRef == currentService.service.guid) != undefined;

    if (loadingDataService) {
        return <ActivityIndicator
            size="large"
            color={THEME.BUTTON_COLOR} />
    }

    { errorDataService && <TextError textError={errorDataService} /> }

    const chooseFile = (type) => {

        launchImageLibrary({

            title: 'Select Image',
            mediaType: 'photo',
            selectionLimit: 0,

        }, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                setPhoto(response.assets.map(itiem => {
                    return {
                        guid: '',
                        name: '',
                        fromCamera: false,
                        idFile: uuid.v4(),
                        filename: "photo",
                        filepath: itiem.uri.replace('file://', '')
                    }
                }))
            }
        });

    }

    return (
        <ScrollView>

            <View style={{ backgroundColor: "white", padding: 5, }}>

                <Text style={{ textAlign: 'center', fontSize: 18 }}>{currentPatient.name}</Text>

                <View style={{ flexDirection: 'row', alignContent: "flex-start", marginTop: 10 }}>

                    <TouchableOpacity onPress={() => openPatientGallery(navigation, "PatientServiceGallery")} style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'column', alignItems: "center" }}>
                            {!loadFoto && <Icon
                                name='images'
                                size={30}
                                color={THEME.BUTTON_COLOR}
                            />}

                            {loadFoto && <ActivityIndicator
                                size="large"
                                color={THEME.BUTTON_COLOR} />}

                            <Text h7 style={{ fontSize: 10 }}>Галерея</Text>
                        </View>


                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { chooseFile('photo') }} style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'column', alignItems: "center" }}>
                            <Icon name='image' size={30} color={THEME.MAIN_COLOR} />
                            <Text h7 style={{ fontSize: 10 }}>Загрузить фото</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        openHTML(navigation, {
                            typeHTML: "emd",
                            guidMedicalDocument: dataService.medicalDocument.guid
                        }, 'Медицинский документ')
                    }} style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'column', alignItems: "center" }}>
                            <IconDoctor
                                name='doctor'
                                size={30}
                                color={THEME.BUTTON_COLOR}
                            />
                            <Text h5 style={{ fontSize: 10 }}>Мед. документ</Text>
                        </View>
                    </TouchableOpacity>


                </View>

                <Divider />

                <Input
                    containerStyle={{ marginTop: 10 }}
                    label='Комментарий'
                    value={dataService.comment}
                    onChangeText={(comment) => setFild("dataService", { ...dataService, comment })}
                    multiline={true}
                />

                <Button
                    title="Сохранить комментарий"
                    buttonStyle={{
                        backgroundColor: THEME.BUTTON_COLOR,
                        borderRadius: 5,
                        marginTop: 5,
                        marginBottom: 20

                    }}
                    containerStyle={{
                        marginVertical: 5,
                    }}
                    onPress={() => saveComent(navigation)}

                    loading={saveComentLoading}

                />

                <ListItem.Accordion

                    content={
                        <>
                            <ListItem.Content>
                                <ListItem.Title>История комментариев</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={groupIsOpen}
                    onPress={() => { setGroupIsOpen((prev) => { return !prev }) }}

                    containerStyle={{ margin: 0, padding: 0 }}
                >
                    {dataService.historyComments.map((itemStor, i) => (
                        <ListItem key={itemStor.date} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{itemStor.date} {itemStor.author}</ListItem.Title>
                                <ListItem.Subtitle>{itemStor.comment}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>))}

                </ListItem.Accordion>

                <Card.Divider style={{ marginTop: 10 }} />

                {(errorComentloading != "") && <TextError textError={errorComentloading} />}

                <Button type="solid"
                    icon={
                        <Icon
                            name="camera"
                            size={22}
                            color="white"
                        />}
                    buttonStyle={{
                        backgroundColor: THEME.BUTTON_COLOR,
                        borderRadius: 5,
                        marginTop: 10
                    }}
                    containerStyle={{
                        marginVertical: 5,
                    }}
                    onPress={() => captureImage('photo')}
                    title=" Сделать фото" />



            </View>

        </ScrollView >

    );

}

const styles = StyleSheet.create({

    inputContainer: {
        width: 400,
        marginLeft: 5,
        marginRight: 5,

    },

    titleStyle: {
        fontSize: 15,
        color: '#9c9c9c'
    },

    valueStyle: {
        fontSize: 15,
        color: '#9c9c9c'

    },

});
