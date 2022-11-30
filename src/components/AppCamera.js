
import { set } from 'date-fns';
import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Vibration, StatusBar } from 'react-native';
import { Image } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Camera,
    useCameraDevices,
    useFrameProcessor,
} from 'react-native-vision-camera';
import { CaptureButton } from './ui/CaptureButton';
// import Reanimated, { } from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { THEME } from '../themes';
//import Orientation from 'react-native-orientation';
import { ReceptionContext } from '../context/reception/ReceptionContext';
import { useFocusEffect } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import Orientation from 'react-native-orientation-locker';

export const AppCamera = ({ route, navigation }) => {

    const { setPhoto, arrayCameraPhoto, setFild } = useContext(ReceptionContext);

    // const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
    const camera = useRef(null);

    useEffect(() => {
        setFild("arrayCameraPhoto", [])
    }, []);

    const [cameraPermission, setCameraPermission] = useState(null);
    const [cameraPosition, setCameraPosition] = useState('back');
    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    const [flash, setFlash] = useState('off');
    //const [currentPhoto, setCurrentPhoto] = useState('');
    const [camLocation, setCamLocation] = useState();
    const [currentOrientation, setCurrentOrientation] = useState("PORTRAIT");

    const devices = useCameraDevices();
    const device = devices[cameraPosition];

    const permisionFunction = async () => {
        // here is how you can get the camera permission
        const cameraReq = await Camera.requestCameraPermission();
        setCameraPermission(cameraReq.status === 'granted');

        if (
            cameraReq !== 'authorized'
        ) {
            alert('Permission for media access needed.');
        }

        console.log(cameraReq);

    };

    useEffect(() => {

        // permisionFunction();
        Orientation.getDeviceOrientation((deviceOrientation) => {
            changeOrientation(deviceOrientation);
        });
        Orientation.addOrientationListener(changeOrientation);
        // Orientation.lockToPortrait();
        return () => {
            // Remember to remove listener
            Orientation.removeOrientationListener(changeOrientation);
        };

    }, []);

    const changeOrientation = (orientationValue) => {

        if (orientationValue === "UNKNOWN") {
            return;
        }

        console.log("orientationValue", orientationValue);
        setCurrentOrientation(orientationValue);

    }

    useFocusEffect(
        React.useCallback(() => {

            // Orientation.getDeviceOrientation((deviceOrientation) => {
            //     console.log("Current Device Orientation: ", deviceOrientation);
            // });



            //Orientation.lockToPortrait();
            permisionFunction();
            console.log("useFocusEffect");

        }, [])
    );



    const onInitialized = useCallback(() => {
        console.log('Camera initialized!');
        setIsCameraInitialized(true);
    }, []);

    const onFlashPressed = useCallback(() => {
        setFlash((f) => (f === 'off' ? 'on' : 'off'));
    }, []);

    // let camera;


    async function takePicture() {

        //Vibration.vibrate([1000, 2000], true);
        Vibration.vibrate(100);

        if (camera) {

            console.log("currentOrientation", currentOrientation);
            const options = { base64: true, flash: flash };
            const data = await camera.current.takePhoto(options);
            // setCurrentPhoto(data.path);
            setFild("arrayCameraPhoto", [...arrayCameraPhoto, {
                fromCamera: true,
                guid: '',
                name: '',
                idFile: uuid.v4(),
                filename: "photo",
                filepath: data.path,
                PixelXDimension: data.metadata["{Exif}"].PixelXDimension,
                PixelYDimension: data.metadata["{Exif}"].PixelYDimension,
                DateTimeDigitized: data.metadata["{Exif}"].DateTimeDigitized,

            }]);

            // console.log(data.metadata["{Exif}"].PixelXDimension);

        }
    }

    const focusTheCamera = (nativeEvent) => {
        setCamLocation({ x: nativeEvent.x, y: nativeEvent.y });
        camera.current?.focus({ x: nativeEvent.x, y: nativeEvent.y }).then(() => {
            console.log('Focus succeeded');
        })
            .catch(reason => {
                console.log('Focus failed!', reason);
            });

        setTimeout(() => {
            setCamLocation(undefined);
        }, 3000);
    }

    if (device == null) return <View />

    // const supportsFlash = device?.hasFlash ?? false;

    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden />
            {/* <Reanimated.View style={StyleSheet.absoluteFill}> */}
            <TapGestureHandler onHandlerStateChange={({ nativeEvent }) => {

                if (device?.supportsFocus) {
                    focusTheCamera(nativeEvent);
                }
            }}>

                <Camera
                    style={StyleSheet.absoluteFill}
                    enableZoomGesture={true}
                    device={device}
                    isActive={true}
                    hdr={true}
                    photo={true}
                    ref={camera}
                    focusable={true}
                    onInitialized={onInitialized}
                // orientation={currentOrientation}
                >

                </Camera>
            </TapGestureHandler>
            {/* </Reanimated.View> */}

            <CaptureButton
                style={currentOrientation === "PORTRAIT" || !currentOrientation ? styles.captureButton : styles.captureButtonLandscape}
                enabled={isCameraInitialized}
                takePicturePress={() => takePicture()}

            />
            <TouchableOpacity onPress={() => navigation.navigate("PhotoSelection")} style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                bottom: 50,
                right: 20

            }}>
                <Text style={currentOrientation === "PORTRAIT" || !currentOrientation ? styles.next : styles.nextLandscape}>Сохранить</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={currentOrientation === "PORTRAIT" || !currentOrientation ? styles.cancleView : styles.cancleViewLandscape}>
                <Text style={currentOrientation === "PORTRAIT" || !currentOrientation ? styles.cancle : styles.cancleLandscape}>Отмена</Text>
            </TouchableOpacity>

            {arrayCameraPhoto.length > 0 && (<View style={currentOrientation === "PORTRAIT" || !currentOrientation ? styles.smallIcon : styles.smallIconLandscape}>

                <Image source={{ uri: 'file://' + arrayCameraPhoto[arrayCameraPhoto.length - 1].filepath }} // Use item to set the image source
                    // key={index} // Important to set a key for list items
                    style={{
                        width: 65,
                        height: 75,
                        borderWidth: 2,
                        borderColor: THEME.MAIN_COLOR,
                        //resizeMode: 'contain',
                        margin: 8
                    }}
                />

            </View>)}



            <View style={currentOrientation === "PORTRAIT" || !currentOrientation ? styles.rightButtonRow : styles.leftButtonRow}>
                <TouchableOpacity style={styles.button} onPress={onFlashPressed} disabledOpacity={0.4}>
                    <IonIcon name={flash === 'on' ? 'flash' : 'flash-off'} color="white" size={24} />
                </TouchableOpacity>
            </View>

            {camLocation ? (
                <View
                    style={[
                        styles.pointOuter,
                        {
                            top: camLocation?.y - 20,
                            left: camLocation?.x - 20,
                        },
                    ]}>
                    <View style={styles.pointCenter} />
                </View>
            ) : null}


        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    captureButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 50,
    },
    captureButtonLandscape: {
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: "40%",
        paddingRight: 25
        //alignItems: 'center'
    },
    button: {
        marginBottom: 15,
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: 'rgba(140, 140, 140, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightButtonRow: {
        position: 'absolute',
        right: 15,
        top: 20,
    },
    leftButtonRow: {
        position: 'absolute',
        left: 15,
        top: 20,
    },
    pointOuter: {
        width: 40,
        height: 40,
        padding: 15,
        position: 'absolute',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 9999,
    },
    pointCenter: {
        width: 8,
        height: 8,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 9999,
    },
    next: {

        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 30,
        bottom: 30

    },
    nextLandscape: {

        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        //bottom: "20%",
        right: 10,
        position: 'absolute',
        paddingTop: 30,
        bottom: 5,
        paddingBottom: 15

    },
    cancle: {

        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 30,
        bottom: 30

    },
    cancleLandscape: {

        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        //bottom: "20%",
        // right: 10,
        // position: 'absolute',
        // paddingTop: 30,
        // bottom: 5,
        // paddingBottom: 15

    },
    cancleView: {

        position: 'absolute',
        alignSelf: 'flex-start',
        bottom: 50,
        left: 20

    },
    cancleViewLandscape: {

        position: 'absolute',
        alignSelf: 'flex-start',
        top: 70,
        right: 30

    },
    smallIcon: {
        position: 'absolute',
        alignSelf: 'flex-start',
        bottom: 125,
        left: 10
    },
    smallIconLandscape: {
        position: 'absolute',
        alignSelf: 'flex-start',
        bottom: 20,
        left: 10
    }
})
