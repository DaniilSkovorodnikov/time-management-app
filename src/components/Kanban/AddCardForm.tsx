import { useState } from 'react';
import './AddCardForm.scss'
import { SubmitHandler, useForm } from 'react-hook-form';
import { addCard } from '../../store/actionCreators/KanbanActions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export interface CardForm{
    name: string,
    boardId: number
}

export default function AddCardForm() {
    const dispatch = useAppDispatch()
    const {activeBoardId} = useAppSelector(state => state.kanbanSlice)
    const {register, handleSubmit, formState: {isValid}} = useForm<CardForm>({
        defaultValues: {
            boardId: activeBoardId
        }
    })
    const [openedForm, setOpenedForm] = useState<boolean>(false)
    
    const onSubmit: SubmitHandler<CardForm> = (data) => {
        addCard(dispatch, data)
        setOpenedForm(false)
    }

    if(!openedForm){
        return <button onClick={() => setOpenedForm(true)} className='addCardButton'>Добавить карточку +</button>
    }
    return (
        <form className='cardForm' onSubmit={handleSubmit(onSubmit)}>
            <input 
                className='cardForm__input' 
                placeholder='Название карточки'
                {...register('name', {required: true})} 
            />
            <div className='cardForm__buttons'>
               <button className='cardForm__submit' type='submit' disabled={!isValid}>Добавить карточку</button>
               <button className='cardForm__cancel' onClick={() => setOpenedForm(false)}>Отмена</button> 
            </div>
        </form>
    )
}