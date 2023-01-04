import React from 'react';
import { ListItem } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const ScheduleElement = ({ item, onPress }) => {
   return (
        <ListItem key={item.guid} onPress={() => { onPress(item) }}
            bottomDivider
            topDivider
            containerStyle={{ backgroundColor: item.backgroundColor }}>

            <View style={styles.icons}>
                {item.visitRegistered && <IconFontisto
                    name={"check"}
                    size={20}
                    color={item.color ? item.color : null}
                />}
                {item.additionalServiceParameters.ГлазаЗакапаны && <FontAwesome
                    name={"eyedropper"}
                    size={20}
                    color={item.color ? item.color : null}
                />}
            </View>

            <ListItem.Content>
                <ListItem.Title style={{ color: item.color ? item.color : null }}>
                    {item.timeOfReceipt} {item.presentationPatient}
                </ListItem.Title>
                <ListItem.Subtitle style={{ color: item.color ? item.color : null }}>
                    {item.nomenclature.name}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )
};


const styles = StyleSheet.create(
    {
        icons: {
            flexDirection: 'column'
        }
    }
)
