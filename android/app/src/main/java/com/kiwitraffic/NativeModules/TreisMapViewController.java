package com.kiwitraffic.NativeModules;

import android.graphics.Color;
import android.view.View;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.google.android.gms.maps.MapView;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class TreisMapViewController extends GenericMapViewController {

    @Nonnull
    @Override
    public String getName() {
        return "TreisMapViewController";
    }

    @Nonnull
    @Override
    protected MapView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        MapView mapView = new TreisMap(reactContext);
        mapView.onCreate(null);
        mapView.onResume();
        return mapView;
    }

}
