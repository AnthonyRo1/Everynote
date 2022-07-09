import './texteditor.css'
import './noteoptions.css'

import LogoutButton from '../auth/LogoutButton';
import MainTextArea from '../MainTextArea/MainTextArea';
import Main from '../Main/Main';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const TextEditor = () => {

    const myRef = useRef(null);
    const {noteId} = useParams();
    const allNotes = useSelector((state) => state.notesAll);
    const currentNote = Object.values(allNotes).find(note => note?.id == noteId);

    const [toggleForm, setToggleForm] = useState(false);


    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (myRef.current && !myRef.current.contains(e.target)) {
                setToggleForm(false);
            }
        })
    }, [])


    return (
        <div className='text-editor-container'>
            <div className='text-editor-header'>
                <div className='te-innerheader'>
                    <div className='te-ih-title'>
                        <div id='te-ih-title-box'>
                        <i className="far fa-sticky-note rs-h-ih-icon"></i>

                        {/* IF NOTE BELONGS TO NOTEBOOK DISPLAY LINK WITH NOTEBOOK NAME / ELSE DISPLAY NOTEBOOK NAME */}
                        <p id='rs-h-ih-txt'>Notes</p>

                        <i className="fas fa-ellipsis-h menu-dots" onClick={() => setToggleForm(true)}></i>

                        {
                            toggleForm && 
                        <div className='note-opt-container' ref={myRef}>



                        </div>
                        }
                        </div>
                    </div>
                </div>
                <div className='te-innerfooter'>
                    <div className='te-if-icons'>
                    </div>
                </div>
            </div>
            <div className='te-divider'>
                <div id='te-line'></div>
            </div>
            <Route to='/notes/:noteId'>
            <MainTextArea note={currentNote}/>
            </Route>
        </div>
    )
}


export default TextEditor;