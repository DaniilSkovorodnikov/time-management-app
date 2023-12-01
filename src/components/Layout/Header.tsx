import { Link, NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { layoutSlice } from '../../store/reducers/LayoutReducer'
import './Header.scss'

export default function Header(){
    const {changeSidebarVisibility} = layoutSlice.actions
    const dispatch = useAppDispatch()

    return (<header className="header">
        <button onClick={() => dispatch(changeSidebarVisibility())} className="header__hamburger"/>
        <div className="header__navigation">
            <NavLink to="/" className={({isActive}) => isActive ? 'header__active' : ''}>Список</NavLink>
            /
            <NavLink to="/kanban" className={({isActive}) => isActive ? 'header__active' : ''}>Доска</NavLink>
        </div>
    </header>)
}