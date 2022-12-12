import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import PatientItem from './PatientItem';
import { ReceptionContext } from '../../context/reception/ReceptionContext';
import {SearchBar } from 'react-native-elements';
import { THEME } from '../../themes';

export const PatientList = ({ navigation, route}) => {

  const {loadingListPatients, executeGetListPatients, setSearchTextListPatients
    , searchTextPatients, listPatients, openPatient} = React.useContext(ReceptionContext);

  const [onReach, setOnReach] = React.useState(false);

  const onEndReachedHendler = ({ distanceFromEnd }) => {
    if (!onReach) {
      return;
    }
    executeGetListPatients(true);

  }

  React.useEffect(() => {
    setSearchTextListPatients("");
  }, []);

  const selectPatient = (item) => {
    openPatient(item.patient, item.medicalCard, navigation)
}
 
  const renderPatientItem = ({ item }) => {
    return (
      <PatientItem
        name = {item.name}
        medicalCard = {item.medicalCard}
        dateOfBirth = {item.dateOfBirth}
        yearsOld = {item.yearsOld}

        patientSelection={() => {
          selectPatient(item);
        }
        }

      />
    );
  };


  return (
    <View style={styles.list}>

      <FlatList
        data={listPatients}
        keyExtractor={(item, index) => item.guid}
        renderItem={renderPatientItem}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReachedHendler}
        //onMomentumScrollBegin={() => { setOnReach(true) }}

        stickyHeaderIndices={[0]}
        ListHeaderComponent={(
          <SearchBar
            placeholder="Введите текст мин. 4 симв."
            onChangeText={value => setSearchTextListPatients(value)}
            value={searchTextPatients}
            lightTheme
            showLoading 
            inputContainerStyle = {{backgroundColor:"white", borderWidth: 1}}
            containerStyle={{backgroundColor:"white"}}

            loadingProps={{
              animating: loadingListPatients,
              color: THEME.MAIN_COLOR,
            }}
          />
        )}
       />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {

      backgroundColor: 'white',
      flex: 1

  }
});

export default PatientList;