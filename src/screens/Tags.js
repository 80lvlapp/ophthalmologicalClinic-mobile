import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, ListItem, SearchBar, Text, Divider } from 'react-native-elements';
import { TextError } from '../components/TextError';
import { ReceptionContext } from '../context/reception/ReceptionContext';
import { THEME } from '../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Tags = ({ navigation, route }) => {

    const { loadingTags, arrayTagsByPhoto, allArrayTags, tagName, setFild, typeChangeTag, errorChangeTag, changeTag, curentGuidTag } = useContext(ReceptionContext);


    const [isFocused, setIsFocused] = React.useState(false);

    const inputRef = useRef(null);
    const TagsByPhotoRef = useRef(null);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Теги',
        });
    }, []);


    React.useEffect(()=>{
        setIsFocused(false);
    }, [arrayTagsByPhoto])


    if (loadingTags) {
        return <View />
    }



    const renderItemSelect = ({ item }) => (

        <ListItem key={item.guid} 
        bottomDivider 
        topDivider 
        //containerStyle={{ flex: 1 }} 
        onPress={() => changeTag(item.guid)} >
            <ListItem.Content>
                <ListItem.Subtitle>{item.name}</ListItem.Subtitle>


            </ListItem.Content>

            {typeChangeTag == 'add' && curentGuidTag == item.guid &&
                <ActivityIndicator
                    size="large"
                    color={THEME.BUTTON_COLOR} />
            }

        </ListItem>
    );

    const renderItem = ({ item }) => (
        <ListItem.Swipeable key={item.guid}
            bottomDivider topDivider
            containerStyle={{ flex: 1 }}
            leftContent={
                <Button
                    title="Удалить"
                    loading={typeChangeTag == 'remove'}
                    icon={{ name: 'delete', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                    onPress={() => {

                        changeTag(item.guid, '', true)

                    }

                    }
                />

            }


        >
            <Fontisto name="hashtag" />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem.Swipeable>
    );


    return (
        <View style={{ flex: 1 }}>


            <View style={{ flexDirection: 'column' }}>
                <SearchBar
                    ref={inputRef}
                    placeholder="Наименование тега"
                    onChangeText={value => setFild("tagName", value)}
                    value={tagName}
                    lightTheme
                    showLoading
                    inputContainerStyle={{ backgroundColor: "white", borderWidth: 1 }}
                    containerStyle={{ backgroundColor: "white", width: "100%" }} Is
                    onFocus={() => setIsFocused(true)}
                   // onBlur={() => setTimeout(() => {
                       // setIsFocused(false)
                    //}, 2000)}

                    loadingProps={{
                        animating: false,
                        color: THEME.MAIN_COLOR,
                    }}
                />
              {(tagName != '' && !allArrayTags.find(item =>
                    item.name.trim().toLowerCase() == tagName.trim().toLowerCase())) && <Button
                    iconRight
                        icon={
                            <Ionicons
                                name="add-circle-sharp"
                                size={25}
                                color= {"white"}
                            />}
                        title={tagName}
                      //  type={"outline"}
                        loading={typeChangeTag == 'addNew'}
                        onPress={() => {
                            changeTag("", tagName)

                            setIsFocused(false);
                            inputRef.current.blur();
                        }
                        }
                        containerStyle={{ margin: 5 }}
                        buttonStyle={{
                       //     backgroundColor: THEME.BUTTON_COLOR,
                         //   margin: 2,
                         //   justifyContent: 'flex-start'
                        }}
                    />}


        {isFocused && <Button

iconRight            
icon={
    <MaterialCommunityIcons
        name="cancel"
        size={25}
        color= {THEME.BUTTON_COLOR}
    />}
                        title={"Отмена"}
                        type="outline"
                        loading={typeChangeTag == 'addNew'}
                        onPress={() => {
                           
                            setFild("tagName", "");
                            inputRef.current.blur();
                            setIsFocused(false);
                            
                        }
                        }
                      containerStyle={{ margin: 5}}
                    
                    />}    

                {errorChangeTag != '' && <TextError textError={errorChangeTag} />}

            </View>

            {(tagName || isFocused) && <FlatList
                data={allArrayTags.filter(item =>

                    (tagName != '' && item.name.trim().toLowerCase().includes(tagName.trim().toLowerCase()) || (isFocused && tagName == ''))

                    && !arrayTagsByPhoto.find(itemF => itemF.guid == item.guid))}
                renderItem={renderItemSelect}
                keyExtractor={(item, index) => item.guid}
                ListEmptyComponent={<View></View>}
            />}

            {!(tagName || isFocused) && <FlatList
                ref={TagsByPhotoRef}
                style={{ marginTop: 10 }}
                data={arrayTagsByPhoto}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.guid}
            />}

        </View>
    );

}
