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

public class TreisMap extends GenericMap {
    public GoogleMap googleMap;
    private AssetManager assetManager;
    private ReactUtil reactUtil;

    public TreisMap(Context context) {
        super(context);
        this.getMapAsync(gMap -> {
            googleMap = gMap;
            //this.markersData.getMap("roadworks");
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
    }

    private void setRoadWorks(ReadableMap roadworks){
        //roadworks.getArray("roadworks").getMap(0).getMap("geometry").getString("type")
        /*ReadableArray arr = roadworks.getArray("roadworks");
        for (int i=0;i<arr.size();i++){
            ReadableMap geometry = arr.getMap(i).getMap("geometry");
            if (geometry.getString("type").equals("Point")){

            }
        }*/
    }





}
