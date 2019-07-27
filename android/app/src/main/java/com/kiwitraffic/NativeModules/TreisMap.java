package com.kiwitraffic.NativeModules;

import android.content.Context;
import android.content.res.AssetManager;

import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.kiwitraffic.NativeModules.Utils.ReactUtil;

import java.util.HashMap;
import java.util.Map;

public class TreisMap extends GenericMap {
    public GoogleMap googleMap;
    private AssetManager assetManager;
    private ReactUtil reactUtil;

    public TreisMap(Context context) {
        super(context);
        this.getMapAsync(gMap -> {
            googleMap = gMap;
        });
    }

    public void setData(ReadableArray data){
        ReadableArray mapData = data;
        for(int i=0;i<data.size();i++){
            ReadableMap event = data.getMap(i);
            // Coordinates may return either array of doubles or array of array of doubles
            // eg. [0,0] or [[0,0],[1,1]]
            Dynamic dynamicCoordinates = event.getArray("coordinates").getDynamic(0);
            if (dynamicCoordinates.getType().name().equals("Number")) {
                Double lat = event.getArray("coordinates").getDouble(1);
                Double lon = event.getArray("coordinates").getDouble(0);
                String id = event.getString("id");
                String markerType = event.getString("markerType");
                placeMarker(lat, lon, id, markerType);
            } else {
                ReadableArray arr = dynamicCoordinates.asArray();

            }
        }
    }

    private void placeMarker(Double lat, Double lon, String id, String markerType){
        BitmapDescriptor img = getIcon("img/" + markerType + ".png", 60, 76);
        MarkerOptions markerOptions = new MarkerOptions();
        markerOptions.position(new LatLng(lat, lon)).icon(img);
        Marker markerTraffic = googleMap.addMarker(markerOptions);
        markers.add(markerTraffic);
        Map<String, String> markerTag = new HashMap<>();
        markerTag.put("lat", lat.toString());
        markerTag.put("lon", lon.toString());
        markerTag.put("id", id);
        markerTag.put("markerType", markerType);
        markerTraffic.setTag(markerTag);
    }



}
