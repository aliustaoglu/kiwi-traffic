package com.kiwitraffic.NativeModules;

import android.view.View;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import javax.annotation.Nonnull;

public class NavigatorView extends SimpleViewManager<View> {
    @Nonnull
    @Override
    public String getName() {
        return "NavigatorView";
    }

    @Nonnull
    @Override
    protected View createViewInstance(@Nonnull ThemedReactContext reactContext) {
        View view = new View(reactContext);
        return view;
    }
}
