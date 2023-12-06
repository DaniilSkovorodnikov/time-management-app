import { useAppDispatch } from "../../hooks/redux";
import { IList } from "../../models/IProject";
import { ITask } from "../../models/ITask";
import { projectSlice } from "../../store/reducers/ProjectReducer";
import NewTaskForm from "./NewTaskForm";
import { useState } from 'react';
import Task from "./Task";
import editIcon from '../../assets/icons/edit-icon.svg'
import deleteIcon from '../../assets/icons/delete-icon.svg'
import InlineEditNameForm from "./InlineEditNameForm";
import { deleteList, editList } from "../../store/actionCreators/ProjectsActions";
import ConfirmModal from "../UI/ConfirmModal";

export default function TaskList({list, tasks}: TaskListProps){
    const {changeActiveSection} = projectSlice.actions
    const dispatch = useAppDispatch()

    const [activeTaskForm, setActiveTaskForm] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false);
    const [openedDeleteListModal, setOpenedDeleteListModal] = useState<boolean>(false)
    
    return (
    <div className="tasks__list">
        <div className="tasks__header">
            {editMode ?
             <InlineEditNameForm
                defaultName={list.name}
                onCancel={() => setEditMode(false)}
                asyncSubmit={(updatedName) => editList(dispatch, {...list, name: updatedName})}
             /> :
             <>
                <h2 className="tasks__subtitle">{list.name}</h2>
                <div className="tasks__buttons">
                    <button className="tasks__listEdit" onClick={() => setEditMode(true)}>
                        <img src={editIcon}/>
                    </button>
                    <button className="tasks__listDelete" onClick={() => setOpenedDeleteListModal(true)}>
                        <img src={deleteIcon}/>
                    </button>
                </div>
             </>}
        </div>
        <ul>
            {tasks.map(task => <li key={task.id}>
                    <Task task={task}/>
                </li>)}
        </ul>
        {activeTaskForm && <NewTaskForm onHide={() => setActiveTaskForm(false)}/>}
        {!activeTaskForm && <button className="tasks__addTask" onClick={() => {
            dispatch(changeActiveSection(list.id))
            setActiveTaskForm(true)
            }}>Добавить задачу</button>}
        <ConfirmModal
            title='Удалить раздел?'
            show={openedDeleteListModal}
            onHide={() => setOpenedDeleteListModal(false)}
            onConfirm={() => deleteList(dispatch, list.id)}
        />
    </div>
    )
}

interface TaskListProps{
    list: IList,
    tasks: ITask[]
}