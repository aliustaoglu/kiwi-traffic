package com.kiwitraffic.NativeModules;

import android.view.View;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.google.android.gms.maps.MapView;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class ChristchurchMapViewController extends GenericMapViewController {

    @Nonnull
    @Override
    public String getName() {
        return "ChristchurchMapViewController";
    }

    @Nonnull
    @Override
    protected View createViewInstance(@Nonnull ThemedReactContext reactContext) {
        ChristchurchMap mapView = new ChristchurchMap(reactContext);
        mapView.onCreate(null);
        mapView.onResume();
        return mapView;

    }

    @ReactProp(name = "roadworks")
    public void setRoadworks(ChristchurchMap view, @Nullable ReadableArray roadworks) {
        view.getMapAsync(gmap -> {
            view.setRoadworks(roadworks);
        });
    }
}
