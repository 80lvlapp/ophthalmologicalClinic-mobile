import React, { } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { THEME } from '../../themes'

export const AppButton = ({ title, onPress, type, buttonStyle, icon, titleStyle, loadingStyle={}, disabled=false, raised = true}) => {


    return (

        <Button
            icon={icon}
            title={title}
            onPress={onPress}
            buttonStyle={[styles.buttonStyle, buttonStyle]}
            type={type}
            titleStyle = {[styles.titleStyle, titleStyle]}
            raised = {raised}
            disabled = {disabled}
        />

    )
}

const styles = StyleSheet.create(
    {
        buttonStyle: {
           backgroundColor: THEME.BUTTON_COLOR,
           borderRadius: 15,
           marginRight: 10,
           marginTop: 10,
           marginLeft: 15,
           marginBottom: 10
        },
        
        titleStyle: {
            textAlign: 'center',
        },
        


    }
)