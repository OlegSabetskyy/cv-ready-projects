import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartCard = () => {
    const colors = ["#2563EB", "#86efac", "#f87171", "#facc15", "#22d3ee"];
    const labels = ["Shirts", "Pants", "Shoes", "Accessories", "Jackets"];
    const dataSet = colors.map(() => parseInt(Math.random() * 100));
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                displayColors: false,
                intersect: false
            },
            htmlLegend: {
                // ID of the container to put the legend in
                containerID: "legend-container"
            }
        }
    };
    const data = {
        labels,
        datasets: [
            {
                data: dataSet,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 0
            }
        ]
    };

    return (
        <DashboardCard title="Sales per category">
            <div className="flex h-full grow w-full justify-center">
                <div className="flex justify-around grow">
                    <Doughnut
                        data={data}
                        redraw={true}
                        options={options}
                        plugins={[htmlLegendPlugin, showOnInit]}
                        // display none bc on first render it appears too big
                        style={{ display: "none" }}
                    />
                    <div className="flex items-center" id="legend-container" />
                </div>
            </div>
        </DashboardCard>
    );
};

const showOnInit = {
    id: "hideOnInit",
    beforeDraw(chart, args, options) {
        setTimeout(() => {
            // if changing pages fast then this throws an undefined error
            try {
                chart.canvas.style.display = "flex";
            } catch {}
        }, 1);
    }
};

const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector("ul");

    if (!listContainer) {
        listContainer = document.createElement("ul");
        listContainer.classList = "flex flex-col m-0 p-0 gap-1";
        legendContainer.appendChild(listContainer);
    }

    return listContainer;
};

const htmlLegendPlugin = {
    id: "htmlLegend",
    afterUpdate(chart, args, options) {
        let ul, items, dataSet;

        ul = getOrCreateLegendList(chart, options.containerID);
        // Remove old legend items
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        items = chart.options.plugins.legend.labels.generateLabels(chart);
        dataSet = chart.data.datasets[0].data;

        // sort in descending order
        items = items.sort((itemA, itemB) => {
            if (dataSet[itemA.index] > dataSet[itemB.index]) return -1;
            return 0;
        });

        items.forEach((item) => {
            let li, boxSpan, textContainer, text, number;

            li = document.createElement("li");
            li.classList = "flex cursor-pointer items-center";
            li.onclick = () => {
                chart.toggleDataVisibility(item.index);
                chart.update();
            };

            // Color box
            // if changing pages fast then this throws an undefined error
            try {
                boxSpan = document.createElement("span");
                boxSpan.classList =
                    "rounded-full h-4 aspect-square mr-3 sm:h-5";
                boxSpan.style.background = item.fillStyle;
                boxSpan.style.borderColor = item.strokeStyle;
                boxSpan.style.borderWidth = item.lineWidth + "px";
            } catch {}

            // Text container
            textContainer = document.createElement("div");
            textContainer.classList = `flex select-none w-28 justify-between ${
                item.hidden ? "line-through" : ""
            } sm:w-24 md:w-28 lg:w-40`;

            // Text
            text = document.createElement("span");
            text.textContent = item.text;
            text.classList =
                "text-slate-500 text-sm sm:text-slate-700 sm:text-base";

            // Number
            number = document.createElement("span");
            number.textContent = dataSet[item.index];
            number.classList =
                "text-slate-900 text-sm sm:text-base sm:font-semibold";

            textContainer.appendChild(text);
            textContainer.appendChild(number);

            li.appendChild(boxSpan);
            li.appendChild(textContainer);
            ul.appendChild(li);
        });
    }
};

export default DoughnutChartCard;
