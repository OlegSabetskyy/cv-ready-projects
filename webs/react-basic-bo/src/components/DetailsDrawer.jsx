import Drawer from "../components/Drawer";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";

const DetailsDrawer = ({ isOpen, closeModal, details, onDelete }) => {
    return (
        <Drawer isOpen={isOpen} position="bottom" onClose={closeModal}>
            <div className="rounded-tl-2xl rounded-tr-2xl bg-white flex flex-col p-4 h-full gap-2">
                <button
                    className="self-end text-slate-500 hover:text-slate-800 focus:text-slate-800"
                    onClick={closeModal}
                >
                    <XMarkIcon className="w-8 h-8" />
                </button>

                <div className="flex flex-col gap-5 flex-grow overflow-y-auto">
                    {Object.entries(details).map(
                        ([key, value], index, array) => (
                            <div
                                key={index}
                                className={`flex flex-col gap-2 pb-4 ${
                                    index != array.length - 1 &&
                                    "border-b-[1px] border-slate-100 border-dashed"
                                }`}
                            >
                                <p className="text-slate-400 text-base capitalize">
                                    {key}
                                </p>
                                <p className="text-slate-900 text-base">
                                    {value}
                                </p>
                            </div>
                        )
                    )}
                </div>

                <Button
                    variant="delete"
                    className={"py-4 flex justify-center text-base"}
                    onClick={onDelete}
                >
                    Delete
                </Button>
            </div>
        </Drawer>
    );
};

export default DetailsDrawer;
