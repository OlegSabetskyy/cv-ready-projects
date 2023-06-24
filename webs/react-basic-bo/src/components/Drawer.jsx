import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Transition } from "@headlessui/react";
import ReactFocusLock from "react-focus-lock";

const Drawer = ({
    isOpen,
    children,
    containerClassName = "",
    drawerClassName = "",
    backdropClassName = "",
    onClose,
    position = "left"
}) => {
    const bodyRef = useRef(document.querySelector("body"));
    const portalRootRef = useRef(
        document.getElementById("drawer-root") || createPortalRoot()
    );

    // prevent scroll when drawer is open
    useEffect(() => {
        const updatePageScroll = () => {
            if (isOpen) bodyRef.current.classList.add("overflow-hidden");
            else bodyRef.current.classList.remove("overflow-hidden");
        };

        updatePageScroll();
    }, [isOpen]);

    // Append portal root on mount
    useEffect(() => {
        bodyRef.current.appendChild(portalRootRef.current);
        const portal = portalRootRef.current;
        const bodyEl = bodyRef.current;

        return () => {
            // Clean up the portal when drawer component unmounts
            portal.remove();
            // Ensure scroll overflow is removed
            bodyEl.classList.remove("overflow-hidden");
        };
    }, []);

    // close with ESC key
    useEffect(() => {
        const onKeyPress = (ev) => {
            if (ev.key == "Escape") onClose();
        };

        if (isOpen) window.addEventListener("keydown", onKeyPress);

        return () => window.removeEventListener("keydown", onKeyPress);
    }, [isOpen]);

    return createPortal(
        <div
            aria-hidden={isOpen ? "true" : "false"}
            className={`${containerClassName}`}
        >
            {/* drawer */}
            <ReactFocusLock>
                <Transition
                    role="dialog"
                    show={isOpen}
                    className={`fixed z-30 inset-y-0 ${drawerClassName}`}
                    enter="transition-all ease-in-out duration-200"
                    enterFrom={getDrawerClassesPerPosition(position, false)}
                    enterTo={getDrawerClassesPerPosition(position, true)}
                    leave="transition-all ease-in-out duration-300"
                    leaveFrom={getDrawerClassesPerPosition(position, true)}
                    leaveTo={getDrawerClassesPerPosition(position, false)}
                >
                    {children}
                </Transition>
            </ReactFocusLock>

            {/* backdrop */}
            <Transition
                role="backdrop"
                show={isOpen}
                className={`fixed inset-0 z-20 bg-black/[.5] ${backdropClassName}`}
                enter="transition-opacity ease-in-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                onClick={onClose}
            />
        </div>,
        portalRootRef.current
    );
};

function createPortalRoot() {
    const drawerRoot = document.createElement("div");
    drawerRoot.setAttribute("id", "drawer-root");

    return drawerRoot;
}

function getDrawerClassesPerPosition(position = "left", isOpen) {
    // dynamically generated classes don't work for tailwind, so I define them this way...
    const commonXClassNames = "inset-x-1/4";
    const commonYClassNames = "bottom-0 inset-x-0";
    const classNames = {
        left: {
            closed: "left-0 -translate-x-full",
            open: "left-0 translate-x-0"
        },
        right: {
            closed: "right-0 translate-x-full",
            open: "right-0 translate-x-0"
        },
        bottom: {
            closed: "translate-y-full",
            open: "translate-y-0 inset-x-0"
        },
        top: {
            closed: "-translate-y-full",
            open: "translate-y-0"
        }
    };
    const commonClassNames =
        position == "left" || position == "right"
            ? commonXClassNames
            : commonYClassNames;
    const classOnPosition = classNames[position];

    return `${commonClassNames} ${classOnPosition[isOpen ? "open" : "closed"]}`;
}

export default Drawer;
