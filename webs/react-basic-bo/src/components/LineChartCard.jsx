import { formatCurrency } from "../utils/format";
import DashboardCard from "./DashboardCard";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getPreviousAndCurrentMonths } from "../utils/months";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
);

const LineChartCard = () => {
    const lineChartLabels = getPreviousAndCurrentMonths(5);
    const lineChartDataSet = lineChartLabels.map(() =>
        parseFloat(Math.random() * 1000)
    );
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        showTooltips: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context) => formatCurrency(context.raw)
                },
                displayColors: false,
                intersect: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                },
                border: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                },
                border: {
                    display: false
                }
            }
        }
    };
    const data = {
        labels: lineChartLabels,
        datasets: [
            {
                fill: false,
                data: lineChartDataSet,
                borderColor: "#2563EB",
                lineTension: 0.33,
                borderWidth: 5
            }
        ]
    };

    return (
        <DashboardCard number={lineChartDataSet.at(-1)} title="Sales">
            <Line options={options} data={data} className="!w-full" />
        </DashboardCard>
    );
};

export default LineChartCard;
