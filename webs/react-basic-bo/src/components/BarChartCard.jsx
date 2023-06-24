import DashboardCard from "./DashboardCard";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getPreviousAndCurrentMonths } from "../utils/months";
import { formatCurrency } from "../utils/format";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip
);

const BarChartCard = () => {
    const lineChartLabels = getPreviousAndCurrentMonths(5);
    const lineChartDataSet = lineChartLabels.map(() =>
        parseFloat(Math.random() * 100)
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
                displayColors: false
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
                data: lineChartDataSet,
                backgroundColor: "#86efac",
                borderColor: "#86efac"
            }
        ]
    };

    return (
        <DashboardCard number={lineChartDataSet.at(-1)} title="Expenses">
            <Bar options={options} data={data} className="!w-full" />
        </DashboardCard>
    );
};

export default BarChartCard;
