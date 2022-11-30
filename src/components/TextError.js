import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card} from 'react-native-elements'
export const TextError = ({textError}) => {

  return (

        <Text h4 style={styles.textError}>
        {textError}
      </Text>


  );
};

const styles = StyleSheet.create({
  textError: { color: 'red', margin: 5},
});

