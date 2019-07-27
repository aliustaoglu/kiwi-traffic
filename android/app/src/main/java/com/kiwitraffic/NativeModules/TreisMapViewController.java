package com.kiwitraffic.NativeModules;


import com.facebook.react.uimanager.ThemedReactContext;
import com.google.android.gms.maps.MapView;
import javax.annotation.Nonnull;

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
