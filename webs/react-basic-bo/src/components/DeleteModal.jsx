import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";
import { TrashIcon } from "@heroicons/react/24/solid";

const DeleteModal = ({ isOpen, onClose, onDelete, oneOrMany = "one" }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="flex justify-center flex-col w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <TrashIcon className="w-28 aspect-square self-center text-red-500 mb-6" />

                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium text-center leading-6 text-slate-800 mb-4"
                                >
                                    Do you want to delete
                                    {oneOrMany == "one"
                                        ? " this client"
                                        : " the selected clients"}
                                    ?
                                </Dialog.Title>

                                <div className="flex gap-2 justify-center">
                                    <Button
                                        variant="secondary"
                                        onClick={onClose}
                                    >
                                        No
                                    </Button>
                                    <Button variant="delete" onClick={onDelete}>
                                        Yes
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DeleteModal;
