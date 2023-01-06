import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';
import DataTable from './../components/DataTable'
import {getTemplate} from './../templates';
import { THEME } from './../themes'

export const MedicalDocument = ({navigation, route}) => {
    
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const template = getTemplate('tableRowsDataDefinitionPhoria');
    const tableRowsData = template.sections[selectedIndex].tableRows;
    const [tableValue, setTableValue] = React.useState({}); 
    const onChangeTextCell = (Fild, newValue) => {
        setTableValue((prevState) => {

            console.log("newValue", newValue);
            console.log("Fild", Fild);
            newState = {...prevState};
            newState[Fild] = newValue;
            return newState;
        })
    }

    React.useLayoutEffect(() => {
		navigation.setOptions({
			title: template.name,
		});
	}, [route, template]);

    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 2 }}>
            <View>
				<ScrollView horizontal={true} style={[styles.contentContainer]} >
					{template.sections.map((item, index) =>
						<View style={styles.wraperSectionsItem} key={item.id} >
							<TouchableOpacity style={[styles.sectionItem, index == selectedIndex ? styles.selectSectionItem : null]} onPress={() =>  setSelectedIndex(index)}>
								<Text numberOfLines={2} style={[styles.doctorItemText, index == selectedIndex ? styles.selectSectionItem : null]}>{item.name}</Text>
							</TouchableOpacity>
						</View>)}
				</ScrollView>
			</View>

       
           <DataTable tableRowsData={tableRowsData} onChangeTextCell={onChangeTextCell} tableValue={tableValue}/>
           
        </View>
        )

}


const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
    },

    wraperSectionsItem: {
        padding: 5,
    },

    sectionItem: {
        borderWidth: 1,
        width: 170,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        padding: 4
    },


    selectSectionItem: {
        backgroundColor: THEME.SELECT_COLOR,
        color: 'white',
        borderWidth: 0
    },
    doctorItemText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black',
        fontSize: 18,
        width: "100%",
        height: "100%",

    },
})