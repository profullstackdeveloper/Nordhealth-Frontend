import { configureStore } from "@reduxjs/toolkit";
import { basicApi } from "./basicApi";

export const store = configureStore({
    reducer: {
        [basicApi.reducerPath]: basicApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(basicApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch