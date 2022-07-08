import './main.css'
import LogoutButton from '../auth/LogoutButton';
import GlobalSidebar from '../GlobalSidebar/GlobalSidebar';
import RightSideBar from '../RightSideBar/RightSideBar';
import { Route } from 'react-router-dom';
const Main = () => {
    return (
        <div className='main-container'>
            <GlobalSidebar/>
            <Route path='/notes' exact={true}>
            <RightSideBar/>
            </Route>
            <LogoutButton/>
        </div>
    )
}

export default Main;