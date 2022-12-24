import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { ButtonGroup } from '@rneui/themed'
import DataTable from './../components/DataTable'


export const MedicalDocument = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
   
    const tableHead = ['', 'sph', 'cyl', 'axº', 'vls']
    const [tableRowsData, setTableRowsData] = React.useState([
        [{ value: "д/дал PD= мм", type: 'text'}, { value: "1", type: 'input' },{ value: "2", type: 'input' },{ value: "3", type: 'input' }, { value: "3", type: 'input' }], 
        [{ value: "OD", type: 'text'}, { value: "1", type: 'input' },{ value: "2", type: 'input' },{ value: "3", type: 'input' }, { value: "3", type: 'input' }],
        [{ value: "OS", type: 'text'}, { value: "1", type: 'input' },{ value: "2", type: 'input' },{ value: "3", type: 'input' }, { value: "3", type: 'input' }],
        [{ value: "д/бл PD=мм", type: 'text' }, { value: "1", type: 'input' },{ value: "2", type: 'input' },{ value: "3", type: 'input' }, { value: "3", type: 'input' }],
        [{ value: "OD", type: 'text' }, { value: "1", type: 'input' },{ value: "2", type: 'input' },{ value: "3", type: 'input' }, { value: "3", type: 'input' }],
        [{ value: "OS", type: 'text' }, { value: "1", type: 'input' },{ value: "2", type: 'input' },{ value: "3", type: 'input' }, { value: "", type: '' }],
        [{ value: "Монофокальные / Бифокальные / PAL / add D", type: 'text' }, { value: "1", type: 'input' },{ value: "2", type: 'input' },{ value: "3", type: 'input' }, { value: "2", type: 'input' }],
          
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
                buttons={['Очки пациента', 'Кератометрия', 'Определение фории']}
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