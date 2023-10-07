import { createSlice } from "@reduxjs/toolkit"

interface LayoutState{
    openedSidebar: boolean
}

const initialState: LayoutState = {
    openedSidebar: false
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        changeSidebarVisibility(state){
            state.openedSidebar = !state.openedSidebar
        }
    }
})

export default layoutSlice.reducer