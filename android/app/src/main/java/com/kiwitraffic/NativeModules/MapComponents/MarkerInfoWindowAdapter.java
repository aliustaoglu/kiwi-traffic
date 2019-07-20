package com.kiwitraffic.NativeModules.MapComponents;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.view.Gravity;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.Marker;

public class MarkerInfoWindowAdapter implements GoogleMap.InfoWindowAdapter {

    private Context context;

    public MarkerInfoWindowAdapter(Context rctContext){
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
        return info;
    }
}
