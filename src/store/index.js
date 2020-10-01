import { createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import rootReducer from "./reducer"

// Create persist config
const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer) // Creating persist reducer
const store = createStore(persistedReducer) // Creating store
const persistor = persistStore(store) // Createing persist store 

export { store, persistor }