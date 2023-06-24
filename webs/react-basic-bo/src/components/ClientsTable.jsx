import { useState, useMemo, useEffect } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel
} from "@tanstack/react-table";
import Checkbox from "./Checkbox";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    EyeIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchClients,
    setSelectedRows,
    updateSearchFilter
} from "../features/clientsTableSlice";
import "react-toastify/dist/ReactToastify.css";

const ClientsTable = ({
    openDeleteModal,
    setItemIdOnWhichDeleteModalWasOpened,
    openDrawerDetails,
    updateDetailsOnDisplay,
    triggerSelectReRender,
    resetTriggerSelectReRender
}) => {
    const clientsTable = useSelector((state) => state.clientsTable.value);
    const dispatch = useDispatch();
    const [sorting, setSorting] = useState([]);
    const [selectedRows, setRowSelection] = useState({});
    const columnHelper = createColumnHelper();
    const [columnFilters, setColumnFilters] = useState([]);

    const columns = useMemo(() => [
        columnHelper.display({
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler()
                    }}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    {...{
                        checked: row.getIsSelected(),
                        onChange: row.getToggleSelectedHandler()
                    }}
                />
            )
        }),
        ...["id", "name", "surname", "email", "country", "phone"].map((item) =>
            columnHelper.accessor(item.toString(), {
                header: (row) => <HeaderWrapper>{row.header.id}</HeaderWrapper>,
                cell: (row) => (
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {row.getValue()}
                    </span>
                ),
                enableColumnFilter: true
            })
        ),
        columnHelper.display({
            id: "details",
            cell: ({ row }) => (
                <Button
                    variant="secondary"
                    className={
                        "flex items-center justify-center w-8 aspect-square rounded-lg !p-0"
                    }
                    onClick={() => {
                        setItemIdOnWhichDeleteModalWasOpened(
                            row.getValue("id")
                        );
                        updateDetailsOnDisplay(row.original);
                        openDrawerDetails();
                    }}
                >
                    <EyeIcon className="w-4 aspect-square" />
                </Button>
            )
        }),
        columnHelper.display({
            id: "delete",
            cell: ({ row }) => (
                <Button
                    variant="delete-secondary"
                    className={
                        "flex items-center justify-center w-8 aspect-square rounded-lg !p-0"
                    }
                    onClick={() => {
                        setItemIdOnWhichDeleteModalWasOpened(
                            row.getValue("id")
                        );
                        openDeleteModal();
                    }}
                >
                    <TrashIcon className="w-4 aspect-square" />
                </Button>
            )
        })
    ]);

    const table = useReactTable({
        data: clientsTable.clients,
        columns,
        state: {
            sorting,
            rowSelection: selectedRows,
            globalFilter: clientsTable.filters.search,
            columnFilters
        },
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => row.id,

        // row selection
        enableRowSelection: true,
        onRowSelectionChange: (value) => {
            setRowSelection(value);
        },

        // sort
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        // pagination
        getPaginationRowModel: getPaginationRowModel(),

        // filters
        enableFilters: true,
        enableGlobalFilter: true,
        enableColumnFilters: true,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: (val) => dispatch(updateSearchFilter(val)),
        globalFilterFn: (row, columnId, value) => {
            return row
                .getValue(columnId)
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase());
        }
    });

    useEffect(() => {
        dispatch(
            setSelectedRows(
                table.getSelectedRowModel().rows.map((row) => row.original)
            )
        );
    }, [selectedRows]);

    // fetch clients
    useEffect(() => {
        dispatch(fetchClients());
    }, []);

    // update table filters
    useEffect(() => {
        const translateInternalFiltersToTable = () => {
            const tableFilters = [];

            // filter by id
            if (clientsTable.filters.id.min !== undefined) {
                tableFilters.push({
                    id: "id",
                    value: [
                        clientsTable.filters.id.min.toString(),
                        clientsTable.filters.id.max.toString()
                    ]
                });
            }

            // filter by country
            if (clientsTable.filters.id.min !== undefined) {
                tableFilters.push({
                    id: "country",
                    value: clientsTable.filters.country
                });
            }

            // filter by emailProvider
            if (clientsTable.filters.emailProvider !== undefined) {
                tableFilters.push({
                    id: "email",
                    value: "@" + clientsTable.filters.emailProvider
                });
            }

            return tableFilters;
        };

        setColumnFilters(translateInternalFiltersToTable);
    }, [clientsTable.filters]);

    // update selected rows on the rowSelection variable
    useEffect(() => {
        if (!triggerSelectReRender) return;

        const selectedRowsObj = {};
        const selectedRowsArray = table
            .getSelectedRowModel()
            .rows.map((row) => row.original.id);

        selectedRowsArray.map(
            (selectedRow) => (selectedRowsObj[selectedRow] = true)
        );

        setRowSelection(selectedRowsObj);
        resetTriggerSelectReRender();
    }, [triggerSelectReRender]);

    return (
        <div className="flex flex-col gap-4">
            {/* table header */}
            <div className="flex border-b-[1px] border-slate-100 border-dashed pb-3.5">
                {table.getHeaderGroups().map((headerGroup) => (
                    <div
                        key={headerGroup.id}
                        className="flex flex-grow gap-5 space-between"
                    >
                        {headerGroup.headers.map((header) => (
                            <div
                                key={header.id}
                                className={`flex ${
                                    headerClassNamesPerColumn[header.id] || ""
                                }`}
                            >
                                <div
                                    className={`flex select-none
                                            ${
                                                header.column.getCanSort()
                                                    ? "cursor-pointer justify-between items-center gap-4"
                                                    : ""
                                            }
                                            `}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}

                                    {getSortIcon(header.column.getIsSorted())}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* table body */}
            <div className="flex flex-col gap-5">
                {table.getRowModel().rows.map((row) => (
                    <div className="flex gap-5" key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <div
                                key={cell.id}
                                className={`flex ${
                                    headerClassNamesPerColumn[
                                        cell.id.split("_")[1]
                                    ] || ""
                                }
                                    `}
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* pagination */}
            <div className="flex gap-4 justify-center pt-2">
                {Array.from({ length: table.getPageCount() }, (_, index) => (
                    <Button
                        onClick={() => table.setPageIndex(index)}
                        className={"rounded-lg w-8 h-8 p-0 flex justify-center"}
                        key={index}
                        variant={
                            table.getState().pagination.pageIndex == index
                                ? "primary"
                                : "secondary"
                        }
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        </div>
    );
};

const getSortIcon = (direction) => {
    const classes = "w-3 text-slate-300";
    switch (direction) {
        case "asc":
            return <ChevronUpIcon className={classes} />;
        case "desc":
            return <ChevronDownIcon className={classes} />;
    }
};

const HeaderWrapper = ({ children, className: extraClassNames }) => {
    return (
        <span
            className={`flex uppercase text-slate-400 font-normal ${extraClassNames}`}
        >
            {children}
        </span>
    );
};

const headerClassNamesPerColumn = {
    id: "w-10",
    name: "w-20",
    surname: "w-36 hidden min-[450px]:flex",
    email: "w-64 hidden min-[700px]:flex",
    country: "w-24 hidden min-[900px]:flex",
    phone: "w-36 hidden min-[1000px]:flex",
    delete: "hidden flex-grow justify-end min-[1000px]:flex",
    details: "flex flex-grow justify-end min-[1000px]:hidden"
};

export default ClientsTable;
