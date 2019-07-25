package com.kiwitraffic.NativeModules;

import android.view.View;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.google.android.gms.maps.MapView;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class GenericMapViewController  extends SimpleViewManager<View>{

    @Nonnull
    @Override
    public String getName() {
        return null;
    }

    @Nonnull
    @Override
    protected View createViewInstance(@Nonnull ThemedReactContext reactContext) {
        MapView mapView = new MapView(reactContext);
        mapView.onCreate(null);
        mapView.onResume();
        return mapView;
    }


    @ReactProp(name = "latLng")
    public void setLatLng(GenericMap view, @Nullable ReadableMap coords) {
        view.setLatLng(coords.getDouble("lat"), coords.getDouble("lng"));
    }

    @ReactProp(name = "zoom")
    public void setZoom(GenericMap view, @Nullable Integer zoom) {
        view.setZoom(zoom);
    }

}