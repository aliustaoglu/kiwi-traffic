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
import com.google.maps.android.clustering.ClusterManager;
import com.kiwitraffic.NativeModules.Utils.MapClusterItem;

public class ChristchurchMap extends GenericMap {
    private ClusterManager clusterManager;

    public ChristchurchMap(Context context) {
        super(context);
        this.getMapAsync( gMap -> {
            clusterManager = new ClusterManager<MapClusterItem>(context, googleMap);
        } );
    }

    protected void setRoadworks(ReadableArray roadworks) {

        for (int i = 0; i < roadworks.size(); i++) {

            ReadableMap work = roadworks.getMap(i);
            Double lat = work.getDouble("lat");
            Double lon = work.getDouble("lon");
            LatLng pos = new LatLng(lat, lon);
            MapClusterItem item = new MapClusterItem(pos, "", "", "");

            //MarkerOptions markerOptions = new MarkerOptions();
            //BitmapDescriptor img = getIcon("img/roadworks.png");
            //markerOptions.position(new LatLng(lat, lon)).icon(img);
            clusterManager.addItem(item);

            //Marker marker = googleMap.addMarker(markerOptions);
        }
        clusterManager.cluster();

    }


}
