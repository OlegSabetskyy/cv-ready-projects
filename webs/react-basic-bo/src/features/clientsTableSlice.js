import { createSlice } from "@reduxjs/toolkit";
import { tableData } from "../data/TableData";

const clientsTableSlice = createSlice({
    name: "clientsTable",
    initialState: {
        value: {
            clients: [],
            selectedRows: [],
            deleteModalIsActive: false,
            filters: {
                search: "",
                id: {},
                country: "",
                emailProvider: ""
            }
        }
    },
    reducers: {
        fetchClients: (state) => {
            state.value.clients = tableData;
            state.value.filters.id = {
                min: state.value.clients[0].id,
                max: state.value.clients.slice(-1)[0].id
            };
        },
        deleteClients: (state, action) => {
            state.value.clients = state.value.clients.filter(
                (client) => !action.payload.includes(client.id)
            );

            // no clients left
            if (state.value.clients.length == 0) {
                state.value.filters.id = {
                    min: 0,
                    max: 0
                };
                return;
            }

            // there are still clients left
            if (state.value.filters.id.min < state.value.clients[0].id)
                state.value.filters.id.min = state.value.clients[0].id;

            if (
                state.value.filters.id.max >
                    state.value.clients.slice(-1)[0].id ||
                state.value.filters.id.max < state.value.filters.id.min
            )
                state.value.filters.id.max =
                    state.value.clients.slice(-1)[0].id;
        },
        updateSearchFilter: (state, action) => {
            state.value.filters.search = action.payload;
        },
        updateIdFilter: (state, action) => {
            state.value.filters.id = {
                min: action.payload.min,
                max: action.payload.max
            };
        },
        updateCountryFilter: (state, action) => {
            state.value.filters.country = action.payload;
        },
        updateEmailProviderFilter: (state, action) => {
            state.value.filters.emailProvider = action.payload;
        },
        resetFilters: (state) => {
            state.value.filters = {
                search: "",
                country: "",
                emailProvider: ""
            };

            if (state.value.clients.length) {
                state.value.filters.id = {
                    min: state.value.clients[0].id,
                    max: state.value.clients.slice(-1)[0].id
                };
            } else {
                state.value.filters.id = {
                    min: 0,
                    max: 0
                };
            }
        },
        setSelectedRows: (state, action) => {
            state.value.selectedRows = action.payload;
        }
    }
});

export default clientsTableSlice.reducer;
export const {
    fetchClients,
    deleteClients,
    updateSearchFilter,
    updateIdFilter,
    updateCountryFilter,
    updateEmailProviderFilter,
    resetFilters,
    setSelectedRows
} = clientsTableSlice.actions;
