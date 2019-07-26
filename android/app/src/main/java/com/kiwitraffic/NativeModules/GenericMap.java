package com.kiwitraffic.NativeModules;

import android.content.Context;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.model.LatLng;

public class GenericMap extends MapView {
    public GenericMap(Context context) {
        super(context);
        this.getMapAsync(gMap -> {
            reactNativeEvent("onMapReady", null);
        });
    }

    public void setLatLng(Double lat, Double lng) {
        this.getMapAsync(gMap -> {
            gMap.moveCamera(CameraUpdateFactory.newLatLng(new LatLng(lat, lng)));
        });
    }

    public void setZoom(int zoom) {
        this.getMapAsync(gMap -> {
            gMap.moveCamera(CameraUpdateFactory.zoomTo(zoom));
        });
    }

    protected void reactNativeEvent(String eventName, WritableMap eventParams) {
        ReactContext reactContext = (ReactContext) this.getContext();
        reactContext
                .getJSModule(RCTEventEmitter.class)
                .receiveEvent(this.getId(), eventName, eventParams);
    }
}
