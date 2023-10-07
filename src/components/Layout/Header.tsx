import './Header.scss'

export default function Header({isOpenedSidebarSetter}: HeaderProps){
    return (<header className="header">
        <button className="header__gamburger" onClick={() => isOpenedSidebarSetter(true)}/>
    </header>)
}

interface HeaderProps{
    isOpenedSidebarSetter: (value:boolean) => void
}