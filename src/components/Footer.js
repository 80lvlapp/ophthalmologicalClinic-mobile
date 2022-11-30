import React from "react";
import { View } from "react-native";
import { LinearProgress } from 'react-native-elements';
import { ReceptionContext } from '../context/reception/ReceptionContext';

export const Footer = ({ }) => {

  const { arrayPhoto } = React.useContext(ReceptionContext);

  if (arrayPhoto.length == 0) {
    return <></>;
  }

  return (

   <LinearProgress

      style={{
        position: "absolute",
        width: "100%",
        zIndex: 1,
        bottom: 0,
      }}
      color="primary" />
  );
};

