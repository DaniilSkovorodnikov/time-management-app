import Modal from "../Layout/Modal"
import './ConfirmModal.scss'

export default function ConfirmModal(props: ConfirmModalProps){
    return (
        <Modal show={props.show} onHide={props.onHide} >
			<div className="confirmModal">
				<h2 className="confirmModal__title">{props.title}</h2>
				<div className="confirmModal__buttons">
					<button
						className="confirmModal__confirm"
						onClick={async() => {
							props.onConfirm()
							props.onHide()
						}}
					>
						Удалить
					</button>
					<button className="confirmModal__cancel" onClick={props.onHide}>Отменить</button>
				</div>
			</div>
		</Modal>
    )
}

interface ConfirmModalProps{ 
    show: boolean,
    onHide: () => void,
    onConfirm: () => void,
    title: string,
}