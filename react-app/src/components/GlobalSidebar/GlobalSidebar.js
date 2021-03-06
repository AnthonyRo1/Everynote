import './globalsidebar.css'
import {NavLink, useParams, useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import {createSingleNote, createNotebookNote} from '../../store/notes';
import { useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
const GlobalSidebar = () => {

    const {notebookId} = useParams();
    const {noteId} = useParams();
    const newNoteRef = useRef(null);
    const profileRef = useRef(null);
    console.log(notebookId, noteId, 'global sidebar')


    const history = useHistory();
    const dispatch = useDispatch();
    // show **CREATE NEW** button ON HOVER within LIST 
    // const [showCreateNote, setShowCreateNote] = useState(false);
    // const [showCreateBtn, setShowCreateBtn] = useState(false);
    const [showNewNote, setShowNewNote] = useState(false);
    const [profileInfo, setProfileInfo] = useState(false);

    // const [userHasNotes, setUserHasNotes] = useState(0);
    const allNotes = useSelector((state) => state.notesAll);
    const user = useSelector((state) => state.session.user);
    const userNotes = Object.values(allNotes).filter(note => note?.user_id === user?.id);



    useEffect(() => {
        window.document.addEventListener('mousedown', (e) => {
            if (newNoteRef.current && !newNoteRef.current.contains(e.target)) {
                setShowNewNote(false);
            }

            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileInfo(false)
            }
        })
    }, [])



    const createANote = async(e) => {
        e.preventDefault();
        const title = 'Untitled';
        const description = 'New note'
        const content = '';
        const data = {
            title,
            description,
            content
        }

        if (notebookId) {

         const note = await dispatch(createNotebookNote(notebookId, data));
            history.push(`/notes/notebooks/${notebookId}/${note?.id}`)
        } else if (!noteId) {
           const note = await dispatch(createSingleNote(data))
           
            history.push(`/notes/${note?.id}`)
        }
        else {
           const note = await dispatch(createSingleNote(data))
            history.push(`/notes/${note?.id}`)
        }

        setShowNewNote(false);
        
        
    }

    const showProfileInfo = () => {
        setProfileInfo(true);
    }

    return (
        <div className='global-sidebar-container'>
            <div className='sidebar-top' >
                <div className='sidebar-userinfo'>
                    <div id='sb-icon-box' onClick={() => showProfileInfo()}>
                        <div id='sb-user-icon'>
                            <p id='email-first-letter'>{(user?.email[0]).toUpperCase()}</p>
                        </div>
                        <p id='sb-email'>{user?.email}</p>
                        <i className="fa-solid fa-angle-down sbt-angle-down"></i>
                    </div>
                    {
                        profileInfo && 
                        <div className='profile-info-box' ref={profileRef}>
                            <div className='pi-b-inner'>
                                <p id='pi-bi-header'>Account</p>
                                <div className='pi-bi-user'>
                                <p className='pi-bi-txt'>{user?.username}</p>
                                <p className='pi-bi-txt'>{user?.email}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='user-newnote-divider'></div>
            <div className='sidebar-new-note'>
                <div id='sb-new-note-btn' onClick={() => setShowNewNote(true)}>
                    <div id='new-note-plus-box'>
                        <i className="fa-solid fa-plus new-note-plus"></i>
                        <p id='sb-new-txt'>New</p>
                    </div>
                    <div id='sbnn-angle-down-box'>
                        <i className="fa-solid fa-angle-down sbnn-ad"></i>
                    </div>
                </div>
                { showNewNote &&
                <div className='new-note-confirm' ref={newNoteRef}>
                    <form className='new-note-form' onSubmit={createANote}>
                        <button id='new-note-btn'>
                                <i className="fa-solid fa-file-lines new-note-icon"></i>
                            Note
                        </button>
                    </form>
                </div>
                }





            </div>


            <div id='sb-home-btn-box'>
                <NavLink to='/home' id='sb-home-link' >
                <div id='sb-home-background'>
                <i className="fa-solid fa-house sb-home-icon"></i>
                <p id='sb-home-txt'>Home</p>
                </div>
                </NavLink>
            </div>
            <div className='sidebar-list'>
                <ul className='sb-ul'>




                    <li className='sb-li' >
                     <NavLink to={userNotes.length > 0 ? `/notes/${userNotes[userNotes.length - 1]?.id}` : '/notes'} className='sb-links'>
                            <i className="fa-solid fa-file-lines sb-li-icon"></i>
                            <p className='sb-li-txt'>Notes</p>
                     </NavLink>
                    </li>


                        <li className='sb-li' >
                            <NavLink to='/notebooks' className='sb-links'>
                                <i className="fa-solid fa-book sb-li-icon"></i>
                                <p className='sb-li-txt'>Notebooks</p>
                            </NavLink>
                        </li>



                </ul>
            </div>
            <div className='sidebar-footer'></div>
            <LogoutButton/>
            {/* comment for commit  */}
        </div>
    )
}

export default GlobalSidebar;