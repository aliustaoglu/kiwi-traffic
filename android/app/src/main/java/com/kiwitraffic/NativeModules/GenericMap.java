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
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MapStyleOptions;
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
import com.kiwitraffic.R;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GenericMap extends MapView {
    GoogleMap googleMap;
    ReadableArray mapData;

    protected List<Marker> markers = new ArrayList<>();
    protected AssetManager assetManager;
    protected GeoApiContext geoApi;
    protected String apiKey;
    protected ApplicationInfo app;
    protected Bundle bundle;
    protected List<Marker> markersCamera = new ArrayList<>();

    public GenericMap(Context context) {
        super(context);
        assetManager = context.getAssets();
        try {
            app = context.getPackageManager().getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
            bundle = app.metaData;
            apiKey = bundle.getString("com.google.android.geo.API_KEY");
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        this.getMapAsync(gMap -> {
            googleMap = gMap;
            reactNativeEvent("onMapReady", null);
            geoApi = new GeoApiContext.Builder().apiKey(apiKey).build();
            googleMap.setMapStyle(MapStyleOptions.loadRawResourceStyle(getContext(), R.raw.night_vision));
            gMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
                @Override
                public boolean onMarkerClick(Marker marker) {
                    if (marker.getTag() != null) {
                        reactNativeEvent("onMarkerClick", composeMarkerEventParams(marker));
                    }
                    return false;
                }
            });
        });
    }

    public void setLatLng(Double lat, Double lng) {
        googleMap.moveCamera(CameraUpdateFactory.newLatLng(new LatLng(lat, lng)));

    }

    public void setZoom(int zoom) {
        googleMap.moveCamera(CameraUpdateFactory.zoomTo(zoom));
    }

    public void setData(ReadableArray data) {
        mapData = data;
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
            BitmapDescriptor img = getIcon("img/traffic-cams.png");
            markerOptions.position(new LatLng(camLat, camLon)).icon(img);//.title(camName).snippet(camDescription);

            Marker camMarker = googleMap.addMarker(markerOptions);
            markersCamera.add(camMarker);
            Map<String, String> camObject = new HashMap<>();
            camObject.put("markerType", "camera");
            camObject.put("thumbUrl", thumbUrl);
            camObject.put("imageUrl", imageUrl);
            camObject.put("name", camName);
            camObject.put("description", camDescription);
            camMarker.setTag(camObject);
        }
    }

    protected void reactNativeEvent(String eventName, WritableMap eventParams) {
        ReactContext reactContext = (ReactContext) this.getContext();
        reactContext
                .getJSModule(RCTEventEmitter.class)
                .receiveEvent(this.getId(), eventName, eventParams);
    }

    protected BitmapDescriptor getIcon(String fileName, int width, int height) {
        BitmapDescriptor img = null;
        try {
            Bitmap bt = BitmapFactory.decodeStream(assetManager.open(fileName));
            Bitmap imgResized = Bitmap.createScaledBitmap(bt, width, height, false);
            img = BitmapDescriptorFactory.fromBitmap(imgResized);
        } catch (IOException e) {

        }
        return img;
    }

    protected BitmapDescriptor getIcon(String fileName) {
        return getIcon(fileName, 84, 84);
    }

    protected WritableMap composeMarkerEventParams(Marker marker) {
        HashMap<String, String> tags = ((HashMap<String, String>) marker.getTag());
        WritableMap eventParams = Arguments.createMap();
        tags.forEach((name, val) -> eventParams.putString(name, val));
        return eventParams;
    }

    protected void makePolyline(Double startLat, Double startLon, Double endLat, Double endLon){

        com.google.maps.model.LatLng start = new com.google.maps.model.LatLng();
        com.google.maps.model.LatLng end = new com.google.maps.model.LatLng();
        start.lat = startLat;
        start.lng = startLon;
        end.lat = endLat;
        end.lng = endLon;
        try {
            DirectionsApiRequest directionsApiRequest = DirectionsApi.newRequest(geoApi);
            DirectionsResult result = directionsApiRequest.origin(start).destination(end).mode(TravelMode.DRIVING).await();
            EncodedPolyline overviewPolyline = result.routes[0].overviewPolyline;
            String encodedPolyline = overviewPolyline.getEncodedPath();
            List<LatLng> points = PolyUtil.decode(encodedPolyline);
            PolylineOptions polyOptions = new PolylineOptions();
            List<LatLng> polyPoints = PolyUtil.decode(encodedPolyline);
            for (int i = 0; i < polyPoints.size(); i++) {
                polyOptions.add(polyPoints.get(i));
            }
            polyOptions.color(Color.RED).width(12);
            Polyline poly = googleMap.addPolyline(polyOptions);

        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
