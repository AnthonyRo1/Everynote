import './main.css'
import LogoutButton from '../auth/LogoutButton';
import GlobalSidebar from '../GlobalSidebar/GlobalSidebar';
import RightSideBar from '../RightSideBar/RightSideBar';
import TextEditor from '../TextEditor/TextEditor';
import { Route } from 'react-router-dom';
import AllNotebooks from '../AllNotebooks/AllNotebooks';
const Main = () => {
    return (
        <div className='main-container'>
            <GlobalSidebar/>
            <Route path={['/notes', '/notes/:noteId']} exact={true}>
            <RightSideBar/>
            <TextEditor/>
            </Route>

            <Route path='/notebooks'>
            <AllNotebooks/>
            </Route>
        </div>
    )
}

export default Main;