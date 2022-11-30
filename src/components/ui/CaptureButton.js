import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Reanimated, {
    cancelAnimation,
    Easing,
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    withSpring,
    withTiming,
    useAnimatedGestureHandler,
    useSharedValue,
    withRepeat,
} from 'react-native-reanimated';

export const CaptureButton = ({
    style,
    enabled,
    takePicturePress,
    ...props
}) => {
    const isPressingButton = useSharedValue(false);

    const shadowStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    scale: withSpring(isPressingButton.value ? 1 : 0, {
                        mass: 1,
                        damping: 35,
                        stiffness: 300,
                    }),
                },
            ],
        }),
        [isPressingButton],
    );

    const buttonStyle = useAnimatedStyle(() => {
        let scale;
        if (enabled) {
            if (isPressingButton.value) {
                scale = withRepeat(
                    withSpring(1, {
                        stiffness: 100,
                        damping: 1000,
                    }),
                    -1,
                    true,
                );
            } else {
                scale = withSpring(0.9, {
                    stiffness: 500,
                    damping: 300,
                });
            }
        } else {
            scale = withSpring(0.6, {
                stiffness: 500,
                damping: 300,
            });
        }

        return {
            opacity: withTiming(enabled ? 1 : 0.3, {
                duration: 100,
                easing: Easing.linear,
            }),
            transform: [
                {
                    scale: scale,
                },
            ],
        };
    }, [enabled, isPressingButton]);

    const takePictureStart = () => {

        isPressingButton.value = true;

    };

    const takePictureEnd = () => {

        isPressingButton.value = false;
        takePicturePress();

    }

    return (

         <Reanimated.View {...props} style={[buttonStyle, style]}>
            <TouchableOpacity onPressIn={takePictureStart} onPressOut={takePictureEnd}>

                <Reanimated.View style={styles.flex}>
                    <Reanimated.View style={[styles.shadow, shadowStyle]} />
                    <View style={styles.button} />
                </Reanimated.View>
            </TouchableOpacity>

         </Reanimated.View>

    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    shadow: {
        position: 'absolute',
        width: 78,
        height: 78,
        borderRadius: 78 / 2,
        backgroundColor: '#e34077',
    },
    button: {
        width: 78,
        height: 78,
        borderRadius: 78 / 2,
        borderWidth: 7.8,
        borderColor: 'white',
    },
});
