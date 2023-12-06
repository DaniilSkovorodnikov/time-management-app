import { useState } from 'react';
import './AddCardForm.scss'
import { SubmitHandler, useForm } from 'react-hook-form';
import { addCard } from '../../store/actionCreators/KanbanActions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ICard } from '../../models/IKanban';

export interface CardForm{
    name: string,
    boardId: string
}

interface AddCardFormProps{
    boardCardsLength: number
}

export default function AddCardForm({boardCardsLength}: AddCardFormProps) {
    const dispatch = useAppDispatch()
    const {activeBoardId} = useAppSelector(state => state.kanbanSlice)
    const {register, handleSubmit, formState: {isValid}} = useForm<Omit<ICard, 'id'>>({
        defaultValues: {
            boardId: activeBoardId,
            orderInBoard: boardCardsLength
        }
    })
    const [openedForm, setOpenedForm] = useState<boolean>(false)
    
    const onSubmit: SubmitHandler<Omit<ICard, 'id'>> = (data) => {
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