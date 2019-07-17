import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { StoriesComponent } from './stories/stories.component';
import { SettingsComponent } from './settings/settings.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LocalStorageModule } from 'angular-2-local-storage';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule } from 'angular2-highcharts';

import { SettingsService } from './settings.service';
import { TeamService } from './team.service';

import * as highcharts from 'highcharts';
import { MissionsComponent } from './missions/missions.component';
import { environment } from '../environments/environment';

export function highchartsFactory() {
  return highcharts;
}

const routes = [
  { path: '', component: MissionsComponent },
  { path: 'mission/:id', component: MainComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stories', component: StoriesComponent },
  { path: 'settings', component: SettingsComponent }
]; 

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StoriesComponent,
    AdminComponent,
    SettingsComponent,
    MissionsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpModule,
    ChartModule,
    LocalStorageModule.withConfig({ prefix: 'm2m-dashboard', storageType: 'localStorage' }),
    FormsModule
  ],
  providers: [
    { provide: HighchartsStatic, useFactory: highchartsFactory },
    SettingsService,
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
