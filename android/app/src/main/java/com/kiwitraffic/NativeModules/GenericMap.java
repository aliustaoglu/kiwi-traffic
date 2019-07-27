package com.kiwitraffic.NativeModules;

import android.content.Context;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MapStyleOptions;
import com.kiwitraffic.R;

public class GenericMap extends MapView {
    GoogleMap googleMap;
    ReadableArray mapData;

    public GenericMap(Context context) {
        super(context);
        this.getMapAsync(gMap -> {
            googleMap = gMap;
            reactNativeEvent("onMapReady", null);
        });
    }

    public void setLatLng(Double lat, Double lng) {
        googleMap.moveCamera(CameraUpdateFactory.newLatLng(new LatLng(lat, lng)));
        googleMap.setMapStyle(MapStyleOptions.loadRawResourceStyle(getContext(), R.raw.night_vision));

    }

    public void setZoom(int zoom) {
        googleMap.moveCamera(CameraUpdateFactory.zoomTo(zoom));
    }

    public void setData(ReadableArray data) {
        mapData = data;
    }

    protected void reactNativeEvent(String eventName, WritableMap eventParams) {
        ReactContext reactContext = (ReactContext) this.getContext();
        reactContext
                .getJSModule(RCTEventEmitter.class)
                .receiveEvent(this.getId(), eventName, eventParams);
    }
}
