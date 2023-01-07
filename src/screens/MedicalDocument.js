import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import DataTable from './../components/DataTable'
import { getTemplate } from './../templates';
import { THEME } from './../themes'
import { ReceptionContext } from '../context/reception/ReceptionContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppLoaderSmall } from '../components/ui/AppLoaderSmall';
import { Button } from 'react-native-elements';
export const MedicalDocument = ({ navigation, route }) => {

    const { id, guid } = route.params;

    const { curentGuidService, getDataMedicalDocumentData, saveMedicalDocument } = React.useContext(ReceptionContext);
    const inputKey = `${curentGuidService}-medicalDocument`;

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [load, setLoad] = React.useState(true);
    const [saved, setSaved] = React.useState(false);

    const template = getTemplate(id);
    const tableRowsData = template.sections[selectedIndex].tableRows;
    const [tableValue, setTableValue] = React.useState({});
    const onChangeTextCell = (Fild, newValue) => {
        setTableValue((prevState) => {
            newState = { ...prevState };
            newState[Fild] = newValue;
            AsyncStorage.setItem(inputKey, JSON.stringify(newState));
            return newState;
        })
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: template.name,
        });
    }, [route, template]);

    React.useEffect(() => {

        async function restoreTableValue() {
            let TableValueStorage = await AsyncStorage.getItem(inputKey);
            TableValueStorage = null;
            if (TableValueStorage) {
                setTableValue(JSON.parse(TableValueStorage));
            } else if (guid) {
                try {
                    const response = await getDataMedicalDocumentData(guid);
                    setTableValue(response.data.medicalDocumentData);
                } catch (error) {
                }
            }
            setLoad(false);
        }
        restoreTableValue();
    }, [])


    const handlerSaveMedicalDocument = async () => {
        
        setSaved(true);
        try {
           const response = await saveMedicalDocument(id, curentGuidService, tableValue);
        } catch (error) {
        }
        setSaved(false);
    }

    if (load) {
        return (<AppLoaderSmall />);
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 2 }}>
           
          

            <View>
                <ScrollView horizontal={true} style={[styles.contentContainer]} >
                    {template.sections.map((item, index) =>
                        <View style={styles.wraperSectionsItem} key={item.id} >
                            <TouchableOpacity style={[styles.sectionItem, index == selectedIndex ? styles.selectSectionItem : null]} onPress={() => setSelectedIndex(index)}>
                                <Text numberOfLines={2} style={[styles.doctorItemText, index == selectedIndex ? styles.selectSectionItem : null]}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>)}
                </ScrollView>
            </View>


            <DataTable tableRowsData={tableRowsData} onChangeTextCell={onChangeTextCell} tableValue={tableValue} />

            <View style={styles.buttonSave}>
                < Button loading={saved} title={"Сохранить"} onPress={() => { handlerSaveMedicalDocument() }} />
            </View>

        </View>
    )

}


const styles = StyleSheet.create({

    buttonSave: {
        padding:40,
    flexDirection: 'column',
    justifyContent: 'flex-end',

    //height: '80%'
    },

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