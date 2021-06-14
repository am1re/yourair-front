import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// import { MapModule } from './map/map.module'

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { MglMapResizeDirective } from './components/map/mgl-map-resize.directive';
import { MainMapComponent } from './components/main-map/main-map.component';
import { StationProfileComponent } from './components/station-profile/station-profile.component';
import { AqiChartComponent } from './components/aqi-chart/aqi-chart.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NormalizeIndicatorsPipe } from './core/helpers/normalize-indicators.pipe';



@NgModule({
  declarations: [
    AppComponent,
    MglMapResizeDirective,
    MainMapComponent,
    StationProfileComponent,
    AqiChartComponent,
    TimelineComponent,
    NormalizeIndicatorsPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiYW0xcmUiLCJhIjoiY2tub2h1eDh1MTk1OTJvcHIzd3VoaTFxZyJ9.8bk24gvmjlWJ1RZxFg7LUA',
    }),
    HighchartsChartModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatButtonToggleModule
    // MapModule.forRoot({
    //   mapboxToken: 'pk.eyJ1IjoiYW0xcmUiLCJhIjoiY2tub2h1eDh1MTk1OTJvcHIzd3VoaTFxZyJ9.8bk24gvmjlWJ1RZxFg7LUA',
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
