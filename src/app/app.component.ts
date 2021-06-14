import { Component } from '@angular/core'
import { MapboxGeoJSONFeature } from 'mapbox-gl'
import { AirDataService } from './core/services/airdata.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private _selectedPoint: MapboxGeoJSONFeature | null
  get selectedPoint(): MapboxGeoJSONFeature | null { return this._selectedPoint }
  set selectedPoint(value: MapboxGeoJSONFeature | null) {
    this._selectedPoint = value

    this.data = null
    if (value?.properties?.id)
      this.airDataService.getGrpaphData(value?.properties?.id).subscribe(data => this.data = data)
  }

  private _data: any = null
  get data(): any {
    return this._data
  }
  set data(value: any) {
    this._data = value
    this.sideNavOpened = (value) ? true : false
    this.panelExpanded = (value) ? true : false
  }

  sideNavOpened: boolean
  panelExpanded: boolean

  constructor(private airDataService: AirDataService) { }
}
