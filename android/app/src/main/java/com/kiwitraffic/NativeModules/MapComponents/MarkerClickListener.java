package com.kiwitraffic.NativeModules.MapComponents;

import android.content.Context;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.Marker;
import com.kiwitraffic.NativeModules.Utils.ReactUtil;

import java.util.HashMap;

public class MarkerClickListener implements GoogleMap.OnMarkerClickListener {
    private ReactUtil reactUtil;
    private int id;

    public MarkerClickListener(Context c, int i){
        reactUtil = new ReactUtil(c, id);
    }

    public MarkerClickListener(ReactUtil ru){
        reactUtil = ru;
    }


    @Override
    public boolean onMarkerClick(Marker marker) {
        if (!marker.equals(null)) {
            HashMap<String, String> tags = ((HashMap<String, String>) marker.getTag());
            WritableMap eventParams = Arguments.createMap();
            tags.forEach((name, val) -> eventParams.putString(name, val));
            reactUtil.reactNativeEvent("onMarkerClick", eventParams);
        }
        return false;
    }
}
