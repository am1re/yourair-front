import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-station-profile',
  templateUrl: './station-profile.component.html',
  styleUrls: ['./station-profile.component.sass']
})

export class StationProfileComponent implements OnInit {
  private _data: any = null
  get data(): any { return this._data }
  @Input() set data(value: any) {
    this._data = value
    this.season = !value ? 'total' : this.season
    this.timelineValue = value?.timeline?.filter(x => x.data != null)[0]
  }
  season: string = 'total'
  timelineValue: any

  constructor() { }

  ngOnInit(): void {
  }
}
