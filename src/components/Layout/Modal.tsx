import './Modal.scss'

export default function Modal({show, onHide, children}:ModalProps) {

    return (
        <div className={["modal", show ? 'visible': ''].join(' ')} onClick={() => onHide()}>
            <div className='modal__container' onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

type ModalProps = {
    show: boolean,
    onHide: () => void,
    children?: React.ReactNode
}