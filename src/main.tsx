import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import './index.css'
import { setupStore } from './store/store.tsx'
import {DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<DndProvider backend={HTML5Backend}>
		<Provider store={store}>
			<App />
		</Provider>
	</DndProvider>
)
