import './rightsidebar.css'
import {useSelector} from 'react-redux';
import NotePreview from '../NotePreview/NotePreview';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
const RightSideBar = () => {

    const user = useSelector((state) => state.session.user)
    const allNotes = useSelector((state) => state.notesAll);
    const notesArr = Object.values(allNotes);

    const userNotes = notesArr.filter(notes => notes?.user_id == user?.id)


    return (
        <div className='right-sidebar-container'>
            <div className='rs-header'>
                <div className='rs-h-innerheader'>
                    <div className='rs-h-ih-title'>
                        <i className="far fa-sticky-note rs-h-ih-icon"></i>
                        <p id='rs-h-ih-txt'>Notes</p>
                    </div>
                </div>
                <div className='rs-h-innerfooter'>
                    <div className='rs-h-if-icons'>
                        <div className='rs-h-if-icons-left'>
                            <p id='rs-h-if-txt'>{userNotes.length} notes</p>
                        </div>
                        <div className='rs-h-if-icons-right'>

                        </div>
                    </div>
                </div>
            </div>
            <div className='rs-divider'>
                <div id='rs-d-line'></div>
            </div>

            <div className='rs-allnotes-container'>
            {
                userNotes.map((note, i) => (
                    <NotePreview key={i} title={note?.title} content={note?.content} updated={note?.updated_at} id={note?.id}/>
                ))
            }
            </div>
        </div>
    )
}

export default RightSideBar;