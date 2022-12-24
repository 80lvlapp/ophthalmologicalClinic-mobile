import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const DataTable = ({ tableHead, tableRowsData, onChangeTextCell }) => {

  return (
    <View style={styles.table}>
      <View style={styles.row}>
        {tableHead.map((item, index) =>
          <View key={item} style={[styles.cell, styles.bigText]}>
            <Text style={[styles.bigText]}>{item}</Text>
          </View>
        )}
      </View>
      {tableRowsData && tableRowsData.map((itemTableRowsData, y) => <View key={y.toString()} style={styles.row}>
        {itemTableRowsData.map((cellData, x) =>
        (<View
          key={x.toString() + "_" + y.toString()}
          style={[styles.cellData]}
        >
          {cellData.type == "input" && <TextInput
            value={cellData.value}
            style={styles.textInput}
            onChangeText={(newValue) => onChangeTextCell(y, x, newValue)}
          />}

          {cellData.type == "text" && <Text style={[styles.text, styles.bigText]}>
            {cellData.value}
          </Text>
          }

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
  },


  bigText: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold' 
    },

  cellData: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderStyle: 'solid',
    padding: 3
  },

  borderRight: {
    // borderRightWidth: 1 
  },

  textInput: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    color: 'black'
  },

  text: {
    width: "100%",
    height: "100%",
    borderWidth: 0,
    color: 'black'
  }

})


export default DataTable