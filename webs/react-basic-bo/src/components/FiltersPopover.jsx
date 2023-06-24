import { forwardRef, useEffect } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { Popover, Transition, Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { availableCountries, availableEmailProviders } from "../data/TableData";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
    resetFilters,
    updateCountryFilter,
    updateEmailProviderFilter,
    updateIdFilter
} from "../features/clientsTableSlice";
import * as Slider from "@radix-ui/react-slider";

const FiltersPopover = () => {
    const clients = useSelector((state) => state.clientsTable.value.clients);
    const dispatch = useDispatch();

    return (
        <Popover className="relative">
            <Popover.Button as={Fragment}>
                <Button>
                    <FunnelIcon className="h-6" />
                    <span>Filters</span>
                </Button>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
            >
                <Popover.Panel className="flex flex-col absolute z-10 mt-2 w-80 p-4 rounded-2xl bg-white gap-4 right-0 shadow-lg">
                    <p className="text-slate-500 text-base pb-2 origin-top-right border-b-[1px] border-slate-100 border-dashed">
                        Filter Options
                    </p>

                    <div className="flex flex-col gap-4">
                        {/* range slider */}
                        {clients.length ? (
                            <div className="flex flex-col gap-2 mb-4">
                                <SectionTitle>Id</SectionTitle>
                                <CustomSlider />
                            </div>
                        ) : undefined}

                        {/* country filter */}
                        <div className="flex flex-col gap-2">
                            <SectionTitle>Country</SectionTitle>
                            <CountrySelect />
                        </div>

                        {/* email provider */}
                        <div className="flex flex-col gap-2">
                            <SectionTitle>Email provider</SectionTitle>
                            <EmailProviderSelect />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            variant="secondary"
                            className="rounded-2xl"
                            onClick={() => dispatch(resetFilters())}
                        >
                            Reset
                        </Button>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};

const CustomSlider = forwardRef((props, forwardedRef) => {
    const clients = useSelector((state) => state.clientsTable.value.clients);
    const rangeSliderValues = useSelector(
        (state) => state.clientsTable.value.filters.id
    );
    const rangeSliderValuesArray = [
        rangeSliderValues.min,
        rangeSliderValues.max
    ];

    // for performance reasons, it's faster to use useState than directly invoke dispatch onValueChange
    const [currentSliderValues, setCurrentSliderValues] = useState(
        rangeSliderValuesArray
    );
    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentSliderValues([rangeSliderValues.min, rangeSliderValues.max]);
    }, [rangeSliderValues]);

    return (
        <Slider.Root
            defaultValue={rangeSliderValuesArray}
            value={currentSliderValues}
            onValueChange={setCurrentSliderValues}
            onValueCommit={([min, max]) =>
                dispatch(updateIdFilter({ min, max }))
            }
            min={clients[0].id}
            max={clients.slice(-1)[0].id}
            {...props}
            ref={forwardedRef}
            className="relative flex items-center h-4 touch-none select-none"
        >
            <Slider.Track className="relative flex flex-grow items-center bg-blue-50 h-1">
                <Slider.Range className="absolute bg-blue-500 h-1 rounded-full" />
            </Slider.Track>
            <Slider.Thumb className="flex rounded-full bg-blue-600 w-4 h-4 cursor-pointer focus:shadow-[0px_0px_0px_4px_rgba(0,0,0,0.15)] outline-none">
                <span className="text-base text-slate-500 mt-5 select-none w-full text-center">
                    {currentSliderValues[0]}
                </span>
            </Slider.Thumb>
            <Slider.Thumb className="flex rounded-full bg-blue-600 w-4 h-4 cursor-pointer focus:shadow-[0px_0px_0px_4px_rgba(0,0,0,0.15)] outline-none">
                <span className="text-base text-slate-500 mt-5 select-none w-full text-center">
                    {currentSliderValues[1]}
                </span>
            </Slider.Thumb>
        </Slider.Root>
    );
});

const SectionTitle = ({ children }) => {
    return <p className="text-base text-slate-900 capitalize">{children}</p>;
};

const CountrySelect = () => {
    const selectedCountry = useSelector(
        (state) => state.clientsTable.value.filters.country
    );
    const dispatch = useDispatch();

    return (
        <Listbox
            value={selectedCountry}
            onChange={(value) => dispatch(updateCountryFilter(value))}
            className="relative"
            as="div"
        >
            <Listbox.Button className="w-full rounded-2xl bg-slate-100 py-2 px-3 text-left">
                {({ open }) =>
                    selectedCountry ? (
                        <div className="flex gap-2">
                            <div
                                style={{
                                    backgroundImage:
                                        "url('/flags/" +
                                        capitalizeString(selectedCountry) +
                                        ".ico')",
                                    backgroundSize: "160%"
                                }}
                                className="rounded-full w-6 bg-center"
                            />
                            <span className="text-slate-600 text-base">
                                {selectedCountry}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
                                    className={`h-5 w-5 text-gray-400 transition-all ease-in-out ${
                                        open && "rotate-180"
                                    }`}
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                    ) : (
                        <span className="text-slate-600 text-base">&nbsp;</span>
                    )
                }
            </Listbox.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
            >
                <Listbox.Options className="absolute mt-2 w-full overflow-auto rounded-xl bg-white text-base shadow-lg z-10">
                    {availableCountries.map((availableCountry) => (
                        <Listbox.Option
                            key={availableCountry}
                            value={availableCountry}
                            className={({ active }) =>
                                `relative select-none py-2 px-4 ${
                                    active
                                        ? "bg-blue-500 text-white"
                                        : "text-slate-700"
                                }`
                            }
                        >
                            {({ selected }) => (
                                <div className="flex gap-2">
                                    <div
                                        style={{
                                            backgroundImage:
                                                "url('/flags/" +
                                                capitalizeString(
                                                    availableCountry
                                                ) +
                                                ".ico')",
                                            backgroundSize: "160%"
                                        }}
                                        className="rounded-full w-6 bg-center"
                                    />
                                    <span
                                        className={`${
                                            selected
                                                ? "font-medium"
                                                : "font-normal"
                                        }`}
                                    >
                                        {availableCountry}
                                    </span>
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    );
};

const EmailProviderSelect = () => {
    const selectedEmailProvider = useSelector(
        (state) => state.clientsTable.value.filters.emailProvider
    );
    const dispatch = useDispatch();

    return (
        <Listbox
            value={selectedEmailProvider}
            onChange={(value) => dispatch(updateEmailProviderFilter(value))}
            className="relative"
            as="div"
        >
            <Listbox.Button className="w-full rounded-2xl bg-slate-100 py-2 px-3 text-left">
                {({ open }) =>
                    selectedEmailProvider ? (
                        <div className="flex gap-2">
                            <span className="text-slate-600 text-base">
                                {selectedEmailProvider}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
                                    className={`h-5 w-5 text-gray-400 transition-all ease-in-out ${
                                        open && "rotate-180"
                                    }`}
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                    ) : (
                        <span className="text-slate-600 text-base">&nbsp;</span>
                    )
                }
            </Listbox.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
            >
                <Listbox.Options className="absolute mt-2 w-full overflow-auto rounded-xl bg-white text-base shadow-lg z-10">
                    {availableEmailProviders.map((availableEmailProvider) => (
                        <Listbox.Option
                            key={availableEmailProvider}
                            value={availableEmailProvider}
                            className={({ active }) =>
                                `relative select-none py-2 px-4 ${
                                    active
                                        ? "bg-blue-500 text-white"
                                        : "text-slate-700"
                                }`
                            }
                        >
                            {({ selected }) => (
                                <span
                                    className={`${
                                        selected ? "font-medium" : "font-normal"
                                    }`}
                                >
                                    {availableEmailProvider}
                                </span>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    );
};

function capitalizeString(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export default FiltersPopover;
