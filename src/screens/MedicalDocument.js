import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { ButtonGroup } from '@rneui/themed'
import { BorderlessButton } from 'react-native-gesture-handler';

export const MedicalDocument = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const tableHead = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3']
    const [tableRowsData, setTableRowsData] = React.useState([[{value: "1", type: 'string' },
    {value: "2", type: 'string' },
    {value: "3", type: 'string' }]]);

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

            <View style={styles.table}>
                <View style={styles.row}>
                    {tableHead.map((item, index) =>
                        <View key={item} style={[styles.cell, index == tableHead.length - 1 ? { borderRightWidth: 1 } : null]}>
                            <Text >{item}</Text>
                        </View>
                    )}
                </View>
                {tableRowsData.map((itemTableRowsData, y) => <View key={y.toString()} style={styles.row}>
                    {itemTableRowsData.map((cellData, x) =>
                    (<View
                        key={x.toString() + "_" + y.toString()}
                        style={[styles.cell, { borderTopWidth: 0 }, x == itemTableRowsData.length - 1 ? { borderRightWidth: 1 } : null]}>
                        <TextInput
                            value={cellData.value} style={styles.textInput}
                            onChangeText={(newValue) => onChangeTextCell(y, x, newValue)} />
                    </View>)
                    )}
                </View>

                )}
            </View>

        </View>

    )

}


const styles = StyleSheet.create({
    subHeader: {
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginBottom: 10
    },
    row: {

        height: 50,
        flexDirection: 'row',
        width: "100%",

        //backgroundColor:'green'
    },

    table: {
        padding: 5,
        flexDirection: 'column',

    },
    cell: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },

    textInput: {
        // height:"100%",
        width: "100%"

    }


})