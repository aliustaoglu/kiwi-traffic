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
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.android.PolyUtil;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.EncodedPolyline;
import com.google.maps.model.TravelMode;
import com.kiwitraffic.NativeModules.MapComponents.MarkerInfoWindowAdapter;

import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class GMapAuckland extends MapView {
    public GoogleMap googleMap;
    private GeoApiContext geoApi;
    private AssetManager assetManager;
    private ReadableMap existingRoutes;
    private ReadableMap mapReducer;

    private List<Marker> markersSign = new ArrayList<>();
    private List<Marker> markersFree = new ArrayList<>();
    private List<Marker> markersModerate = new ArrayList<>();
    private List<Marker> markersHeavy = new ArrayList<>();
    private List<Polyline> polyFree = new ArrayList<>();
    private List<Polyline> polyModerate = new ArrayList<>();
    private List<Polyline> polyHeavy = new ArrayList<>();


    List<JSONObject> jsList = new ArrayList<>();

    private BitmapDescriptor getIcon(String fileName, int width) {
        BitmapDescriptor img = null;
        try {
            Bitmap bt = BitmapFactory.decodeStream(assetManager.open(fileName));
            Bitmap imgResized = Bitmap.createScaledBitmap(bt, width, width, false);
            img = BitmapDescriptorFactory.fromBitmap(imgResized);
        } catch (IOException e) {

        }
        return img;
    }

    private BitmapDescriptor getIcon(String fileName) {
        return getIcon(fileName, 96);
    }

    public GMapAuckland(Context context) {
        super(context);
        assetManager = context.getAssets();

        this.getMapAsync(gMap -> {
            googleMap = gMap;
            GoogleMap.InfoWindowAdapter infoW = new MarkerInfoWindowAdapter(getContext());
            googleMap.setInfoWindowAdapter(infoW);
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

    public void pushPolylineList(Polyline poly, String trafficType) {
        switch (trafficType) {
            case "free":
                polyFree.add(poly);
                break;
            case "moderate":
                polyModerate.add(poly);
                break;
            case "heavy":
                polyHeavy.add(poly);
                break;
        }
    }

    private void setSingleRoute(ReadableMap route, String trafficType, int color) {
        double startLat = Double.parseDouble(route.getString("startLat"));
        double startLon = Double.parseDouble(route.getString("startLon"));
        double endLat = Double.parseDouble(route.getString("endLat"));
        double endLon = Double.parseDouble(route.getString("endLon"));
        String title = route.getString("name");
        String inOut = route.getString("inOut");
        DirectionsApiRequest req = DirectionsApi.newRequest(geoApi);
        com.google.maps.model.LatLng start = new com.google.maps.model.LatLng();
        com.google.maps.model.LatLng end = new com.google.maps.model.LatLng();
        start.lat = startLat;
        start.lng = startLon;
        end.lat = endLat;
        end.lng = endLon;
        try {
            String encodedPolyline = "";

            if (existingRoutes.hasKey(title)) {
                encodedPolyline = existingRoutes.getString(title);
            } else {
                DirectionsResult result = req.origin(start).destination(end).mode(TravelMode.DRIVING).await();
                EncodedPolyline overviewPolyline = result.routes[0].overviewPolyline;
                encodedPolyline = overviewPolyline.getEncodedPath();
            }


            PolylineOptions polyOptions = new PolylineOptions();
            List<LatLng> points = PolyUtil.decode(encodedPolyline);
            for (int i = 0; i < points.size(); i++) {
                polyOptions.add(points.get(i));
            }
            int lineWidth = trafficType == "free" ? 6 : 12;
            polyOptions.width(lineWidth).color(color);

            Polyline poly = googleMap.addPolyline(polyOptions);
            pushPolylineList(poly, trafficType);

            if (trafficType != "free") {
                BitmapDescriptor img = getIcon("img/traffic-" + trafficType + ".png");
                MarkerOptions markerOptions = new MarkerOptions();
                markerOptions.position(new LatLng(startLat, startLon)).icon(img).title(title).snippet(inOut + "bound : " + trafficType + " traffic");
                Marker markerTraffic = googleMap.addMarker(markerOptions);
                if (trafficType == "moderate") markersModerate.add(markerTraffic);
                if (trafficType == "heavy") markersHeavy.add(markerTraffic);
            }

            JSONObject jo = new JSONObject();
            jo.put(title, encodedPolyline);
            jsList.add(jo);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setPolylines(ReadableMap polylines) {
        ReadableArray moderateArray = polylines.getArray("moderate");
        ReadableArray heavyArray = polylines.getArray("heavy");
        ReadableArray freeArray = polylines.getArray("free");
        for (int i = 0; i < freeArray.size(); i++) {
            setSingleRoute(freeArray.getMap(i), "free", Color.rgb(0, 255, 0));
        }
        for (int i = 0; i < moderateArray.size(); i++) {
            setSingleRoute(moderateArray.getMap(i), "moderate", Color.rgb(255, 165, 0));
        }
        for (int i = 0; i < heavyArray.size(); i++) {
            setSingleRoute(heavyArray.getMap(i), "heavy", Color.RED);
        }
    }

    public void setSigns(ReadableArray signs) {
        this.getMapAsync(gMap -> {
            for (int i = 0; i < signs.size(); i++) {
                String message = signs.getMap(i).getString("message");
                String name = signs.getMap(i).getString("name");
                Double lat = Double.parseDouble(signs.getMap(i).getString("lat"));
                Double lon = Double.parseDouble(signs.getMap(i).getString("lon"));

                BitmapDescriptor img = getIcon("img/info.png");

                MarkerOptions markerOptions = new MarkerOptions();
                markerOptions.position(new LatLng(lat, lon)).title(name).icon(img).snippet(message);
                Marker signMarker = gMap.addMarker(markerOptions);
                markersSign.add(signMarker);
            }
        });

    }

    public void setPreRoutes(ReadableMap preRoutes) {
        existingRoutes = preRoutes;
    }

    public void setCameras(ReadableArray cameras) {

        for (int i = 0; i < cameras.size(); i++) {
            String camDescription = cameras.getMap(i).getString("description");
            String camName = cameras.getMap(i).getString("name");
            String thumbUrl = cameras.getMap(i).getString("thumbUrl");
            String imageUrl = cameras.getMap(i).getString("imageUrl");
            Double camLat = Double.parseDouble(cameras.getMap(i).getString("lat"));
            Double camLon = Double.parseDouble(cameras.getMap(i).getString("lon"));


            MarkerOptions markerOptions = new MarkerOptions();
            markerOptions.position(new LatLng(camLat, camLon)).title(camName).snippet(camDescription);

            Marker camMarker = googleMap.addMarker(markerOptions);
            Map<String, String > camObject = new HashMap<>();
            camObject.put("markerType", "camera");
            camObject.put("thumbUrl", thumbUrl);
            camMarker.setTag(camObject);
        }
    }

    public void setMapReducer(ReadableMap mpReducer) {
        mapReducer = mpReducer;
        Boolean showInfo = mapReducer.getBoolean("showInfo");
        Boolean showFree = mapReducer.getBoolean("showFree");
        Boolean showModerate = mapReducer.getBoolean("showModerate");
        Boolean showHeavy = mapReducer.getBoolean("showHeavy");

        markersSign.forEach(marker -> marker.setVisible(showInfo));
        markersFree.forEach(marker -> marker.setVisible(showFree));
        markersModerate.forEach(marker -> marker.setVisible(showModerate));
        markersHeavy.forEach(marker -> marker.setVisible(showHeavy));
        polyHeavy.forEach(polyline -> polyline.setVisible(showHeavy));
        polyModerate.forEach(polyline -> polyline.setVisible(showModerate));
        polyFree.forEach(polyline -> polyline.setVisible(showFree));
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
