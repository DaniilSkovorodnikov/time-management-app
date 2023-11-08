import Header from './components/Layout/Header';
import MainContainer from './components/Layout/MainContainer';
import './App.scss'
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { loadProjects } from './store/actionCreators/ProjectsActions';
import { useAppDispatch } from './hooks/redux';
import "react-datepicker/dist/react-datepicker.css";

function App(){
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadProjects(dispatch)
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header/>
        <MainContainer/>
      </div>
    </BrowserRouter>
  )
}

export default App
