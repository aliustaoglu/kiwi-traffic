package com.kiwitraffic.NativeModules;

import android.view.View;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.ThemedReactContext;
import com.google.android.gms.maps.MapView;
import javax.annotation.Nonnull;

public class TrafficCamsViewController extends GenericMapViewController {
    @Nonnull
    @Override
    public String getName() {
        return "TrafficCamsViewController";
    }

    @Nonnull
    @Override
    protected View createViewInstance(@Nonnull ThemedReactContext reactContext) {
        MapView mapView = new TrafficCamsMap(reactContext);
        mapView.onCreate(null);
        mapView.onResume();
        return mapView;

    }


}
