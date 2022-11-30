
import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native'
import { Text } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { format } from "date-fns";
import { THEME } from '../../themes'

export const AppInputDate = ({ date, setDate, textStyle, showTime = true }) => {

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    console.log("date", date);

    const nextDayHandler = (direction) => {
        let D = new Date(date);
        D.setDate(D.getDate() + direction);
        setDate(D);
    }

    return (
        <View style={{ flexDirection: 'row' }}>


            <TouchableOpacity onPress={() => {

                nextDayHandler(-1);

            }} >

                <Icon
                    name='arrow-left-bold'
                    size={25}
                    color={THEME.BUTTON_COLOR}
                />
            </TouchableOpacity>


            <TouchableOpacity onPress={showDatepicker} style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>


                <Text style={[styles.text, textStyle]}>{format(date, "dd.MM.yyyy")}</Text>

                <Icon
                    name='calendar-month'
                    size={25}
                    color={THEME.BUTTON_COLOR}
                />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => { nextDayHandler(1) }} >

                <Icon
                    name='arrow-right-bold'
                    size={25}
                    color={THEME.BUTTON_COLOR}
                />
            </TouchableOpacity>


            {show && (
                <DateTimePicker
                    value={date}
                    //minimumDate={Date.parse(new Date())}
                    display={mode === "date" ? "default" : "spinner"}
                    is24Hour={true}
                    mode={mode}
                    onChange={onChange}
                />)}



        </View>
    )

}

const styles = StyleSheet.create({

    datetime: {
        flexDirection: 'row',
        //justifyContent: 'center'
    },

    text: {
        // borderWidth: 0.7,
        //flex:10,
        //   textAlign: 'center',
        //  justifyContent: 'center',
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 6,

        // fontSize: 16,
        // padding: 5,
        //width: 110
        color: THEME.BUTTON_COLOR
    }
}
)