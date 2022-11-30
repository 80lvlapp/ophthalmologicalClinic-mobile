package com.medicalappointment;

import com.facebook.react.ReactActivity;

import android.content.Intent;//react-native-orientation-locker
import android.content.res.Configuration;//react-native-orientation-locker

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "medicalappointment";
  }

  ////react-native-orientation-locker
   @Override
   public void onConfigurationChanged(Configuration newConfig) {
       super.onConfigurationChanged(newConfig);
       Intent intent = new Intent("onConfigurationChanged");
       intent.putExtra("newConfig", newConfig);
       this.sendBroadcast(intent);
   }

}
