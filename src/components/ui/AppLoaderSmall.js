
import React from 'react'
import { StyleSheet, View, ActivityIndicator} from 'react-native'
import { THEME } from '../../themes'

export const AppLoaderSmall = () => (

    <View style={styles.centre}>
    
        <ActivityIndicator size="large" color={THEME.BUTTON_COLOR} />

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