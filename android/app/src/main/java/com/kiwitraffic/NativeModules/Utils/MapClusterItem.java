package com.kiwitraffic.NativeModules.Utils;

import com.facebook.react.bridge.ReadableMap;
import com.google.android.gms.maps.model.LatLng;
import com.google.maps.android.clustering.ClusterItem;

public class MapClusterItem implements ClusterItem {
    private LatLng latLng;
    private String title;
    private String snippet;
    public ReadableMap tag;

    public MapClusterItem(LatLng l, String t, String s, ReadableMap tg){
        latLng = l;
        title = t;
        snippet = s;
        tag = tg;
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

    public ReadableMap getTag(){
        return tag;
    }
}
