import { SubmitHandler, useForm } from 'react-hook-form';
import './NewListForm.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addNewList } from '../../store/actionCreators/ProjectsActions';
import { IList } from '../../models/IProject';

export default function NewListForm({onHide}: ListFormProps) {
    const {activeProjectId, tasksLists} = useAppSelector(state => state.projectSlice)
    const dispatch = useAppDispatch()
    const {register, handleSubmit} = useForm<{name: string}>({
        mode: 'onBlur'
    });
   
    const onSubmit: SubmitHandler<{name: string}> = (data) => {
        const newList: IList = {
            name: data.name,
            parentProjectId: activeProjectId,
            id: tasksLists.length + 1
        }
        addNewList(dispatch, newList)
        onHide() 
    }

    return(
        <form className="listForm" onSubmit={handleSubmit(onSubmit)}>
            <input className="listForm__input" type="text" {...register('name', {required: true})} />
            <div className="listForm__buttons">
                <button className="listForm__cancel" onClick={onHide}>Отменить</button>
                <button className="listForm__save" type='submit'>Добавить</button>
            </div>
        </form>
    )
}

interface ListFormProps{
    onHide: () => void
}