import { configureStore, combineReducers } from '@reduxjs/toolkit'
import layoutSlice from './reducers/LayoutReducer'
import projectSlice from './reducers/ProjectReducer';

const rootReducer = combineReducers({
    layoutSlice,
    projectSlice
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type Store = ReturnType<typeof setupStore>
export type Dispatch = Store['dispatch']