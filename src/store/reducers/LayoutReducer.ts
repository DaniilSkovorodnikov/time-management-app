import { createSlice } from "@reduxjs/toolkit"

interface LayoutState{
    openedSidebar: boolean,
    openedModal: boolean
}

const initialState: LayoutState = {
    openedSidebar: false,
    openedModal: false
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        changeSidebarVisibility(state){
            state.openedSidebar = !state.openedSidebar
        },
        changeModalVisibility(state){
            state.openedModal = !state.openedModal
        },
    }
})

export default layoutSlice.reducer