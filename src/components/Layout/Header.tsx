import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { layoutSlice } from '../../store/reducers/LayoutReducer'
import './Header.scss'

export default function Header(){
    const {changeSidebarVisibility} = layoutSlice.actions
    const dispatch = useAppDispatch()

    return (<header className="header">
        <button onClick={() => dispatch(changeSidebarVisibility())} className="header__gamburger"/>
    </header>)
}