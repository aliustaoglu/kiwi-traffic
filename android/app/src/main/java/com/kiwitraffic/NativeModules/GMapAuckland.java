package com.kiwitraffic.NativeModules;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.os.Bundle;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.android.PolyUtil;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.EncodedPolyline;
import com.google.maps.model.TravelMode;

import java.util.List;


public class GMapAuckland extends MapView {
    public GoogleMap googleMap;
    private GeoApiContext geoApi;
    private AssetManager assetManager;

    public GMapAuckland(Context context) {
        super(context);
        assetManager = context.getAssets();

        this.getMapAsync(gMap -> {
            googleMap = gMap;
            //googleMap.moveCamera(CameraUpdateFactory.newLatLng(new LatLng(100, 100)));
        });
        try {
            ApplicationInfo app = context.getPackageManager().getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
            Bundle bundle = app.metaData;
            String apiKey = bundle.getString("com.google.android.geo.API_KEY");
            geoApi = new GeoApiContext.Builder().apiKey(apiKey).build();
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
    }

    public void setLatLng(Double lat, Double lng) {
        this.getMapAsync(gMap -> {
            gMap.moveCamera(CameraUpdateFactory.newLatLng(new LatLng(lat, lng)));
        });
    }

    public void setZoom(int zoom) {
        this.getMapAsync(gMap -> {
            gMap.moveCamera(CameraUpdateFactory.zoomTo(zoom));
            reactNativeEvent("onMapReady", "");
        });
    }

    private void setSingleRoute(ReadableMap route, String trafficType, int color) {
        double startLat = Double.parseDouble(route.getString("startLat"));
        double startLon = Double.parseDouble(route.getString("startLon"));
        double endLat = Double.parseDouble(route.getString("endLat"));
        double endLon = Double.parseDouble(route.getString("endLon"));
        String title = route.getString("name");
        String inOut = route.getString("inOut");
        this.getMapAsync(gMap -> {
            DirectionsApiRequest req = DirectionsApi.newRequest(geoApi);
            com.google.maps.model.LatLng start = new com.google.maps.model.LatLng();
            com.google.maps.model.LatLng end = new com.google.maps.model.LatLng();
            start.lat = startLat;
            start.lng = startLon;
            end.lat = endLat;
            end.lng = endLon;
            try {
                DirectionsResult result = req.origin(start).destination(end).mode(TravelMode.DRIVING).await();
                EncodedPolyline overviewPolyline = result.routes[0].overviewPolyline;
                String encodedPolyline = overviewPolyline.getEncodedPath();

                PolylineOptions polyOptions = new PolylineOptions();
                List<LatLng> points = PolyUtil.decode(encodedPolyline);
                for (int i = 0; i < points.size(); i++) {
                    polyOptions.add(points.get(i));
                }
                polyOptions.width(8).color(color);

                gMap.addPolyline(polyOptions);

                Bitmap bt = BitmapFactory.decodeStream(assetManager.open("img/traffic-" + trafficType + ".png"));
                Bitmap imgResized = Bitmap.createScaledBitmap(bt, 96, 96, false);
                BitmapDescriptor img = BitmapDescriptorFactory.fromBitmap(imgResized);

                MarkerOptions markerOptions = new MarkerOptions();
                markerOptions.position(new LatLng(startLat, startLon)).title(title).icon(img).snippet(inOut + "bound : " + trafficType + " traffic");
                gMap.addMarker(markerOptions);

            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public void setPolylines(ReadableMap polylines) {
        ReadableArray moderateArray = polylines.getArray("moderate");
        ReadableArray heavyArray = polylines.getArray("heavy");
        for (int i = 0; i < heavyArray.size(); i++) {
            setSingleRoute(heavyArray.getMap(i), "heavy", Color.RED);
        }
        for (int i = 0; i < moderateArray.size(); i++) {
            setSingleRoute(moderateArray.getMap(i), "moderate", Color.rgb(255, 165, 0));
        }
    }

    public void setSigns(ReadableArray signs) {
        this.getMapAsync( gMap -> {
            for (int i = 0; i < signs.size(); i++) {
                String message = signs.getMap(i).getString("message");
                String name = signs.getMap(i).getString("name");
                Double lat = Double.parseDouble(signs.getMap(i).getString("lat"));
                Double lon = Double.parseDouble(signs.getMap(i).getString("lon"));

                MarkerOptions markerOptions = new MarkerOptions();
                markerOptions.position(new LatLng(lat, lon)).title(name).snippet(message);
                gMap.addMarker(markerOptions);
            }
        });

    }

    private void reactNativeEvent(String eventName, String message) {
        WritableMap event = Arguments.createMap();
        event.putString("message", message);
        ReactContext reactContext = (ReactContext) this.getContext();
        reactContext
                .getJSModule(RCTEventEmitter.class)
                .receiveEvent(this.getId(), eventName, event);
    }


}
