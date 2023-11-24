import { configureStore, combineReducers } from '@reduxjs/toolkit';
import layoutSlice from './reducers/LayoutReducer';
import projectSlice from './reducers/ProjectReducer';
import tasksSlice from './reducers/TaskReducer';

const rootReducer = combineReducers({
    layoutSlice,
    projectSlice,
    tasksSlice
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type Store = ReturnType<typeof setupStore>
export type Dispatch = Store['dispatch']