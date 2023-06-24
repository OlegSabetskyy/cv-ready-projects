import React from "react";

const Button = React.forwardRef(
    (
        {
            children,
            variant = "primary",
            className: extraClassNames = "",
            onClick,
            ...extraProps
        },
        ref
    ) => {
        const primaryBtnClassNames =
            "bg-blue-600 text-blue-50 hover:bg-blue-700";
        const secondaryBtnClassNames =
            "bg-blue-50 text-blue-700 hover:bg-blue-100";
        const deleteBtnClassNames = "bg-red-600 text-red-50 hover:bg-red-700";
        const deleteSecondaryBtnClassNames =
            "bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700";
        let variantClassNames = "";

        switch (variant) {
            case "primary":
                variantClassNames = primaryBtnClassNames;
                break;
            case "secondary":
                variantClassNames = secondaryBtnClassNames;
                break;
            case "delete":
                variantClassNames = deleteBtnClassNames;
                break;
            case "delete-secondary":
                variantClassNames = deleteSecondaryBtnClassNames;
                break;
        }

        return (
            <button
                className={`flex gap-2 px-3 py-2 rounded-2xl items-center ${variantClassNames} ${extraClassNames} outline-none`}
                onClick={onClick}
                ref={ref}
                {...extraProps}
            >
                {children}
            </button>
        );
    }
);

export default Button;
