import './main.css'
import LogoutButton from '../auth/LogoutButton';
import GlobalSidebar from '../GlobalSidebar/GlobalSidebar';
import RightSideBar from '../RightSideBar/RightSideBar';
import TextEditor from '../TextEditor/TextEditor';
import { Route } from 'react-router-dom';
import AllNotebooks from '../AllNotebooks/AllNotebooks';
import NotebookNotes from '../NotebookNotes/NotebookNotes';
const Main = () => {
    return (
        <div className='main-container'>
            <GlobalSidebar/>

            
            <Route path={['/notes', '/notes/:noteId', '/notes/notebooks/:notebookId', '/notes/notebooks/:notebookId/:noteId']} exact={true}>
            <RightSideBar/>
            <TextEditor/>
            </Route>

            <Route path='/notebooks' exact={true}>
            <AllNotebooks/>
            </Route>


        </div>
    )
}

export default Main;