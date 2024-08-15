import { combineReducers } from "redux"
import { persistReducer, persistStore } from "redux-persist"
import authReducer from "./../slices/AuthSlice.js"
import CustomersReducer from "./../slices/CustomersSlice.js"
import InstalmentTypeReducer from "./../slices/InstalmentTypeSlice.js"
import { configureStore } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: 'root',
    storage
}

const reducer = combineReducers({
    auth: persistReducer(persistConfig, authReducer),
    customers: persistReducer(persistConfig, CustomersReducer),
    instalmentType: persistReducer(persistConfig, InstalmentTypeReducer),
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        thunk
    })
});

const persistor = persistStore(store);

export { store, persistor };