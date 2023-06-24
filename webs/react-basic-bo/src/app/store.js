import { configureStore } from "@reduxjs/toolkit";
import clientsTableReducer from "../features/clientsTableSlice";

const store = configureStore({
    reducer: {
        clientsTable: clientsTableReducer
    }
});

export { store };
