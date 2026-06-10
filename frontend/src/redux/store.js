// import {configureStore} from "@reduxjs/toolkit";
// import userSlice from "./userSlice";


// const store = configureStore({
//     reducer:{
//         user: userSlice
//     }
// })

// export default store;




// src/store/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from "./userSlice";

const rootReducer = combineReducers({
    user: userSlice
});

const persistConfig = {
    key: 'xsharko-ai',
    storage: storage.default,
    whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


export const persistor = persistStore(store);
