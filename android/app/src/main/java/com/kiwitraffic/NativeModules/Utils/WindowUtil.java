package com.kiwitraffic.NativeModules.Utils;

import android.content.Context;
import android.util.DisplayMetrics;
import android.view.WindowManager;

public class WindowUtil {
    Context context;

    public WindowUtil(Context c){
        context = c;
    }

    public WindowManager getWindowManager(){
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        return wm;
    }

    public DisplayMetrics getDisplayMetrics(){
        WindowManager wm = getWindowManager();
        DisplayMetrics displayMetrics = new DisplayMetrics();
        wm.getDefaultDisplay().getMetrics(displayMetrics);
        return displayMetrics;
    }
}
