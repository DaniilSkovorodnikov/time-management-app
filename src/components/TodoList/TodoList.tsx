import { useAppSelector } from "../../hooks/redux"
import { IProject, IncomingProject, ProjectTypes, TodayProject } from "../../models/IProject";
import NewListForm from "./NewListForm";
import Project from "./Project";
import './TodoList.scss'
import { useMemo, useState } from 'react';

export default function TodoList() {
	const {activeProjectId, projects} = useAppSelector(state => state.projectSlice)

	const [newListFormActive, setNewListFormActive] = useState<boolean>(false);
	

	const activeProject = useMemo<IProject>(() => {
		const active = projects.find(project => project.id === activeProjectId);
		if(!active){
			return activeProjectId === TodayProject.id ? TodayProject : IncomingProject
		}
		return active
	}, [activeProjectId, projects])

	return (
		<div className="tasks">
			<div className="tasks__header">
				<h2 className="tasks__title">{activeProject.name}</h2>
				{activeProject.type === ProjectTypes.Custom && <div className="tasks__headerButtons">
					<button className="tasks__addList" onClick={() => setNewListFormActive(true)} />
				</div>}
			</div>
			{activeProject.lists && activeProject.lists.map((list: string, i: number) => <Project name={list} key={i}/>)}
			{ newListFormActive && <NewListForm onHide={() => setNewListFormActive(false)}/>}
		</div>
	)
}
