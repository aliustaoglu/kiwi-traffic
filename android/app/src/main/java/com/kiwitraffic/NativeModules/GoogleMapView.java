package com.kiwitraffic.NativeModules;

import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.google.android.gms.maps.MapView;

import javax.annotation.Nonnull;

public class GoogleMapView extends SimpleViewManager<View> {
    @Nonnull
    @Override
    public String getName() {
        return "GoogleMapView";
    }

    @Nonnull
    @Override
    protected View createViewInstance(@Nonnull ThemedReactContext reactContext) {
        MapView view = new MapView(reactContext);
        view.onCreate(null);
        view.onResume();

        return view;


    }
}
