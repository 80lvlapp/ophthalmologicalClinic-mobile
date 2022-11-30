import { ListItem, Button } from 'react-native-elements'
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { AppButton } from '../../components/ui/AppButton';
//import DefaultText from './DefaultText';

const PatientItem = props => {
  return (

    <ListItem bottomDivider onPress={props.patientSelection} >
      
      <ListItem.Content>

        <ListItem.Title  >
          {props.name}
        </ListItem.Title>

        <ListItem.Subtitle style={{ fontSize: 10, fontFamily: 'Roboto', fontWeight: "bold" }}>
          Медицинская карта: {props.medicalCard.name + "\n"} 
          Дата рождения: {props.dateOfBirth} Возрвст: {props.yearsOld}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />

    </ListItem>


  );
};

const styles = StyleSheet.create({

});

export default PatientItem;