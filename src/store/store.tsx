import { configureStore, combineReducers } from '@reduxjs/toolkit';
import layoutSlice from './reducers/LayoutReducer';
import projectSlice from './reducers/ProjectReducer';
import tasksSlice from './reducers/TaskReducer';
import kanbanSlice from './reducers/KanbanReducer';

const rootReducer = combineReducers({
    layoutSlice,
    projectSlice,
    tasksSlice,
    kanbanSlice
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type Store = ReturnType<typeof setupStore>
export type Dispatch = Store['dispatch']