import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import './Sidebar.scss'
import TodolistSidebar from './TodolistSidebar'
import KanbanSidebar from './KanbanSidebar'

export default function Sidebar() {
	const {openedSidebar} = useAppSelector(state => state.layoutSlice)
	const {pathname} = useLocation()
	

	return (<div className='sidebar' style={{width: openedSidebar ? '260px' : '0px'}}>
		{pathname.startsWith('/kanban') ? <KanbanSidebar/> : <TodolistSidebar/>}
	</div>)
}
