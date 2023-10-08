import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import calendarIcon from '../../assets/icons/calendar-icon.svg'
import arrowIcon from '../../assets/icons/arrow-list-icon.svg'
import boxIcon from '../../assets/icons/box-icon.svg'
import './Sidebar.scss'
import { NavLink } from 'react-router-dom'
import Modal from './Modal'
import { layoutSlice } from '../../store/reducers/LayoutReducer'
import { IProject } from '../../models/IProject'
import { useState } from 'react'

export default function Sidebar() {
	const {openedSidebar} = useAppSelector(state => state.layoutSlice)
	const {projects} = useAppSelector(state => state.projectSlice)
	const {changeModalVisibility} = layoutSlice.actions
	const dispatch = useAppDispatch()

	const [openedList, setOpenedList] = useState<boolean>(false);

	return (<div className='sidebar' style={{width: openedSidebar ? '22%' : '0px'}}>
		<ul className='sidebar__sections'>
			<NavLink to={'/'} className={({isActive}) => (isActive ? 'active' : '')}>
				<li className='sidebar__section section'>
					<img src={calendarIcon} className='section__icon'/>
					<span className='section__title'>Сегодня</span>
				</li>
			</NavLink>
			<NavLink to={'/kanban'}>
				<li className='sidebar__section section'>
					<img src={boxIcon} className='section__icon'/>
					<span className='section__title'>Все задачи</span>
				</li>
			</NavLink>
		</ul>
		<div className="sidebar__projects projects">
			<div className="projects__header">
				<h2 className='projects__title'>Проекты</h2>
				<div className='projects__buttons buttons'>
					<button className='buttons__add' onClick={() => dispatch(changeModalVisibility())}/>
					<button 
						className='buttons__roll button'
						onClick={() => setOpenedList((prevState) => !prevState)}
					>
						<img 
							className='button__arrow'
							src={arrowIcon} 
							style={{rotate: openedList ? '0deg' : '90deg' }}
						/>
					</button>
				</div>
			</div>
			<ul className="projects__list" style={{maxHeight: openedList ? projects.length * 70 : 0}}>
				{projects.map((project: IProject, i) => <li className='projects__item' key={i}>
					{project.name}
				</li>)}
			</ul>
		</div>
		<Modal>gfhj</Modal>
	</div>)
}
