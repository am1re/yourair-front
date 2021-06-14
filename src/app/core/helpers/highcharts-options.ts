import * as Highcharts from 'highcharts'
import * as _ from 'lodash';

const commonOptions: any = {
    series: [{}],
    title: { text: "" },
    navigator: { series: { dataGrouping: { groupPixelWidth: 16, forced: true } } },
    tooltip: {
        useHTML: true,
        headerFormat: '<div style="position: relative;z-index: 1;margin: -7px;padding: 7px;border-radius: 3px;">{point.key}</div>'
    },
    xAxis: { type: "datetime" },
    yAxis: { title: { text: "" } },
    rangeSelector: { enabled: false },
    scrollbar: { enabled: false },
    plotOptions: {
        series: { lineWidth: 1, point: {} },
        line: { states: { hover: { enabled: false } } }
    }
}

const TimelineOptions: any = {
    chart: {
        get width() { return window.innerWidth - 450 - (24 * 2) },
        height: 320,
        marginLeft: 0,
        marginRight: 0,
    },
    title: { text: "" },
    tooltip: {
        formatter: function () {
            return [this.x.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })]
                .concat(this.points ? this.points.map((point) => '<b>' + point.y.toFixed(1).replace(/\.?0*$/, '') + '</b> ' + point.series.name) : []);
        },
        split: true
    },
    xAxis: { type: "datetime", crosshair: true },
    yAxis: { title: { text: "" } },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true,
                formatter: function () { return this.y.toFixed(1).replace(/\.?0*$/, '') },
            }
        }
    },
}

const PercentageOptions: any = _.merge(_.cloneDeep(commonOptions), {
    legend: { enabled: false },
    title: { text: "" },
    tooltip: { enabled: false },
    chart: { width: 397, backgroundColor: "transparent", height: 150, marginLeft: 20, marginRight: 0 },
    xAxis: {
        type: "category",
        labels: {
            style: { fontSize: "13px", color: "#9B9B9B", /*fontFamily: "Inter, sans-serif" */ },
            step: 1
        },
        tickWidth: 0,
        lineWidth: 0
    },
    yAxis: {
        gridLineWidth: 0,
        labels: { enabled: false }
    },
    plotOptions: {
        // series: { groupPadding: 0 },
        column: {
            stacking: undefined,
            dataLabels: {
                enabled: true,
                formatter: function () { return this.y.toFixed(1).replace(/\.?0*$/, '') + "%" },
                style: { fontSize: "13px", color: "#4a4a4a", /*fontFamily: "Inter, sans-serif"*/ }
            }
        }
    }
}
)

const HourlyOptions: any = _.merge(_.cloneDeep(commonOptions), {
    legend: { enabled: false },
    title: { text: "" },
    tooltip: { valueDecimals: 2 },
    chart: {
        width: 397,
        backgroundColor: "transparent",
        height: 150,
        marginLeft: 20,
        marginRight: 0
    },
    xAxis: {
        type: "category",
        labels: {
            style: { fontSize: "13px", color: "#9B9B9B", /*fontFamily: "Inter, sans-serif" */ },
            step: 6
        },
        tickWidth: 0,
        lineWidth: 0
    },
    yAxis: {
        gridLineColor: "#fff",
        gridLineDashStyle: "Dash",
        gridZIndex: 4,
        labels: {
            style: { fontSize: "13px", color: "#9B9B9B", /*fontFamily: "Inter, sans-serif" */ },
            align: "left",
            x: -20,
            formatter: function () { return this.isLast ? "AQI" : this.value }
        }
    },
    plotOptions: {
        stacking: undefined,
        series: { groupPadding: .1 }
    }
}
)

const WeeklyOptions: any = _.merge(_.cloneDeep(commonOptions), {
    legend: { enabled: false },
    title: { text: "" },
    tooltip: { valueDecimals: 2 },
    chart: { width: 397, backgroundColor: "transparent", height: 150, marginLeft: 20, marginRight: 0 },
    xAxis: {
        type: "category",
        labels: {
            style: { fontSize: "13px", color: "#9B9B9B", /*fontFamily: "Inter, sans-serif"*/ }
        },
        tickWidth: 0, lineWidth: 0
    },
    yAxis: {
        gridLineColor: "#fff",
        gridLineDashStyle: "Dash",
        gridZIndex: 4,
        labels: {
            style: { fontSize: "13px", color: "#9B9B9B", /*fontFamily: "Inter, sans-serif" */ },
            align: "left",
            x: -20,
            formatter: function () { return this.isLast ? "AQI" : this.value }
        }
    },
    plotOptions: {
        stacking: undefined,
        series: { groupPadding: 0 }
    }
})

export { TimelineOptions, PercentageOptions, HourlyOptions, WeeklyOptions }