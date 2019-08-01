package com.kiwitraffic.NativeModules;

import android.content.Context;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

public class ChristchurchMap extends GenericMap {
    public GoogleMap ccMap;

    public ChristchurchMap(Context context) {
        super(context);
        this.getMapAsync(
                gMap -> {
                    ccMap = gMap;
                }
        );
    }

    protected void setRoadworks(ReadableArray roadworks) {
        for (int i = 0; i < roadworks.size(); i++) {
            ReadableMap work = roadworks.getMap(i);
            Double lat = work.getDouble("lat");
            Double lon = work.getDouble("lon");

            MarkerOptions markerOptions = new MarkerOptions();
            BitmapDescriptor img = getIcon("img/roadworks.png");
            markerOptions.position(new LatLng(lat, lon)).icon(img);

            Marker marker = googleMap.addMarker(markerOptions);
        }

    }


}
