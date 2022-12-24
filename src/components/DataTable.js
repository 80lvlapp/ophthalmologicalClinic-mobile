import React from "react";
import { View, StyleSheet, TextInput, Text} from "react-native";

const DataTable = ({tableHead, tableRowsData, onChangeTextCell}) => {

  return (
    <View style={styles.table}>
      <View style={styles.row}>
        {tableHead.map((item, index) =>
          <View key={item} style={[styles.cell, (index == tableHead.length - 1)?styles.borderRight:null]}>
            <Text >{item}</Text>
          </View>
        )}
      </View>
      {tableRowsData && tableRowsData.map((itemTableRowsData, y) => <View key={y.toString()} style={styles.row}>
        {itemTableRowsData.map((cellData, x) =>
        (<View
          key={x.toString() + "_" + y.toString()}
          style={[styles.cellData, (x == itemTableRowsData.length - 1)?styles.borderRight:null]}
          >
          <TextInput
            value={cellData.value} 
            style={styles.textInput}
            onChangeText={(newValue) => onChangeTextCell(y, x, newValue)} 
          />

        </View>)
        )}
      </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  row: {
    height: 50,
    flexDirection: 'row',
    width: "100%",
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
  cellData: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderLeftWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },

  borderRight:{
    borderRightWidth: 1 
  },

  textInput: {
    width: "100%",
    height: "100%"
  }
})


export default DataTable