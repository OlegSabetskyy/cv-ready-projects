import LineChartCard from "../components/LineChartCard";
import BarChartCard from "../components/BarChartCard";
import DoughnutChartCard from "../components/DoughnutChartCard";
import SalesPercentageCard from "../components/SalesPercentageCard";

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-4 sm:gap-8">
            <LineChartCard />
            <BarChartCard />
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <DoughnutChartCard />
                <SalesPercentageCard />
            </div>
        </div>
    );
};

export default Dashboard;
