import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { ButtonGroup } from '@rneui/themed'
import DataTable from './../components/DataTable'


export const MedicalDocument = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const tableHead = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3']
    const [tableRowsData, setTableRowsData] = React.useState([
        [{ value: "1", type: 'string' },{ value: "2", type: 'string' },{ value: "3", type: 'string' }], 
        [{ value: "1", type: 'string' },{ value: "2", type: 'string' },{ value: "3", type: 'string' }]
    ]);
    
    const onChangeTextCell = (y, x, newValue) => {
        setTableRowsData((prevState) => {
            newState = Object.assign([], prevState);
            newState[y] = newState[y].map((item, index) => {
                if (index == x) {
                    return { ...item, value: newValue }
                } else {
                    return item;
                }
            })
            return newState;
        })
    }
    
    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 2 }}>
            <ButtonGroup
                buttons={['SIMPLE', 'BUTTON', 'GROUP']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />

        <DataTable tableHead={tableHead} tableRowsData={tableRowsData} onChangeTextCell={onChangeTextCell} />

        </View>

    )

}


const styles = StyleSheet.create({
})