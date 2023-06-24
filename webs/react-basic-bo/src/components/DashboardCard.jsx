import { formatCurrency } from "../utils/format";

const DashboardCard = ({
    children,
    number,
    title,
    bgColor = "white",
    numberFormat = "decimal",
    extraContainerClass = ""
}) => {
    let hasNumber = number != undefined;

    return (
        <div
            className={`flex flex-col rounded-2xl p-4 h-60 grow basis-60 gap-8 ${getCardBgColorClassName(
                bgColor
            )} sm:basis-64 sm:h-64 ${extraContainerClass}`}
        >
            <div className="flex flex-col gap-2">
                {hasNumber && (
                    <h1 className={getNumberClassNames(bgColor)}>
                        {getNumberFormatted(number, numberFormat)}
                    </h1>
                )}

                <p className={getDescriptionClassNames(hasNumber, bgColor)}>
                    {title}
                </p>
            </div>
            <div
                className={`w-full grow ${getChildrenHeightClass(
                    hasNumber,
                    bgColor
                )}`}
            >
                {children}
            </div>
        </div>
    );
};

const getNumberFormatted = (number, format) => {
    switch (format) {
        case "normal":
            return number;
        case "decimal":
            return formatCurrency(number);
    }
};

const getChildrenHeightClass = (cardHasNumber, cardBgColor) => {
    if (cardHasNumber && cardBgColor == "white") return "h-20";
    else if (cardBgColor == "white") return "h-32";
    return "";
};

const getDescriptionClassNames = (cardHasNumber, cardBgColor) => {
    let classNames = [];
    let textColor;

    switch (cardBgColor) {
        case "white":
            textColor = "text-slate-900";
            break;

        case "blue":
            textColor = "text-blue-100";
            break;
    }
    classNames = [
        textColor,
        ...(cardHasNumber
            ? ["text-base", "sm:text-lg"]
            : ["text-xl", "font-black", "sm:text-3xl"])
    ];

    return classNames.join(" ");
};

const getNumberClassNames = (cardBgColor) => {
    let classNames = ["text-2xl", "font-black", "sm:text-4xl"];
    let textColor;

    switch (cardBgColor) {
        case "white":
            textColor = "text-slate-900";
            break;

        case "blue":
            textColor = "text-white";
            break;
    }
    classNames.push(textColor);

    return classNames.join(" ");
};

const getCardBgColorClassName = (cardBgColor) => {
    switch (cardBgColor) {
        case "white":
            return "bg-white";
        case "blue":
            return "bg-blue-600";
    }
};

export default DashboardCard;
