
import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { THEME } from '../../themes'
import loadImg from '../../assets/load.gif';




export const AppLoader = () => (

    <View style={styles.centre}>
        <Image
            source={require('../../assets/load.gif')}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
        />

    </View>

)


const styles = StyleSheet.create({


    centre: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'


    }
}
)