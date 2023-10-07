import './Sidebar.scss'

export default function Sidebar({isOpened}: {isOpened: boolean}) {
	return (<div className='sidebar' style={{width: isOpened ? '17%' : '0px'}}>

	</div>)
}
