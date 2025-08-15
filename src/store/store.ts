import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'
import { TodoApi } from '../api/todoApi'

export const store = configureStore({
    reducer: {

        [TodoApi.reducerPath]: TodoApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(TodoApi.middleware),
})

setupListeners(store.dispatch)