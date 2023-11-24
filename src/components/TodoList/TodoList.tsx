import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { IList, IProject, IncomingProject, ProjectTypes, TodayProject } from "../../models/IProject";
import { projectSlice } from "../../store/reducers/ProjectReducer";
import NewListForm from "./NewListForm";
import NewTaskForm from "./NewTaskForm";
import Task from "./Task";
import TaskList from "./TasksList";
import './TodoList.scss'
import { useMemo, useState, useEffect } from 'react';
import editIcon from '../../assets/icons/edit-icon.svg'
import EditProjectForm from "./EditProjectForm";
import deleteIcon from '../../assets/icons/delete-icon.svg'
import Modal from "../Layout/Modal";
import { deleteProject } from "../../store/actionCreators/ProjectsActions";

export default function TodoList() {
	const {changeActiveSection} = projectSlice.actions
    const dispatch = useAppDispatch()
	const {activeProjectId, projects, tasksLists} = useAppSelector(state => state.projectSlice)
	const {tasks} = useAppSelector(state => state.tasksSlice)

	const [newListFormActive, setNewListFormActive] = useState<boolean>(false);
	const [activeTaskForm, setActiveTaskForm] = useState<boolean>(false);
	const [activeProjectForm, setActiveProjectForm] = useState<boolean>(false);
	const [openedDeleteProjectModal, setOpenedDeleteProjectModal] = useState<boolean>(false)

	const activeProject = useMemo<IProject>(() => {
		const active = projects.find(project => project.id === activeProjectId);
		if(!active){
			return activeProjectId === TodayProject.id ? TodayProject : IncomingProject
		}
		return active
	}, [activeProjectId, projects])

	const projectTasks = useMemo(() => {
		const todayDate = (new Date()).toDateString()
		return tasks.filter(task => 
			task.projectId === activeProjectId || 
			activeProjectId === TodayProject.id && task.executionPeriod === todayDate ||
			activeProjectId === IncomingProject.id
		)
	},
	[tasks, activeProjectId])

	useEffect(() => {
		setActiveTaskForm(false)
	}, [activeProjectId])

	return (
		<div className="tasks">
			<div className="tasks__header">
				{activeProjectForm ?
					<EditProjectForm project={activeProject} onCancel={() => setActiveProjectForm(false)}/> :
					<h2 className="tasks__title">{activeProject.name}</h2>}
				{activeProject.type === ProjectTypes.Custom && !activeProjectForm && <div className="tasks__headerButtons">
					<button className="tasks__addList" onClick={() => setNewListFormActive(true)} />
					<button className="tasks__projectEdit" onClick={() => setActiveProjectForm(true)}>
						<img src={editIcon}/>
					</button>
					<button className="tasks__projectDelete" onClick={() => setOpenedDeleteProjectModal(true)}>
						<img src={deleteIcon}/>
					</button>
				</div>}
			</div>
			<ul>
				{projectTasks.filter(task => !task.sectionId || activeProjectId < 0).map(task => <li key={task.id}>
					<Task task={task}/>
				</li>)}
			</ul>
			{activeTaskForm && <NewTaskForm onHide={() => setActiveTaskForm(false)}/>}
			{!activeTaskForm && <button className="tasks__addTask" onClick={() => {
				dispatch(changeActiveSection(null))
				setActiveTaskForm(true)
				}}>Добавить задачу</button>}
			{tasksLists
				.filter(list => list.projectId === activeProjectId)
				.map((list: IList) => <TaskList
					list={list}
					tasks={projectTasks.filter(task => task.sectionId === list.id)}
					key={list.id}
				/>)}
			{ newListFormActive && <NewListForm onHide={() => setNewListFormActive(false)}/>}
			<Modal show={openedDeleteProjectModal} onHide={() => setOpenedDeleteProjectModal(false)} >
				<div className="deleteProject">
					<h2 className="deleteProject__title">Удалить проект?</h2>
					<div className="deleteProject__buttons">
						<button
							className="deleteProject__confirm"
							onClick={async() => {
								await deleteProject(dispatch, activeProjectId)
								setOpenedDeleteProjectModal(false)
								
							}}
						>
							Удалить
						</button>
						<button className="deleteProject__cancel" onClick={() => setOpenedDeleteProjectModal(false)}>Отменить</button>
					</div>
				</div>
			</Modal>
		</div>
	)
}
