import { View, FlatList, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import React, { memo, useCallback, useEffect, useState, useContext } from 'react'
import ImageComponent from 'react-native-fast-image'
import { ReceptionContext } from '../context/reception/ReceptionContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const MARGIN = 1
import { EmptyListMessage } from '../components/EmptyListMessage';
import { THEME } from '../themes';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { LinearProgress } from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';


export const PhotoGrid = ({ navigation, route }) => {

  const { loadingPatientGallery, patientGallery, errorpatientGallery, getPhotoSourcesFromId, currentPatient,
    getPatientGallery, setFild, typesGallery, deletePhotos, changeFavorite, loadingChangeFavorite, deletePhotoLoading,
    loadingSharefile, sharePhoto, changeFavoritePhotoGrid } = useContext(ReceptionContext);
  const [itemHeight, setItemHeight] = useState(0);

  React.useLayoutEffect(() => {

    let title = "";

    if (typesGallery == "PatientGallery") {
      title = 'Галерея пациента';
    }
    else if (typesGallery == "PatientServiceGallery") {
      title = 'Галерея пациента по услуге';
    }
    else if (typesGallery == "PatientFavoritesGallery") {
      title = 'Галерея пациента (до и после)';
    }
    else {
      title = '';
    }

    navigation.setOptions({
      title
    });
  }, [route, typesGallery]);


  const onLayout = useCallback((e) => {

    const height = e.nativeEvent.layout.height

    setItemHeight(height)
  }, [])

  const renderItem = useCallback(
    ({ item, index }) => {
      let content = <ImageGridItem index={index} id={item.uri} ImageComponent={ImageComponent} sourceImg={item} />
      return content;
    },
    [ImageComponent, patientGallery]
  )

  const extractKey = useCallback((item, index) => {

    return item.uri;

  }, [])



  const createAlertDeletePhotos = (itemsImage) =>
    Alert.alert(
      "Удалить фото?",
      "",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },

        { text: "OK", onPress: () => deletePhotos(itemsImage) }

      ]
    );

  const ImageGridItem = ({ sourceImg, index }) => {

    const [progressState, setProgressState] = useState(0);

    let newItem = { ...patientGallery[index] };

    return (
      <View
        style={{
          flex: 1,

          alignItems: 'stretch',

        }}
      >

        <TouchableOpacity onPress={() => {

          console.log(index);
          setFild("indexpatientGallery", index);
          navigation.navigate('Gallery')
        }}

          onLongPress={() => {

            newItem.select = !newItem.select;
            console.log(newItem.select);

            const newPatientGallery = patientGallery.map((element, indexPatientGallery) => { return (indexPatientGallery == index ? newItem : element) });

            console.log(newPatientGallery);

            setFild("patientGallery", newPatientGallery);
          }}
          style={{ flex: 1 }}
        >

          <ImageComponent
            resizeMode={ImageComponent.resizeMode.contain}
            source={sourceImg}
            style={{
              flex: 1,
              width: null,
              height: null,
              margin: MARGIN,
              backgroundColor: 'black'
            }}

            key={sourceImg.uri}

            onLoadStart={() =>
              setProgressState(0)
            }
            onProgress={(e) => {

              if (typesGallery != "PatientFavoritesGallery") {
                return;
              }

              const p = Number((e.nativeEvent.loaded / e.nativeEvent.total).toFixed(1));

              if (p != progressState) {
                console.log(p);
                setProgressState(p);
              }

            }}

            onLoadEnd={() => { setProgressState(1) }}

            onError={(e) => console.log("Ошибка")}

          />

          {newItem.select == true && (<MaterialCommunityIcons style={{ zIndex: 1000, position: 'absolute', top: 20, right: 20 }}
            name='check-circle' size={30} color={THEME.MAIN_COLOR} />)}

          {typesGallery != "PatientFavoritesGallery" && newItem.IncludedInFavoriteGallery && <AntDesignIcon style={{ zIndex: 1000, position: 'absolute', top: 20, left: 20 }}
            name='star' size={30} color={"white"} />}


          {typesGallery != "PatientFavoritesGallery" && !newItem.IncludedInFavoriteGallery && <AntDesignIcon style={{ zIndex: 1000, position: 'absolute', top: 20, left: 20 }}
            name='staro' size={30} color={"white"} />}


        </TouchableOpacity>

        {(progressState !== undefined && progressState != 1 && typesGallery === "PatientFavoritesGallery") && <LinearProgress color="primary" variant='determinate' value={progressState} style={{ height: 10 }} />}


      </View>
    )
  }


  return (<View
    style={{
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: 'black',
    }}>

    <FlatList
      onLayout={onLayout}
      style={{
        flex: 1,
      }}
      columnWrapperStyle={[
        {
          flex: 1,
          flexDirection: 'row',
          marginLeft: -MARGIN,
          marginRight: -MARGIN,

        },
        { height: patientGallery.length < 3 ? itemHeight : itemHeight / 2 },
      ]}
      data={getPhotoSourcesFromId(patientGallery, typesGallery == 'PatientFavoritesGallery' ? 'guidFullPhoto' : 'guidPreview')}
      renderItem={renderItem}
      refreshing={loadingPatientGallery}
      numColumns={2}
      keyExtractor={extractKey}
      onRefresh={() => getPatientGallery()}

      ListEmptyComponent={<EmptyListMessage loading={loadingPatientGallery} />}

    />


    {patientGallery.find(item => item.select) && < View
      style={{
        position: "absolute",
        width: "100%",
        flexDirection: 'row',
        zIndex: 1,
        bottom: 0,
        height: 40,
        backgroundColor: "#00000077",
        alignItems: "center",
        alignContent: "space-between",
        justifyContent: "space-around",

        flex: 1
      }}
    >



      <TouchableOpacity
        onPress={() => {

          const newPatientGallery = patientGallery.map(element => { return { ...element, select: true } });
          setFild("patientGallery", newPatientGallery);

        }}>
        <MaterialCommunityIcons

          name='checkbox-multiple-marked-outline'
          size={25}
          color={"white"}
        />
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => {
          const newPatientGallery = patientGallery.map(element => { return { ...element, select: false } });
          setFild("patientGallery", newPatientGallery);

        }}>

        <MaterialCommunityIcons

          name='checkbox-multiple-blank-outline'
          size={25}
          color={"white"}
        />
      </TouchableOpacity>

      {typesGallery != "PatientFavoritesGallery" && !deletePhotoLoading && <TouchableOpacity
        onPress={() => { createAlertDeletePhotos(patientGallery.filter(item => item.select)) }}>
        <MaterialCommunityIcons
          name='file-image-remove'
          size={25}
          color={"white"}
        />
      </TouchableOpacity>}

      {deletePhotoLoading && <ActivityIndicator
        size="large"
        color="white" />}


      {!loadingChangeFavorite && <TouchableOpacity
        onPress={() => {
          if (typesGallery === "PatientFavoritesGallery") {
            changeFavorite(patientGallery.filter(item => item.select), true);
          } else {
            changeFavoritePhotoGrid(patientGallery.filter(item => item.select), true);
          }

        }}>
        <AntDesignIcon

          name='star'
          size={25}
          color={"white"}
        />
      </TouchableOpacity>}


      {loadingChangeFavorite && <ActivityIndicator
        size="large"
        color="white" />}

      {!loadingChangeFavorite && <TouchableOpacity
        onPress={() => {
          if (typesGallery === "PatientFavoritesGallery") {

            changeFavorite(patientGallery.filter(item => item.select), false);

          } else {

            Alert.alert(
              "Очистить галерею до и после?",
              "",
              [
                {
                  text: "Отмена",
                  style: "cancel"
                },

                { text: "OK", onPress: () => changeFavoritePhotoGrid([], false) }

              ]);
          }
        }}>

        <AntDesignIcon

          name={typesGallery === "PatientFavoritesGallery" ? "staro" : "delete"}
          size={25}
          color={"white"}
        />
      </TouchableOpacity>}


      {loadingChangeFavorite && <ActivityIndicator
        size="large"
        color="white" />}

      {!loadingSharefile && <TouchableOpacity onPress={() => sharePhoto(patientGallery.filter(item => item.select))}>
        <FontAwesome5Icon
          name='share-alt'
          size={25}
          color={"white"}
        />
      </TouchableOpacity>}

      {loadingSharefile && <ActivityIndicator
        size="large"
        color="white" />}


    </View>}


  </View>)

}



