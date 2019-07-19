package com.kiwitraffic.NativeModules;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Bundle;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.android.PolyUtil;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.EncodedPolyline;
import com.google.maps.model.TravelMode;

import java.io.IOException;
import java.util.List;


public class GMapAuckland extends MapView {
    public GoogleMap googleMap;
    private GeoApiContext geoApi;

    public GMapAuckland(Context context) {
        super(context);


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

    private void setSingleRoute(ReadableMap route, int color) {
        double startLat = Double.parseDouble(route.getString("startLat"));
        double startLon = Double.parseDouble(route.getString("startLon"));
        double endLat = Double.parseDouble(route.getString("endLat"));
        double endLon = Double.parseDouble(route.getString("endLon"));
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
                polyOptions.width(15).color(color);

                gMap.addPolyline(polyOptions);

            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public void setPolylines(ReadableMap polylines) {
        ReadableArray moderateArray = polylines.getArray("moderate");
        ReadableArray heavyArray = polylines.getArray("heavy");
        for(int i=0;i<heavyArray.size();i++){
            setSingleRoute(heavyArray.getMap(i), Color.RED);
        }
        for(int i=0;i<moderateArray.size();i++){
            setSingleRoute(moderateArray.getMap(i), Color.rgb(255, 165, 0));
        }
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
