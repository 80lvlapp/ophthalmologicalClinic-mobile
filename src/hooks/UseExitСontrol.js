import { Alert } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { BackHandler } from 'react-native';

export default (navigation, hasUnsavedChanges) => {

  const [exit, setExit] = React.useState(false);

  React.useEffect(() => {
    if (exit) {
      navigation.goBack();
    }
  }, [exit])

  const callAlert = () => {
    Alert.alert(
      'Отменить изменения?',
      'У вас есть несохраненные изменения. Покинуть экран?',
      [
        { text: "Остаться", style: 'cancel', onPress: () => { } },
        {
          text: 'Выйти',
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => setExit(true),
        },
      ]
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (hasUnsavedChanges) {
          callAlert();
        }
        return hasUnsavedChanges;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [hasUnsavedChanges])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // title,
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            if (!hasUnsavedChanges) {
              navigation.goBack();
            } else {
              callAlert();
            }
          }

          }
        />
      ),
    });
  }, [navigation, hasUnsavedChanges]);

};