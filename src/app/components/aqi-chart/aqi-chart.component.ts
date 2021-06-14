import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import * as Highcharts from 'highcharts'
import { PercentageOptions, HourlyOptions, WeeklyOptions } from '../../core/helpers/highcharts-options'

@Component({
  selector: 'app-aqi-chart',
  templateUrl: './aqi-chart.component.html',
  styleUrls: ['./aqi-chart.component.sass']
})
export class AqiChartComponent implements OnInit, OnChanges {
  @Input() type: string
  @Input() data: any
  @Input() season: string

  Highcharts: typeof Highcharts = Highcharts
  updateFlag = false
  chartOptions: Highcharts.Options

  private columnNames: string[]
  private daysOfWeek: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
  private colors: string[] = ['#8CB917', '#A2C618', '#BEC617', '#FFCC32', '#FFA33B', '#FF7344', '#FF494B', '#D63B50', '#AC2D55', '#821D5A']

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChart()
  }

  ngOnInit(): void {
    switch (this.type) {
      case "aqiPercentage":
        this.chartOptions = { ...PercentageOptions }
        this.columnNames = Array.from({ length: 10 }, (v, i) => i + 1 + '')
        break
      case "aqiByHours":
        this.chartOptions = { ...HourlyOptions }
        this.columnNames = Array.from({ length: 24 }, (v, i) => (i < 10 ? '0' + i : i) + ':00')
        break
      case "aqiWeekly":
        this.chartOptions = { ...WeeklyOptions }
        this.columnNames = Array.from({ length: 7 }, (v, i) => this.daysOfWeek[i])
        break
    }
    this.updateChart()
  }

  private updateChart() {
    if (!this.chartOptions) return

    const chartData = this.data?.diagrams ? this.data?.diagrams[this.season]?.[this.type].slice() : []
    for (let i = 0; i < chartData.length; i++) {
      chartData[i] = {
        name: this.columnNames[i],
        y: chartData[i],
        color: this.type == 'aqiPercentage' ? this.colors[i] : this.colors[chartData[i] - 1]
      }
    }

    this.chartOptions.series = [{
      name: 'AQI',
      type: 'column',
      data: chartData
    }]

    this.updateFlag = true
  }
}
