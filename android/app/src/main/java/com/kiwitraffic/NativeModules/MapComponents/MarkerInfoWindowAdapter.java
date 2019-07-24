package com.kiwitraffic.NativeModules.MapComponents;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.BitmapDrawable;
import android.support.annotation.Nullable;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.Target;
import com.dylanvann.fastimage.GlideApp;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.Marker;
import com.kiwitraffic.NativeModules.Utils.WindowUtil;

import java.util.Map;

public class MarkerInfoWindowAdapter implements GoogleMap.InfoWindowAdapter {

    private Context context;
    private WindowUtil windowUtil;
    private String lastOpenedMarker = "";

    public MarkerInfoWindowAdapter(Context rctContext) {
        context = rctContext;
        windowUtil = new WindowUtil(context);
    }

    @Override
    public View getInfoWindow(Marker marker) {
        return null;
    }


    @Override
    public View getInfoContents(Marker marker) {
        LinearLayout info = new LinearLayout(context);
        info.setOrientation(LinearLayout.VERTICAL);

        TextView title = new TextView(context);
        title.setTextColor(Color.BLACK);
        title.setText(marker.getTitle());
        title.setTypeface(null, Typeface.BOLD);

        TextView snippet = new TextView(context);
        snippet.setTextColor(Color.rgb(255, 165, 0));
        snippet.setGravity(Gravity.CENTER_HORIZONTAL);
        snippet.setText(marker.getSnippet().replace("[nl]", "\r\n"));

        info.addView(title);
        info.addView(snippet);

        if (marker.getTag() != null) {
            Map<String, String> markerParams = (Map<String, String>) marker.getTag();
            String imageUrl = markerParams.get("imageUrl");
            if (markerParams.get("markerType").equals("camera")) {
                DisplayMetrics displayMetrics = windowUtil.getDisplayMetrics();
                ImageView imgCam = new ImageView(context);
                int size = 640; //(int) Math.round(displayMetrics.widthPixels * 0.85);
                imgCam.setLayoutParams(new LinearLayout.LayoutParams(size, size));
                info.addView(imgCam);
                RequestListener glideRequestListener = new RequestListener() {
                    @Override
                    public boolean onLoadFailed(@Nullable GlideException e, Object model, Target target, boolean isFirstResource) {
                        return false;
                    }

                    @Override
                    public boolean onResourceReady(Object resource, Object model, Target target, DataSource dataSource, boolean isFirstResource) {
                        Map<String, String> markerParams = (Map<String, String>) marker.getTag();
                        if (!lastOpenedMarker.equals(imageUrl) ) {
                            lastOpenedMarker = imageUrl;
                            marker.hideInfoWindow();
                            marker.showInfoWindow();
                            Bitmap imgBitmap = ((BitmapDrawable) resource).getBitmap();
                            new Thread(new Runnable() {
                                @Override
                                public void run() {
                                    Glide.get(context).clearDiskCache();
                                }
                            }).start();
                        }
                        return false;
                    }
                };
                GlideApp.with(context).load(markerParams.get("imageUrl"))
                        .override(Target.SIZE_ORIGINAL, Target.SIZE_ORIGINAL)
                        .listener(glideRequestListener)
                        .into(imgCam);
            }
        }

        return info;
    }
}
