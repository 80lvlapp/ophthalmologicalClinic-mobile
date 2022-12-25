import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { ButtonGroup } from '@rneui/themed'
import DataTable from './../components/DataTable'
import {THEME} from './../themes'

export const MedicalDocument = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const [tableRowsDataPatientGlasses, setTableRowsDataPatientGlasses] = React.useState([
        [{ value: "", type: 'text', colspan: 0.4,    padding: 0, fontWeight: 'bold',  color: 'black', textAlignVertical:'bottom', textAlign:'center'},
        { value: 'sph', type: 'text', colspan: 1,  padding: 0, fontWeight: 'bold',  color: 'black', textAlignVertical:'bottom', textAlign:'center' },
        { value: 'cyl', type: 'text', colspan: 1,  padding: 0, fontWeight: 'bold',  color: 'black', textAlignVertical:'bottom', textAlign:'center' },
        { value: 'axº', type: 'text', colspan: 1,  padding: 0, fontWeight: 'bold',  color: 'black', textAlignVertical:'bottom', textAlign:'center' },
        { value: 'vls', type: 'text', colspan: 1,  padding: 0, fontWeight: 'bold',  color: 'black', textAlignVertical:'bottom', textAlign:'center' }],
        
        [{ value: "д/дал PD= мм", type: 'text', colspan: 1,  padding: 1, fontWeight: 'bold',  color: THEME.GREY_COLOR, textAlignVertical:'center', textAlign:'left'}],

        [{ value: "OD", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: "1", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],
        [{ value: "OS", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],
    
        [{ value: "д/бл PD=мм", type: 'text', colspan: 1,  padding: 1, fontWeight: 'bold',  color:THEME.GREY_COLOR, textAlignVertical:'center', textAlign:'left'}],

        [{ value: "OD", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],
        [{ value: "OS", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: '', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'left' }],
       
        [{ value: "pall ADD", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold', color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],
    ]);

    const [tableRowsDataKeratometry, setTableRowsDataKeratometry] = React.useState([
        [{ value: 'OD', type: 'text', colspan: 4,  padding: 4, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: 'OS', type: 'text', colspan: 4,  padding: 4, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'center' }],
        
        [{ value: "K1", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "AX1", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right'  },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "K1", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right'  },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "AX1", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right'  },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],

        [{ value: "K2", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "AX2", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right'  },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "K2", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right'  },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "AX2", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right'  },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],

        [{ value: "AVE", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: '', colspan: 0.3,  padding: 2, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'left'  },
        { value: "", type: '', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'left' },
        { value: "AVE", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right'  },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: '', colspan: 0.3,  padding: 2, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'left'  },
        { value: "", type: '', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'left' }],
 
    ]);


    const [tableRowsDataEyeResearch, setTableRowsDataEyeResearch] = React.useState([
        [{ value: '', type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: 'Пневмотонометрия и тонометрия по Маклакову', type: 'text', colspan: 2,  padding: 4, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: 'Оптическая биометрия / Ультразвуковая биометрия', type: 'text', colspan: 2,  padding: 4, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: 'Оптическая биометрия / Ультразвуковая биометрия', type: 'text', colspan: 2,  padding: 4, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'center'},
        ],
        [{ type: '', colspan: 0.3,  padding: 2, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'left' },
        { value: "Пневмотонометрия", type: 'text', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "Тонометрия по Маклакову", type: 'text', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "Передняя камера (мм)", type: 'text', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "Хрусталик (мм)", type: 'text', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "ПЭК", type: 'text', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "ЦТР", type: 'text', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],

        [{ value: "OD", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],
        
        [{ value: "OS", type: 'text', colspan: 0.3,  padding: 2, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: "", type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],

    ]);


    const [tableRowsDataDefinitionPhoria, setTableRowsDefinitionPhoria] = React.useState([
        
        [{ value: '', type: 'text', colspan: 1,  padding: 4, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: 'В очковой коррекции', type: 'text', colspan: 1,  padding: 4, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: 'В контактной коррекции', type: 'text', colspan: 1,  padding: 4, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'center' }],

        [{ value: "Maddox Wing", type: 'text', colspan: 1,  padding: 4, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: '', type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: '', type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],

        [{ value: "c add", type: 'text', colspan: 1,  padding: 4, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: '', type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: '', type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],
        
        [{ value: "АК/А", type: 'text', colspan: 1,  padding: 4, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: '', type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: '', type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],

        [{ value: "Фузионные резервы", type: 'text', colspan: 1,  padding: 4, fontWeight: 'bold',  color: 'black', textAlignVertical:'center', textAlign:'right' },
        { value: '', type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' },
        { value: '', type: 'input', colspan: 1,  padding: 4, fontWeight: 'normal',  color: 'black', textAlignVertical:'center', textAlign:'center' }],

    ]);

    const onChangeTextCellPatientGlasses = (y, x, newValue) => {
        onChangeTextCell(y, x, newValue, setTableRowsDataPatientGlasses);
    }

    const onChangeTextCellKeratometry = (y, x, newValue) => {
        onChangeTextCell(y, x, newValue, setTableRowsDataKeratometry);
    }

    const onChangeTextCellEyeResearch = (y, x, newValue) => {
        onChangeTextCell(y, x, newValue, setTableRowsDataEyeResearch);
    }

    const onChangeDefinitionPhoria = (y, x, newValue) => {
        onChangeTextCell(y, x, newValue, setTableRowsDefinitionPhoria);
    }


    const onChangeTextCell = (y, x, newValue, setTableRowsData) => {
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
                buttons={['Очки пациента', 'Кератометрия', 'Исследования глаза', 'Определение фории']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />

            {selectedIndex == 0 && <DataTable  tableRowsData={tableRowsDataPatientGlasses} onChangeTextCell={onChangeTextCellPatientGlasses} />}
            {selectedIndex == 1 && <DataTable  tableRowsData={tableRowsDataKeratometry} onChangeTextCell={onChangeTextCellKeratometry} />}
            {selectedIndex == 2 && <DataTable  tableRowsData={tableRowsDataEyeResearch} onChangeTextCell={onChangeTextCellEyeResearch} />}
            {selectedIndex == 3 && <DataTable  tableRowsData={tableRowsDataDefinitionPhoria} onChangeTextCell={onChangeDefinitionPhoria} TableWidth={"80%"}/>}

        </View>

    )

}


const styles = StyleSheet.create({
})