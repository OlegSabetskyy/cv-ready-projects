import FiltersPopover from "../components/FiltersPopover";
import { updateSearchFilter } from "../features/clientsTableSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Button from "./Button";

const ClientsHeader = ({ openDeleteModal }) => {
    const searchValue = useSelector(
        (state) => state.clientsTable.value.filters.search
    );
    const dispatch = useDispatch();

    return (
        <div className="flex justify-between gap-2 md:gap-4">
            <div className="relative flex grow">
                <input
                    variant="text"
                    placeholder="Search"
                    className="rounded-2xl bg-slate-100 h-full w-full placeholder:text-slate-500 placeholder:text-base py-2 pr-4 pl-10 outline-none"
                    id="search-input"
                    value={searchValue}
                    onChange={(ev) =>
                        dispatch(updateSearchFilter(ev.currentTarget.value))
                    }
                />
                <MagnifyingGlassIcon
                    className="text-slate-400 absolute top-2 left-2 h-6"
                    onClick={() =>
                        document.getElementById("search-input").focus()
                    }
                />
            </div>
            <DeleteSelectedBtn openDeleteModal={openDeleteModal} />
            <FiltersPopover />
        </div>
    );
};

const DeleteSelectedBtn = ({ openDeleteModal }) => {
    const selectedRows = useSelector(
        (state) => state.clientsTable.value.selectedRows
    );

    if (!Object.keys(selectedRows).length) return null;
    return (
        <Button variant="secondary" onClick={openDeleteModal}>
            Delete selected
        </Button>
    );
};

export default ClientsHeader;
