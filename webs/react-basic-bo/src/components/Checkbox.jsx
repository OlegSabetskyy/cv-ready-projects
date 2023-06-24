import { useEffect, useRef } from "react";

const Checkbox = ({ indeterminate, ...props }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !props.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            ref={ref}
            type="checkbox"
            className="
                appearance-none bg-slate-100 rounded-lg w-6 h-6 cursor-pointer
                checked:bg-blue-600 bg-checkbox-tick checked:bg-[url('/check.svg')] 
                indeterminate:bg-[url('/hyphen.svg')] indeterminate:bg-blue-600
            "
            {...props}
        />
    );
};

export default Checkbox;
