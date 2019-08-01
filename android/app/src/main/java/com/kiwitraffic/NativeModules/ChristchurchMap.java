package com.kiwitraffic.NativeModules;

import android.content.Context;
import android.hardware.camera2.params.StreamConfigurationMap;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.maps.android.clustering.Cluster;
import com.google.maps.android.clustering.ClusterItem;
import com.google.maps.android.clustering.ClusterManager;
import com.kiwitraffic.NativeModules.Utils.MapClusterItem;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ChristchurchMap extends GenericMap implements ClusterManager.OnClusterItemClickListener, ClusterManager.OnClusterClickListener {
    private ClusterManager clusterManager;

    public ChristchurchMap(Context context) {
        super(context);
        this.getMapAsync(gMap -> {
            clusterManager = new ClusterManager<MapClusterItem>(context, googleMap);
            clusterManager.setOnClusterItemClickListener(this);
            clusterManager.setOnClusterClickListener(this);
            googleMap.setOnCameraIdleListener(clusterManager);
            googleMap.setOnMarkerClickListener(clusterManager);
        });
    }

    protected void setRoadworks(ReadableArray roadworks) {

        for (int i = 0; i < roadworks.size(); i++) {

            ReadableMap work = roadworks.getMap(i);
            Double lat = work.getDouble("lat");
            Double lon = work.getDouble("lon");
            LatLng pos = new LatLng(lat, lon);
            MapClusterItem item = new MapClusterItem(pos, "deneme", "yanila", work);
            //MarkerOptions markerOptions = new MarkerOptions();
            //BitmapDescriptor img = getIcon("img/roadworks.png");
            //markerOptions.position(new LatLng(lat, lon)).icon(img);
            clusterManager.addItem(item);

            //Marker marker = googleMap.addMarker(markerOptions);
        }
        clusterManager.cluster();

    }


    @Override
    public boolean onClusterItemClick(ClusterItem clusterItem) {

        return false;
    }

    @Override
    public boolean onClusterClick(Cluster cluster) {
        LatLng clusterPos = new LatLng(cluster.getPosition().latitude, cluster.getPosition().longitude);
        float newZoom = googleMap.getCameraPosition().zoom + 2;
        if (newZoom > googleMap.getMaxZoomLevel())
            newZoom = googleMap.getMaxZoomLevel();
        googleMap.animateCamera(CameraUpdateFactory.newLatLngZoom(clusterPos, newZoom));
        return true;
    }
}
