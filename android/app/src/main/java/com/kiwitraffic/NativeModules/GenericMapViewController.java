package com.kiwitraffic.NativeModules;

import android.view.View;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.google.android.gms.maps.MapView;

import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class GenericMapViewController extends SimpleViewManager<View> {

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
        view.getMapAsync(gMap -> view.setLatLng(coords.getDouble("lat"), coords.getDouble("lng")));
    }

    @ReactProp(name = "zoom")
    public void setZoom(GenericMap view, @Nullable Integer zoom) {
        view.getMapAsync(gMap -> view.setZoom(zoom));
    }

    @ReactProp(name = "data")
    public void setData(GenericMap view, @Nullable ReadableArray data) {
        view.getMapAsync(gMap -> view.setData(data));
    }

    @Nullable
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder().put("onMapReady", MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onMapReady")))
                .put("onMarkerClick", MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onMarkerClick")))
                .build();
    }

}