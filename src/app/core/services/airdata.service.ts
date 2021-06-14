import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MapMouseEvent, Map, MapboxGeoJSONFeature, MapLayerMouseEvent } from 'mapbox-gl';

import data from '../../tmp/tmp1'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirDataService {

  constructor(private apiService: ApiService) {

  }

  getGrpaphData(stationId: string): Observable<any> {
    return this.apiService.get('/station/' + stationId + '/graphsData/').pipe(
      map(x => {
        x.timeline = x.timeline.map(y => {
          if (y.data?.pressure) y.data.pressure = y.data.pressure * 0.001 // hpa to bar
          return y
        })
        return x
      })
    )
  }

  getStations(): Observable<GeoJSON.FeatureCollection<GeoJSON.Point>> {
    return this.apiService.get('/stations/')
      .pipe(
        map(results => (
          {
            type: 'FeatureCollection',
            features: results.map(x => (
              {
                type: 'Feature',
                properties: {
                  id: x._id,
                  aqi: x.aqi
                },
                geometry: {
                  type: 'Point',
                  coordinates: [x.longitude, x.latitude],
                },
              }
            ))
          }
        ))
      )
  }

  getStationsWithAqi(): Observable<GeoJSON.FeatureCollection<GeoJSON.Point>> {
    return this.apiService.get('/stationsWithAqi/')
      .pipe(
        map(results => (
          {
            type: 'FeatureCollection',
            features: results.map(x => (
              {
                type: 'Feature',
                properties: {
                  id: x._id,
                  aqi: x.aqi
                },
                geometry: {
                  type: 'Point',
                  coordinates: [x.longitude, x.latitude],
                },
              }
            ))
          }
        ))
      )
  }
}
