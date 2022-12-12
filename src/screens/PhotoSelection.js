import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { ReceptionContext } from '../context/reception/ReceptionContext';
import { Image } from 'react-native-elements';
import { AppButton } from '../components/ui/AppButton';
import { THEME } from '../themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Orientation from 'react-native-orientation-locker';

export const PhotoSelection = ({ navigation, route }) => {

    const { arrayCameraPhoto, setPhoto, setFild } = useContext(ReceptionContext);

    const okOnPress = () => {
        setPhoto(arrayCameraPhoto);
        navigation.pop(2);
    }

    const cancelOnPress = () => {
        navigation.pop(2);
    }

    const removePhoto = (item) => {

        const newArray = arrayCameraPhoto.filter((photo) => (photo.idFile != item.idFile));

        setFild("arrayCameraPhoto", newArray);

    }

    const renderItem = (item) => {

        return (
            <View style={{

                flexDirection: 'row'
            }}>
                <TouchableOpacity style={{ paddingHorizontal: 4, marginTop: 1, zIndex: 1000, position: 'absolute', top: -4, right: -4 }}>
                    <Icon name='close' onPress={() => removePhoto(item)} size={50} color={THEME.MAIN_COLOR} />
                </TouchableOpacity>

                <Image source={{ uri: 'file://' + item.filepath }}
                    PlaceholderContent={<ActivityIndicator />}
                    style={{
                        margin: 8,
                        width: Dimensions.get('window').width - 20,
                        height: 400
                    }}
                />
            </View>
        );

    }

    return (

        <View style={{
            flex: 1,
        }}>

            <FlatList
                data={arrayCameraPhoto}
                keyExtractor={(item, index) => item.idFile}
                renderItem={({ item, index }) => renderItem(item)}
            />

            <View style={styles.buttons}>
                <View style={styles.button}>

                    <AppButton
                        buttonStyle={[styles.buttonStyle, {width: 200}]}
                        raised={false}
                        disabled = {!arrayCameraPhoto.length}
                        title={"Прикрепить"} onPress={okOnPress} />

                </View>
                <View style={styles.button}>
                    <AppButton
                        buttonStyle={[styles.buttonStyle, {width: 100}]}
                        raised={false}
                        title={"Отмена"} onPress={cancelOnPress} />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create(
    {

        buttons: {

            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,

        },
        button: {
           // width: '40%'

        },
        buttonStyle: {
            borderRadius: 15,
            marginRight: 10,
            marginTop: 5,
            marginLeft: 10,
            marginBottom: 10
        }

    }
)

