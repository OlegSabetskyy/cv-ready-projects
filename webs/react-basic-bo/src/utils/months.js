const getPreviousAndCurrentMonths = (limit = 5) => {
    let currentMonth = new Date();
    let months = [];

    for (let x = 0; x < limit; x++) {
        months.push(formatDateToMonth(currentMonth));
        currentMonth.setMonth(currentMonth.getMonth() - 1);
    }

    return months.reverse();
};

const formatDateToMonth = (date) =>
    date.toLocaleString("en-us", { month: "long" });

export { getPreviousAndCurrentMonths };
