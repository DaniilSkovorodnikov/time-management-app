import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { layoutSlice } from '../../store/reducers/LayoutReducer'
import './Modal.scss'

export default function Modal({children}:ModalProps) {
    const {openedModal} = useAppSelector(state => state.layoutSlice)
    const {changeModalVisibility} = layoutSlice.actions
    const dispatch = useAppDispatch()

    return (
        <div className={["modal", openedModal ? 'visible': ''].join(' ')} onClick={() => dispatch(changeModalVisibility())}>
            <div className='modal__container' onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

type ModalProps = {
    children?: React.ReactNode
}