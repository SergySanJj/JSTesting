import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {PlayComponent} from './play/play.component';
import {IndexComponent} from './index/index.component';

import {AppkeysService} from './services/appkeys.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlayComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(
      AppkeysService.firebaseKeys
    ),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
