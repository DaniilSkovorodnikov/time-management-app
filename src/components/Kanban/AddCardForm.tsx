import { useState } from 'react';
import './AddCardForm.scss'
import { SubmitHandler, useForm } from 'react-hook-form';
import { addCard } from '../../store/actionCreators/KanbanActions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ICard } from '../../models/IKanban';

export interface CardForm{
    name: string,
    boardId: string,
    orderInBoard: number
}

interface AddCardFormProps{
    boardCardsLength: number,
    onHide: () => void
}

export default function AddCardForm({boardCardsLength, onHide}: AddCardFormProps) {
    const dispatch = useAppDispatch()
    const {activeBoardId} = useAppSelector(state => state.kanbanSlice)
    const {register, handleSubmit, formState: {isValid}, reset} = useForm<Omit<ICard, 'id'>>({
        defaultValues: {
            boardId: activeBoardId,
            orderInBoard: boardCardsLength
        }
    })

    
    const onSubmit: SubmitHandler<Omit<ICard, 'id'>> = (data) => {
        addCard(dispatch, data)
        onHide()
        reset()
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
               <button className='cardForm__cancel' onClick={() => {
                onHide()
                reset()
               }}>Отмена</button> 
            </div>
        </form>
    )
}