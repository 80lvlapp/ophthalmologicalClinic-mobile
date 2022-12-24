import React from "react";
import { View, StyleSheet, TextInput, Text, } from "react-native";

const DataTable = ({ tableRowsData, onChangeTextCell, TableWidth }) => {

  return (

    <View style={styles.tableСontainer}>
      <View style={[styles.table, {width: TableWidth }]}>



        {tableRowsData && tableRowsData.map((itemTableRowsData, y) => <View key={y.toString()} style={styles.row}>
          {itemTableRowsData.map((cellData, x) =>
          (<View
            key={x.toString() + "_" + y.toString()}
            style={[styles.cellData, {flex: cellData.colspan, padding: cellData.padding}]}
          >
            {cellData.type == "input" && <TextInput
              value={cellData.value}
              style={[styles.textInput, {textAlign: cellData.textAlign}]}
              keyboardType='numeric'
              autoComplete={'cc-number'}
              onChangeText={(newValue) => onChangeTextCell(y, x, newValue)}
            />}

            {cellData.type == "text" &&
              <Text style={[styles.text, cellData.bold ? styles.boldText : null,
              {
                color: cellData.color,
                textAlign: cellData.textAlign,
                textAlignVertical: cellData.textAlignVertical,
                fontWeight: cellData.fontWeight
              }]}>
                {cellData.value}
              </Text>
            }

          </View>)
          )}
        </View>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  table: {
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center'
  },

  tableСontainer: {
    width: "100%",
    flexDirection: 'column',
    alignItems: 'center'
  },

  row: {
    flexDirection: 'row',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },

  cellData: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  },

  textInput: {
    width: "100%",
    height: "100%",
    borderWidth: 0.5,
    color: 'black',
    fontSize: 20,
    borderRadius:3,
  },

  text: {
    width: "100%"
  }

})


export default DataTable