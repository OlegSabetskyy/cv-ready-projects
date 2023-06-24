import DashboardCard from "./DashboardCard";

const SalesPercentageCard = () => {
    let sales = parseInt(Math.random() * 100);
    let salesTarget = 100;
    let salesPercentage = ((sales / salesTarget) * 100).toFixed(0);

    return (
        <DashboardCard
            number={sales}
            title="Sales"
            bgColor="blue"
            numberFormat="normal"
        >
            <div className="flex flex-col h-full justify-end">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                        <p className="text-blue-100 text-base sm:text-lg">
                            {salesTarget - sales} pending
                        </p>
                        <p className="text-blue-100 text-base sm:text-lg">
                            {salesPercentage} %
                        </p>
                    </div>

                    <div className="h-2 rounded-full overflow-hidden bg-blue-400 sm:h-3">
                        <div
                            className="bg-white h-full rounded-full"
                            style={{ width: `${salesPercentage}%` }}
                        />
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
};

export default SalesPercentageCard;
