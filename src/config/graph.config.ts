import { formatCash } from '../utils/format.utils'

export const options = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    stacked: false,
    height: 350,
  },
  legend: {
    position: "top",
    horizontalAlign: "left"
  },
  grid: { show: false, },
  dataLabels: { enabled: false },
  tooltip: {
    enabled: true,
    theme: true,
    fillSeriesColor: true,
    style: {
      fontSize: '0.8rem',
      fontFamily: undefined
    },
    x: {
      show: false,
    },
    y: {
      show: true,
      formatter: ( value: number ) => {
        return formatCash( value )
      }
    }
  },
  stroke: { curve: 'smooth' },
  xaxis: {},
  fill: {
    type: 'gradient'
  },
  stacked: true,
  colors: ['#25b860', '#4c4c4c', '#f64545']

}