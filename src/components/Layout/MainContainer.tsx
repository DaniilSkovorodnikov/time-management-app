import { Routes, Route} from "react-router-dom";
import TodoList from "../TodoList/TodoList";
import Kanban from "../Kanban/Kanban";
import Sidebar from "./Sidebar";
import './MainContainer.scss'

export default function MainContainer(){
    return (
        <main className="main">
            <Sidebar/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<TodoList/>}/>
                    <Route path="/kanban" element={<Kanban/>}/>
                </Routes>
            </div>
        </main>
        
    )
}