import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Brightness } from '@ionic-native/brightness/ngx'
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { Base64 } from 'js-base64';
import { File } from '@ionic-native/file/ngx';

import * as Jimp from 'jimp';

import * as Highcharts from "highcharts";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, Ng5SliderModule],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    Jimp,
    File,
    Brightness,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
