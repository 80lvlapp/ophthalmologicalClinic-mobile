import React from 'react';
import { MainLayout } from './src/MainLayout';
import { AppState } from './src/context/app/AppState'
import { ReceptionState } from './src/context/reception/ReceptionState'
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Footer} from './src/components/Footer'



export default function App() {
  return (
    <AppState>
      <ReceptionState>

        <GestureHandlerRootView style={{ flex: 1 }}>
          <MainLayout/>
          <Footer/>
        </GestureHandlerRootView>

      </ReceptionState>
    </AppState>
  );
}
