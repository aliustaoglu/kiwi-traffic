package com.kiwitraffic.NativeModules.Utils;

import com.google.android.gms.maps.model.LatLng;
import com.google.maps.android.clustering.ClusterItem;

public class MapClusterItem implements ClusterItem {
    private LatLng latLng;
    private String title;
    private String snippet;
    public String tag;

    public MapClusterItem(LatLng l, String t, String s, String g){
        latLng = l;
        title = t;
        snippet = s;
        tag = g;
    }

    @Override
    public LatLng getPosition() {
        return latLng;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String getSnippet() {
        return snippet;
    }

    public String getTag(){
        return tag;
    }
}
