import React from "react";
import { StyleSheet, Text } from "react-native";
export const EmptyListMessage = ({loading}) => {
  return (

    <Text style={styles.emptyListStyle}>
      {!loading && "Нет данных"}
    </Text>
  );
};

const styles = StyleSheet.create({
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#CCCCCC'
  },
});
