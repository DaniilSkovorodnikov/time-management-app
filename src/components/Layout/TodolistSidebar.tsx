import calendarIcon from '../../assets/icons/calendar-icon.svg';
import arrowIcon from '../../assets/icons/arrow-list-icon.svg';
import boxIcon from '../../assets/icons/box-icon.svg';
import Modal from './Modal';
import { IProject, IncomingProject, TodayProject } from '../../models/IProject';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useState } from 'react';
import AddProjectForm from '../Sidebar/AddProjectForm';
import { projectSlice } from '../../store/reducers/ProjectReducer';
import './TodolistSidebar.scss'

export default function TodolistSidebar(){
    const {projects} = useAppSelector(state => state.projectSlice)
	const {changeActiveProject} = projectSlice.actions
	const dispatch = useAppDispatch()

	const [openedList, setOpenedList] = useState<boolean>(false);
	const [openedAddProjectModal, setOpenedAppProjectModal] = useState<boolean>(false)

    return (
        <div className='todolistSidebar'>
            <ul className='todolistSidebar__sections'>
                <li className='todolistSidebar__section section' onClick={() => dispatch(changeActiveProject(TodayProject.id))}>
                    <img src={calendarIcon} className='section__icon'/>
                    <span className='section__title'>Сегодня</span>
                </li>
                <li className='sidebar__section section' onClick={() => dispatch(changeActiveProject(IncomingProject.id))}>
                    <img src={boxIcon} className='section__icon'/>
                    <span className='section__title'>Все задачи</span>
                </li>
            </ul>
            <div className="todolistSidebar__projects projects">
                <div className="projects__header">
                    <h2 className='projects__title'>Проекты</h2>
                    <div className='projects__buttons buttons'>
                        <button className='buttons__add' onClick={() => setOpenedAppProjectModal(true)}/>
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
                <ul className="projects__list" style={{maxHeight: openedList ? projects.length * 40 : 0}}>
                    {projects.map((project: IProject) => <li 
                    className='projects__item' 
                    key={project.id} 
                    onClick={() => dispatch(changeActiveProject(project.id))}>
                        {project.name.length > 23 ? `${project.name.slice(0, 23)}...` : project.name}
                    </li>)}
                </ul>
            </div>
            <Modal show={openedAddProjectModal} onHide={() => setOpenedAppProjectModal(false)}>
                <AddProjectForm show={openedAddProjectModal} onHide={() => setOpenedAppProjectModal(false)}/>
            </Modal>
        </div>
    )
}