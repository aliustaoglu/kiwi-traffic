package com.kiwitraffic.NativeModules.Utils;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.maps.android.clustering.ClusterItem;
import com.google.maps.android.clustering.ClusterManager;
import com.google.maps.android.clustering.view.DefaultClusterRenderer;

import java.io.IOException;

public class MapClusterItemRenderer extends DefaultClusterRenderer {
    private Context context;
    private GoogleMap googleMap;

    public MapClusterItemRenderer(Context c, GoogleMap map, ClusterManager clusterManager) {
        super(c, map, clusterManager);
        context = c;
        googleMap = map;
    }

    @Override
    protected void onBeforeClusterItemRendered(ClusterItem item, MarkerOptions markerOptions) {
        super.onBeforeClusterItemRendered(item, markerOptions);
        BitmapDescriptor img;
        try {
            Bitmap bt = BitmapFactory.decodeStream(context.getAssets().open("img/roadworks.png"));
            Bitmap imgResized = Bitmap.createScaledBitmap(bt, 84, 84, false);
            img = BitmapDescriptorFactory.fromBitmap(imgResized);
            markerOptions.icon(img);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
