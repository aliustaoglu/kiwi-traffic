package com.kiwitraffic.NativeModules;

import android.content.Context;
import android.content.res.AssetManager;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MapStyleOptions;
import com.kiwitraffic.NativeModules.Utils.ReactUtil;
import com.kiwitraffic.R;

public class TreisMap extends GenericMap {
    public GoogleMap googleMap;
    private AssetManager assetManager;
    private ReactUtil reactUtil;

    public TreisMap(Context context) {
        super(context);
        this.getMapAsync(gMap -> {
            googleMap = gMap;
            gMap.setMapStyle(MapStyleOptions.loadRawResourceStyle(context, R.raw.night_vision));
        });
    }



}
