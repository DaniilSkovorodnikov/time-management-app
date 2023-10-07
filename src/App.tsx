import Header from './components/Layout/Header';
import MainContainer from './components/Layout/MainContainer';
import './App.scss'
import { useState } from 'react';


function App(){
  const [openedSidebar, setOpenedSidebar] = useState<boolean>(false)

  return (
    <div className='app-wrapper'>
      <Header isOpenedSidebarSetter={setOpenedSidebar}/>
      <MainContainer openedSidebar={openedSidebar}/>
    </div>
  )
}

export default App
