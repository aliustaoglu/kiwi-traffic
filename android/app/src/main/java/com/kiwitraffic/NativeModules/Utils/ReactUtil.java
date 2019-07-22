package com.kiwitraffic.NativeModules.Utils;

import android.content.Context;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class ReactUtil {
    private Context reactContext;
    private int id;

    public ReactUtil(Context c, int i) {
        reactContext = c;
        id = i;
    }

    private WritableMap composeMarkerEventParams(String markerType) {
        WritableMap event = Arguments.createMap();
        event.putString("markerType", markerType);
        return event;
    }

    public void reactNativeEvent(String eventName, WritableMap eventParams) {
        ReactContext reactContext = (ReactContext) this.reactContext;
        reactContext
                .getJSModule(RCTEventEmitter.class)
                .receiveEvent(this.id, eventName, eventParams);
    }
}
