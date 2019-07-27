package com.kiwitraffic.NativeModules;

import android.content.Context;
import android.content.res.AssetManager;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.google.android.gms.maps.GoogleMap;
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
