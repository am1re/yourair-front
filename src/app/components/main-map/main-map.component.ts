import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { MapMouseEvent, Map, MapboxGeoJSONFeature, MapLayerMouseEvent } from 'mapbox-gl'
import { AirDataService } from 'src/app/core/services/airdata.service'

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.sass']
})

export class MainMapComponent implements OnInit {
  @Output() selectedPointEvent = new EventEmitter<MapboxGeoJSONFeature>()

  map: Map
  cursorStyle: string
  center = [13.983, 48.214]
  zoom = 4
  hoverFeature: MapboxGeoJSONFeature | null

  aqiStatuses: string[] = ["Good", "Good", "Good", "Moderate", "Moderate", "Unhealthy", "Unhealthy", "Very Unhealthy", "Very Unhealthy", "Hazardous"]

  private _selectedPoint: MapboxGeoJSONFeature | null
  get selectedPoint(): MapboxGeoJSONFeature | null {
    return this._selectedPoint
  }
  set selectedPoint(value: MapboxGeoJSONFeature | null) {
    this._selectedPoint = value
    this.selectedPointEvent.emit(value)
  }

  private _points: GeoJSON.FeatureCollection<GeoJSON.Point>
  get points(): GeoJSON.FeatureCollection<GeoJSON.Point> {
    return this._points
  }
  set points(value: GeoJSON.FeatureCollection<GeoJSON.Point>) {
    this._points = value

    const source: any = this.map?.getSource('points')
    source?.setData(value)

    if (this.selectedPoint)
      this.selectedPoint.properties.aqi ??= value?.features?.find(x => x.properties.id == this.selectedPoint.properties.id)?.properties?.aqi
  }

  constructor(private airDataService: AirDataService) { }

  ngOnInit(): void {
    this.airDataService.getStations().subscribe(data => this.points = data) // just get coordinates
    this.airDataService.getStationsWithAqi().subscribe(data => this.points = data) // get aqi per dot (slow request)
  }

  onClickGlobal(e: MapMouseEvent) {
    if (e.defaultPrevented === false)
      this.selectedPoint = null
  }

  onClickPoint(e: MapLayerMouseEvent) {
    if (e.features![0]?.properties?.id == this.selectedPoint?.properties?.id) return
    e.originalEvent.preventDefault()
    this.selectedPoint = e.features![0]
  }

  onLayerMouseEnter(e: MapLayerMouseEvent) {
    if (e.features![0]?.properties?.id == this.selectedPoint?.properties?.id) return
    this.cursorStyle = 'pointer'
    this.hoverFeature = e.features![0]
  }

  onLayerMouseLeave(e: MapLayerMouseEvent) {
    this.cursorStyle = ''
    this.hoverFeature = null
  }

  getAqiStatusText(aqi: number) {
    return this.aqiStatuses[aqi - 1] ?? 'n/a'
  }
}
