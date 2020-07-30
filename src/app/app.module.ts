import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial/ngx';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {SocialSharing} from "@ionic-native/social-sharing/ngx";
import {Toast} from '@ionic-native/toast/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { from } from 'rxjs';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BluetoothSerial,
    File,
    FileOpener,
    SocialSharing,
    Toast
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
