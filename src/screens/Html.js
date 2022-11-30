import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { ReceptionContext } from '../context/reception/ReceptionContext';
import { AppLoaderSmall } from '../components/ui/AppLoaderSmall';
import { WebView } from 'react-native-webview';
import { TextError } from '../components/TextError';

export const Html = ({ navigation, route }) => {

  const { currentHTML, loadingHTML, errorHTML, titleHtml} = React.useContext(ReceptionContext);


  React.useLayoutEffect(() => {
      navigation.setOptions({
        title: titleHtml,
      });     
	}, [titleHtml]);
 
  if (loadingHTML) {
    return <AppLoaderSmall />
  }

  if (errorHTML) {
    return <TextError textError={errorHTML} />
  }

  return (
    <View style={{ flex: 1}}>

      <WebView
       style={titleHtml === "Медицинская карта" ? { width: "150%" }: {width: "100%" }}
        source={currentHTML}
        automaticallyAdjustContentInsets={true}
      />
    </View>
  );
}