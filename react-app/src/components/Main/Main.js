import './main.css'
import LogoutButton from '../auth/LogoutButton';
import GlobalSidebar from '../GlobalSidebar/GlobalSidebar';
const Main = () => {
    return (
        <div className='main-container'>
            <GlobalSidebar/>
            <LogoutButton/>
        </div>
    )
}

export default Main;