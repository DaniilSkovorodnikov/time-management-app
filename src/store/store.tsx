import { configureStore, combineReducers } from '@reduxjs/toolkit'
import layoutSlice from './reducers/LayoutReducer'

const rootReducer = combineReducers({
    layoutSlice
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type Store = ReturnType<typeof setupStore>
export type Dispatch = Store['dispatch']