import { format } from 'date-fns'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeSeriesScale,
    TooltipModel,
    TooltipItem,
  } from 'chart.js'
  import { Line } from 'react-chartjs-2'
  import 'chartjs-adapter-date-fns';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeSeriesScale,
  )

export default function SingleDriverLapTimes({ lapTimes }: {lapTimes: any[]}) {
  return (
    <Line
                                        options={{
                                            scales: {
                                                y: {
                                                    type: 'timeseries',
                                                    min: 60000,
                                                    time: {
                                                        unit: 'millisecond', 
                                                        displayFormats: {
                                                            millisecond: 'mm:ss.SSS'
                                                        }
                                                    },
                                                }
                                            },
                                            plugins: {
                                                tooltip: {
                                                    callbacks: {
                                                        label: function(tooltipItem: TooltipItem<"line">): string {
                                                            return format(tooltipItem.raw as string, 'mm:ss.SSS');
                                                        },
                                                        title: function(tooltipItems: TooltipItem<"line">[]): string {
                                                            return `Lap ${tooltipItems[0].label}`;
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                        data={{
                                            labels: lapTimes.map(lapTime => lapTime.lap),
                                            datasets: [{
                                                label: 'Lap Times',
                                                data: lapTimes.map(lapTime => lapTime.milliseconds), // assuming 'time' is a property on your result objects
                                                fill: false,
                                                backgroundColor: 'rgb(75, 192, 192)',
                                                borderColor: 'rgba(75, 192, 192, 0.2)',
                                            }],
                                          }}
                                        />
  )
}
