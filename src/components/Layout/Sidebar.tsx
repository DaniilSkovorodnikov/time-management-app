import { useAppSelector } from '../../hooks/redux'
import './Sidebar.scss'

export default function Sidebar() {
	const {openedSidebar} = useAppSelector(state => state.layoutSlice)

	return (<div className='sidebar' style={{width: openedSidebar ? '17%' : '0px'}}>

	</div>)
}
