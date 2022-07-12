import './globalsidebar.css'
import {NavLink, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { createElement } from 'react';
import {createSingleNote, createNotebookNote} from '../../store/notes';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
const GlobalSidebar = () => {

    const {noteId, notebookId} = useParams();


    console.log(notebookId);
    const notesLinkRef = useRef(null);
    const newNoteRef = useRef(null);

    const dispatch = useDispatch();
    // show **CREATE NEW** button ON HOVER within LIST 
    const [showCreateNote, setShowCreateNote] = useState(false);
    const [showCreateBtn, setShowCreateBtn] = useState(false);
    const [showNewNote, setShowNewNote] = useState(false);


    const [userHasNotes, setUserHasNotes] = useState(0);
    const allNotes = useSelector((state) => state.notesAll);
    const user = useSelector((state) => state.session.user);
    const userNotes = Object.values(allNotes).filter(note => note?.user_id == user?.id);



    useEffect(() => {
        window.document.addEventListener('mousedown', (e) => {
            if (newNoteRef.current && !newNoteRef.current.contains(e.target)) {
                setShowNewNote(false);
            }
        })

        setUserHasNotes(userNotes.length);
    }, [])

    const [liText, setLiText] = useState(false);

    const liTextWhite = () => {
        setLiText(true);
    }

    const liTextDark = () => {
        setLiText(false);
    }


    const createANote = (e) => {
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
         dispatch(createNotebookNote(notebookId, data));
        } else {
            dispatch(createSingleNote(data))
        }
        
    }


    return (
        <div className='global-sidebar-container'>
            <div className='sidebar-top' >
                <div className='sidebar-userinfo'>
                    <div id='sb-icon-box'>
                        <div id='sb-user-icon'>
                        </div>
                        <p id='sb-email'>new@new.com</p>
                        <i className="fa-solid fa-angle-down sbt-angle-down"></i>
                    </div>
                </div>
                    <div id='sb-gear-box'>
                    <i className="fa-solid fa-gear sb-gear"></i>
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