package com.kiwitraffic.NativeModules;

import android.view.View;
import com.facebook.react.uimanager.ThemedReactContext;
import com.google.android.gms.maps.MapView;

import javax.annotation.Nonnull;

public class ChristchurchMapViewController extends GenericMapViewController {

    @Nonnull
    @Override
    public String getName() {
        return "ChristchurchMapViewController";
    }

    @Nonnull
    @Override
    protected View createViewInstance(@Nonnull ThemedReactContext reactContext) {
        MapView mapView = new ChristchurchMap(reactContext);
        mapView.onCreate(null);
        mapView.onResume();
        return mapView;

    }
}
