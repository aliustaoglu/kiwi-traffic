package com.kiwitraffic.NativeModules;

import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class GoogleMapView extends SimpleViewManager<View> {
    private GMap mapView;
    private ReactContext rctContext;

    @Nonnull
    @Override
    public String getName() {
        return "GoogleMapView";
    }

    @Nonnull
    @Override
    protected View createViewInstance(@Nonnull ThemedReactContext reactContext) {
        mapView = new GMap(reactContext);
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

    @Nullable
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder().put("onMapReady", MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onMapReady")))
                .build();
    }


}
