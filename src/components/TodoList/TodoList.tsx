import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { IList, IProject, IncomingProject, ProjectTypes, TodayProject } from "../../models/IProject";
import { projectSlice } from "../../store/reducers/ProjectReducer";
import NewListForm from "./NewListForm";
import NewTaskForm from "./NewTaskForm";
import Task from "./Task";
import TaskList from "./TasksList";
import './TodoList.scss'
import { useMemo, useState, useEffect } from 'react';

export default function TodoList() {
	const {changeActiveSection} = projectSlice.actions
    const dispatch = useAppDispatch()
	const {activeProjectId, projects, tasksLists} = useAppSelector(state => state.projectSlice)
	const {tasks} = useAppSelector(state => state.tasksSlice)
	const [newListFormActive, setNewListFormActive] = useState<boolean>(false);
	const [activeTaskForm, setActiveTaskForm] = useState<boolean>(false)	

	const activeProject = useMemo<IProject>(() => {
		const active = projects.find(project => project.id === activeProjectId);
		if(!active){
			return activeProjectId === TodayProject.id ? TodayProject : IncomingProject
		}
		return active
	}, [activeProjectId, projects])

	const projectTasks = useMemo(() => {
		const todayDate = (new Date()).toISOString().split('T')[0]
		return tasks.filter(task => 
			task.projectId === activeProjectId || 
			activeProjectId === TodayProject.id && task.executionPeriod.includes(todayDate) ||
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
				<h2 className="tasks__title">{activeProject.name}</h2>
				{activeProject.type === ProjectTypes.Custom && <div className="tasks__headerButtons">
					<button className="tasks__addList" onClick={() => setNewListFormActive(true)} />
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
				.filter(list => list.parentProjectId === activeProjectId)
				.map((list: IList) => <TaskList
					list={list}
					tasks={projectTasks.filter(task => task.sectionId === list.id)}
					key={list.id}
				/>)}
			{ newListFormActive && <NewListForm onHide={() => setNewListFormActive(false)}/>}
		</div>
	)
}
