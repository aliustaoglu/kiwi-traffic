package com.kiwitraffic.NativeModules.MapComponents;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.annotation.Nullable;
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
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.Marker;

import java.util.Map;

public class MarkerInfoWindowAdapter implements GoogleMap.InfoWindowAdapter {

    private Context context;

    public MarkerInfoWindowAdapter(Context rctContext) {
        context = rctContext;
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
            Map<String, String> markerParams = (Map<String, String>)marker.getTag();
            if (markerParams.get("markerType") == "camera"){
                TextView abc = new TextView(context);
                abc.setText(markerParams.get("thumbUrl"));
                info.addView(abc);

                ImageView imgCam = new ImageView(context);
                imgCam.setLayoutParams(new LinearLayout.LayoutParams(500, 500));
                info.addView(imgCam);
                Glide.with(context).load(markerParams.get("imageUrl")).into(imgCam);
                imgCam.invalidate();
            }
        }

        return info;
    }
}
