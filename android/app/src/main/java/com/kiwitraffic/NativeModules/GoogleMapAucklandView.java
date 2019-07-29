package com.kiwitraffic.NativeModules;

import android.view.View;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.google.android.gms.maps.MapView;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class GoogleMapAucklandView extends GenericMapViewController {
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

    @ReactProp(name = "polylines")
    public void setPolylines(MapView view, @Nullable ReadableMap polylines) {
        view.getMapAsync(gmap -> {
            mapView.setPolylines(polylines);
        });
    }

    @ReactProp(name = "signs")
    public void setSigns(MapView view, @Nullable ReadableArray signs) {
        view.getMapAsync(gmap -> mapView.setSigns(signs));
    }

    @ReactProp(name = "preRoutes")
    public void setPreRoutes(MapView view, @Nullable ReadableMap preRoutes) {
        view.getMapAsync(gmap -> {
            mapView.setPreRoutes(preRoutes);
        });
    }

    @ReactProp(name = "mapReducer")
    public void setMapReducer(MapView view, @Nullable ReadableMap mapReducer) {

            mapView.setMapReducer(mapReducer);

    }


}
