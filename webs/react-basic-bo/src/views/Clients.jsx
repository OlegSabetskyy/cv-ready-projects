import { useState } from "react";
import { createPortal } from "react-dom";
import ClientsTable from "../components/ClientsTable";
import { useSelector, useDispatch } from "react-redux/es/exports";
import DeleteModal from "../components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import { deleteClients } from "../features/clientsTableSlice";
import ClientsHeader from "../components/ClientsHeader";
import DetailsDrawer from "../components/DetailsDrawer";

const Clients = () => {
    const selectedRows = useSelector(
        (state) => state.clientsTable.value.selectedRows
    );
    const dispatch = useDispatch();

    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [
        itemIdOnWhichDeleteModalWasOpened,
        setItemIdOnWhichDeleteModalWasOpened
    ] = useState(0);
    const [drawerDetailsIsOpen, setDrawerDetailsIsOpen] = useState(false);
    const [currentDetailsDataOnDisplay, setCurrentDetailsDataOnDisplay] =
        useState({});
    const [deleteModalOneOrMany, setDeleteModalOneOrMany] = useState("one");
    const [triggerSelectReRender, setTriggerSelectReRender] = useState(false);

    return (
        <div className="flex flex-col gap-5 rounded-2xl bg-white p-4">
            <ClientsHeader
                openDeleteModal={() => {
                    setDeleteModalOneOrMany("many");
                    setDeleteModalIsOpen(true);
                }}
            />
            <ClientsTable
                openDeleteModal={() => {
                    setDeleteModalOneOrMany("one");
                    setDeleteModalIsOpen(true);
                }}
                setItemIdOnWhichDeleteModalWasOpened={
                    setItemIdOnWhichDeleteModalWasOpened
                }
                openDrawerDetails={() => setDrawerDetailsIsOpen(true)}
                updateDetailsOnDisplay={(id) =>
                    setCurrentDetailsDataOnDisplay(id)
                }
                triggerSelectReRender={triggerSelectReRender}
                resetTriggerSelectReRender={() =>
                    setTriggerSelectReRender(false)
                }
            />
            {/* details drawer */}
            <DetailsDrawer
                isOpen={drawerDetailsIsOpen}
                closeModal={() => setDrawerDetailsIsOpen(false)}
                details={currentDetailsDataOnDisplay}
                onDelete={() => {
                    setDeleteModalOneOrMany("one");
                    setDeleteModalIsOpen(true);
                }}
            />
            {/* delete modal */}
            <DeleteModal
                isOpen={deleteModalIsOpen}
                onClose={() => setDeleteModalIsOpen(false)}
                onDelete={() => {
                    dispatch(
                        deleteClients(
                            deleteModalOneOrMany == "one"
                                ? [itemIdOnWhichDeleteModalWasOpened]
                                : selectedRows.map(
                                      (selectedRow) => selectedRow.id
                                  )
                        )
                    );
                    setDeleteModalIsOpen(false);
                    setDrawerDetailsIsOpen(false);
                    toast.success("Deleted successfully");
                    setTriggerSelectReRender(true);
                }}
                oneOrMany={deleteModalOneOrMany}
            />
            {/* toast */}
            {createPortal(<ToastContainer />, document.getElementById("root"))}
        </div>
    );
};

export default Clients;
