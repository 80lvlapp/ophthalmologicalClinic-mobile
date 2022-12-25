import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup } from '@rneui/themed'
import DataTable from './../components/DataTable'
import {getTemplate} from './../templates';

export const MedicalDocument = () => {
    
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const template = getTemplate('tableRowsDataDefinitionPhoria');
    const tableRowsData = template[selectedIndex].tableRows;
    const [tableValue, setTableValue] = React.useState({}); 
    const onChangeTextCell = (Fild, newValue) => {
        setTableValue((prevState) => {
            newState = {...prevState};
            newState[Fild] = newValue;
            return newState;
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 2 }}>

            <ButtonGroup
                buttons={template.map(item=>item.name)}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />

           <DataTable tableRowsData={tableRowsData} onChangeTextCell={onChangeTextCell} tableValue={tableValue}/>
           
        </View>
        )

}


const styles = StyleSheet.create({

})