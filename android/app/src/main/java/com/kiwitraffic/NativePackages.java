package com.kiwitraffic;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.kiwitraffic.NativeModules.ChristchurchMapViewController;
import com.kiwitraffic.NativeModules.GenericMapViewController;
import com.kiwitraffic.NativeModules.GoogleMapAucklandView;
import com.kiwitraffic.NativeModules.NavigatorView;
import com.kiwitraffic.NativeModules.TrafficCamsViewController;
import com.kiwitraffic.NativeModules.TreisMapViewController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nonnull;

public class NativePackages implements ReactPackage {

    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        return modules;
    }

    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new NavigatorView(),
                new GenericMapViewController(),
                new GoogleMapAucklandView(),
                new TreisMapViewController(),
                new TrafficCamsViewController(),
                new ChristchurchMapViewController()
        );
    }
}
