package com.kiwitraffic.NativeModules;

import android.view.View;

import com.facebook.react.bridge.ReactContext;
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

public class GoogleMapAucklandView extends SimpleViewManager<View> {
    private GMapAuckland mapView;
    private ReactContext rctContext;

    @Nonnull
    @Override
    public String getName() {
        return "GoogleMapAucklandView";
    }

    @Nonnull
    @Override
    protected View createViewInstance(@Nonnull ThemedReactContext reactContext) {
        mapView = new GMapAuckland(reactContext);
        mapView.onCreate(null);
        mapView.onResume();
        return mapView;
    }

    @ReactProp(name = "latLng")
    public void setLatLng(MapView view, @Nullable ReadableMap coords) {
        mapView.setLatLng(coords.getDouble("lat"), coords.getDouble("lng"));
    }

    @ReactProp(name = "zoom")
    public void setZoom(MapView view, @Nullable Integer zoom) {
        mapView.setZoom(zoom);
    }

    @ReactProp(name = "polylines")
    public void setPolylines(MapView view, @Nullable ReadableMap polylines) {
        view.getMapAsync( gmap -> {
            mapView.setPolylines(polylines);
        });
    }

    @ReactProp(name = "signs")
    public void setSigns(MapView view, @Nullable ReadableArray signs) {
        mapView.setSigns(signs);
    }

    @ReactProp(name="preRoutes")
    public  void setPreRoutes(MapView view, @Nullable ReadableMap preRoutes){
        view.getMapAsync( gmap -> {
            mapView.setPreRoutes(preRoutes);
        });

    }

    @Nullable
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder().put("onMapReady", MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onMapReady")))
                .build();
    }


}
