import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card, ListItem, Input, Image, Text, Divider, Button } from 'react-native-elements';
import { ReceptionContext } from '../context/reception/ReceptionContext';
import { THEME } from '../themes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconDoctor from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TextError } from '../components/TextError';
import uuid from 'react-native-uuid';
import { useFocusEffect } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';


export const PatientService = ({ navigation, route }) => {

    const [groupIsOpen, setGroupIsOpen] = React.useState(false);
    const { currentPatient, arrayPhoto, setPhoto, currentService, setFild, dataService, openHTML, loadingDataService, errorDataService, openPatientGallery, saveComentLoading, errorComentloading, saveComent } = useContext(ReceptionContext);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: currentService.nomenclature.name,
            headerTitleStyle: {
                fontSize: 13,
            },
        });

    }, [route]);

    useEffect(() => {


        console.log(currentService);


    }, []);

    // useFocusEffect(
    //     React.useCallback(() => {

    //         Orientation.unlockAllOrientations();

    //     }, [])

    // );

    const loadFoto = arrayPhoto.find(item => item.guidServiceRef == currentService.service.guid) != undefined;

    if (loadingDataService) {
        return <ActivityIndicator
            size="large"
            color={THEME.BUTTON_COLOR} />
    }

    { errorDataService && <TextError textError={errorDataService} /> }

    const photoRemoveHandler = (key) => {

    }

    const captureImage = async (type) => {

        navigation.navigate('AppCamera');
    }

    const chooseFile = (type) => {

        launchImageLibrary({

            title: 'Select Image',
            mediaType: 'photo',
            // includeBase64: true,
            selectionLimit: 0,

        }, (response) => { // Use launchCamera to open camera
            // console.log('Response = ', response);

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

                // navigation.navigate("PatientService");
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

                    containerStyle={{ marginTop: 10}}


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
                        //2 width: 300,
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

                <Card.Divider style = {{marginTop: 10}}/>



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
                        //2 width: 300,
                        marginVertical: 5,
                    }}
                    onPress={() => captureImage('photo')}
                    title = " Сделать фото" />



                {/* <View style={{ flexDirection: 'row', width: "100%", marginTop: 10, justifyContent: "center" }}>
                    <TouchableOpacity >
                        <Icon name='camera' onPress={() => captureImage('photo')} size={150} color={THEME.MAIN_COLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.2 }}>
                        <Icon name='image' onPress={() => chooseFile('photo')} size={50} color={THEME.MAIN_COLOR} />
                    </TouchableOpacity>
                </View> */}

                {/* <Swipeable
                    renderLeftActions={() => <View><Text>Тест</Text></View>}
                    onSwipeableOpen = {()=> console.log("Произошел свайп")}
                    >
                        
                    <ListItem key={"1"} bottomDivider onPress={()=> console.log("on press")}>
                        <ListItem.Content>
                            <ListItem.Title>Заголовок</ListItem.Title>
                            <ListItem.Subtitle>Текст</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </Swipeable> */}

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
