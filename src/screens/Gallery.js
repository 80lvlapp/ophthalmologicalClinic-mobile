import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Alert } from "react-native";
import ImageView from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { ReceptionContext } from '../context/reception/ReceptionContext';
import { ListItem, Card } from 'react-native-elements';
import { THEME } from '../themes';
import { EmptyListMessage } from '../components/EmptyListMessage';
import GestureRecognizer from 'react-native-swipe-gestures';

export const Gallery = ({ navigation, route }) => {

  const { patientGallery, getPhotoSourcesFromId, setFild, indexpatientGallery, EditPhoto, sharePhoto, loadingEditFile, loadingSharefile, loadingChangeFavorite, changeFavorite, openTags, loadingChangeFavoriteError, deletePhotoLoading, deletePhotos } = useContext(ReceptionContext);
  const imageUrls = getPhotoSourcesFromId(patientGallery, "guidFullPhoto");
  const [viewMetadata, setViewMetada] = useState(false);

  useEffect(() => {
    if (loadingChangeFavoriteError != "") {
      Alert.alert(loadingChangeFavoriteError);
      setFild("loadingChangeFavoriteError", "")
    }
  },
    [loadingChangeFavoriteError])

  const createThreeButtonAlert = (itemImage, index) =>
    Alert.alert(
      "Удалить фото?",
      "",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },

        { text: "OK", onPress: () => deletePhotos([itemImage], index)  }

      ]
    );

  const ImageFooter = (currentIndex) => {

    const itemImage = patientGallery[currentIndex];

    if (!itemImage) {
      return (<></>)
    }

    return (

      <View style={styles.root}>

        <View style={{  position: "absolute",
       width: "100%",
       flexDirection: 'row',
        zIndex: 1,
        alignItems: "center",
        alignContent: "space-between",
        justifyContent: "space-around",
        
        flex:1}}>

          {!loadingEditFile && <TouchableOpacity

            onPress={() => EditPhoto(itemImage)} >
            <MaterialCommunityIcons
              name='image-edit'
              size={25}
              color={"white"}
            />

          </TouchableOpacity>}


          {loadingEditFile && <ActivityIndicator
            size="large"
            color="white" />}

          {!loadingSharefile && <TouchableOpacity onPress={() => sharePhoto([itemImage])}>
            <Icon
              name='share-alt'
              size={25}
              color={"white"}
            />
          </TouchableOpacity>}

          {loadingSharefile && <ActivityIndicator
            size="large"
            color="white" />}

          {loadingChangeFavorite == false && <TouchableOpacity onPress={() => { changeFavorite([itemImage],!itemImage.IncludedInFavoriteGallery) }}>
            {!itemImage.IncludedInFavoriteGallery && <AntDesignIcon

              name='staro'
              size={25}
              color={"white"}
            />}

            {itemImage.IncludedInFavoriteGallery && <AntDesignIcon

              name='star'
              size={25}
              color={"white"}
            />}


          </TouchableOpacity>}

          {loadingChangeFavorite && <ActivityIndicator
            size="large"
            color="white" />}


          <TouchableOpacity onPress={() => openTags(itemImage, navigation)}>
            <MaterialCommunityIcons
              name='pound'
              size={30}
              color={"white"}
            />
          </TouchableOpacity>

          {!deletePhotoLoading && <TouchableOpacity
            onPress={() => {createThreeButtonAlert(itemImage, currentIndex) }}>

            <MaterialCommunityIcons
              name='file-image-remove'
              size={25}
              color={"white"}
            />
          </TouchableOpacity>}

          {deletePhotoLoading && <ActivityIndicator
            size="large"
            color="white" />}

          <TouchableOpacity onPress={() => setViewMetada(true)}>
            <MaterialCommunityIcons
              name='information'
              size={30}
              color={"white"}
            />
          </TouchableOpacity>

        </View>

        {viewMetadata && <View style={{ width: '100%', height: 215 }}>
          <Card>
            <View style={{ flexDirection: 'row' }}>
              {/* <Card.Title style={{ textAlignVertical: 'center', fontSize: 15, fontWeight: 'bold', marginRight: 20 }}>Метаданные</Card.Title> */}
              <Text>
                {itemImage.metadata}
              </Text>
              <View style={{ marginRight: 0, marginLeft: 'auto' }}>
                <TouchableOpacity onPress={() => setViewMetada(false)}>
                  <MaterialCommunityIcons
                    name="close"
                    size={25}
                    color={THEME.MAIN_COLOR}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Card.Divider />

          </Card>
        </View>}
      </View>

    )
  };

  if (imageUrls.length == 0) {
    return (<EmptyListMessage loading={false} />)
  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <ImageView
      index={indexpatientGallery}

      imageUrls={imageUrls}
      presentationStyle="overFullScreen"
      onRequestClose={() => { navigation.navigate('PhotoGrid') }}
      onSwipeDown={() => {
        navigation.navigate('PhotoGrid');
      }}
      renderFooter={ImageFooter}

      enableImageZoom={true}
      enableSwipeDown={true}
      enablePreload = {true}

      footerContainerStyle={{
        position: "absolute",
        width: "100%",
        zIndex: 1,
        bottom: 0,
      }}
    />
    // </GestureRecognizer>
  )
};

const styles = StyleSheet.create({
  root: {
    height: 64,
    backgroundColor: "#00000077",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 17,
    color: "#FFF"
  }
});