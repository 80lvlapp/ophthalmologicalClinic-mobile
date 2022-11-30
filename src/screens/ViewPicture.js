import React from "react";
import {StyleSheet, Text} from "react-native";
import {Image } from 'react-native-elements';

export const ViewPicture = ({navigation, route}) => {

  
  return (
    <Image source={{uri:route.params.uri}} // Use item to set the image source
    // key={index} // Important to set a key for list items
    style={{
      height: "100%",
      margin: 8
    }}
   
   // PlaceholderContent={<ActivityIndicator />}
  />
   );

};

const styles = StyleSheet.create({  text: {

}, });


export default ViewPicture