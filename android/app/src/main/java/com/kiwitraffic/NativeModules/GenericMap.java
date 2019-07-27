package com.kiwitraffic.NativeModules;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MapStyleOptions;
import com.google.android.gms.maps.model.Marker;
import com.kiwitraffic.R;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class GenericMap extends MapView {
    GoogleMap googleMap;
    ReadableArray mapData;

    protected List<Marker> markers = new ArrayList<>();
    protected AssetManager assetManager;

    public GenericMap(Context context) {
        super(context);
        assetManager = context.getAssets();
        this.getMapAsync(gMap -> {
            googleMap = gMap;
            reactNativeEvent("onMapReady", null);
            gMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
                @Override
                public boolean onMarkerClick(Marker marker) {
                    if (marker.getTag() != null) {
                        reactNativeEvent("onMarkerClick", composeMarkerEventParams(marker));
                    }
                    return false;
                }
            });
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

    protected BitmapDescriptor getIcon(String fileName, int width, int height) {
        BitmapDescriptor img = null;
        try {
            Bitmap bt = BitmapFactory.decodeStream(assetManager.open(fileName));
            Bitmap imgResized = Bitmap.createScaledBitmap(bt, width, height, false);
            img = BitmapDescriptorFactory.fromBitmap(imgResized);
        } catch (IOException e) {

        }
        return img;
    }

    protected BitmapDescriptor getIcon(String fileName) {
        return getIcon(fileName, 84, 84);
    }

    protected WritableMap composeMarkerEventParams(Marker marker) {
        HashMap<String, String> tags = ((HashMap<String, String>) marker.getTag());
        WritableMap eventParams = Arguments.createMap();
        tags.forEach((name, val) -> eventParams.putString(name, val));
        return eventParams;
    }
}
