import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts'
import { TimelineOptions } from '../../core/helpers/highcharts-options'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass']
})
export class TimelineComponent implements OnInit, OnChanges {
  @Input() data: any

  Highcharts: typeof Highcharts = Highcharts
  updateFlag = false
  chartOptions: Highcharts.Options = {
    ...TimelineOptions,
    series: [{}],
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChart()
  }

  ngOnInit(): void {
  }

  private updateChart() {
    let chartData: any = [
      {
        name: "temperature",
        data: Array.from({ length: 24 }, (v, i) => ({ x: undefined, y: undefined }))
      },
      {
        name: "humidity",
        data: Array.from({ length: 24 }, (v, i) => ({ x: undefined, y: undefined }))
      },
      {
        name: "pressure",
        data: Array.from({ length: 24 }, (v, i) => ({ x: undefined, y: undefined }))
      },
      {
        name: "pm10",
        data: Array.from({ length: 24 }, (v, i) => ({ x: undefined, y: undefined }))
      },
      {
        name: "pm25",
        data: Array.from({ length: 24 }, (v, i) => ({ x: undefined, y: undefined }))
      },
    ]

    for (let i = 0; i < this.data?.timeline.length; i++) {
      const x = this.data.timeline[i];
      for (const indicatorName in x.data) {
        if (indicatorName == '_id') continue
        if (Object.prototype.hasOwnProperty.call(x.data, indicatorName)) {
          const indicatorValue = x.data[indicatorName]
          chartData.find(a => a.name == indicatorName).data[i] = { x: new Date(x.to), y: indicatorValue }
        }
      }
    }

    for (const chartDataValue of chartData) {
      chartDataValue.data = chartDataValue.data.filter(value => value.x !== undefined)
    }

    this.chartOptions.series = chartData
    this.updateFlag = true
  }
}
