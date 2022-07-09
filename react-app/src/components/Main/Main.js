import './main.css'
import LogoutButton from '../auth/LogoutButton';
import GlobalSidebar from '../GlobalSidebar/GlobalSidebar';
import RightSideBar from '../RightSideBar/RightSideBar';
import TextEditor from '../TextEditor/TextEditor';
import { Route } from 'react-router-dom';
const Main = () => {
    return (
        <div className='main-container'>
            <GlobalSidebar/>
            <Route path={['/notes', '/notes/:noteId']} exact={true}>
            <RightSideBar/>
            <TextEditor/>
            </Route>
        </div>
    )
}

export default Main;