import './texteditor.css'
import './noteoptions.css'

import LogoutButton from '../auth/LogoutButton';
import MainTextArea from '../MainTextArea/MainTextArea';
import Main from '../Main/Main';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { deleteSingleNote } from '../../store/notes';
import { useDispatch } from 'react-redux';

const TextEditor = () => {

    // CURRENT NOTE ID 
    const {noteId} = useParams();



    const myRef = useRef(null);
    const deleteRef = useRef(null);




    const dispatch = useDispatch();
    const history = useHistory();
    // USESELECTOR FOR CURRENT NOTE INFO
    const allNotes = useSelector((state) => state.notesAll);
    const currentNote = Object.values(allNotes).find(note => note?.id == noteId);


 // FIND THE NOTE ABOVE (ONE BEHIND) THE CURRENT NOTE;
    const noteAboveId = Object.values(allNotes).map((note, i) => {
        if (note?.id == noteId) {
          return Object.values(allNotes)[i - 1];
        }
    }).filter(el => el)[0]?.id;




    // ALL OF THE NOTE OPTIONS' STATE
    const [toggleOptions, setToggleOptions] = useState(false);
    const [toggleOptDelete, setToggleOptDelete] = useState(false);




    // DETECT CLICK OUTSIDE OF FORMS 
    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if ((myRef.current && !myRef.current.contains(e.target))) {
                setToggleOptions(false);
            }

            if (deleteRef.current && !deleteRef.current.contains(e.target)) {
                console.log(true);
                setToggleOptDelete(false);
            }
        })
    }, [])





    const handleNoteDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSingleNote(noteId));
        setToggleOptDelete(false);

    }


    return (
        <div className='text-editor-container'>
            <div className='text-editor-header'>
                <div className='te-innerheader'>
                    <div className='te-ih-title'>
                        <div id='te-ih-title-box'>
                            <i className="fa-solid fa-file-lines rs-h-ih-icon"></i>

                        {/* IF NOTE BELONGS TO NOTEBOOK DISPLAY LINK WITH NOTEBOOK NAME / ELSE DISPLAY NOTEBOOK NAME */}
                        <p id='rs-h-ih-txt'>Notes</p>
                        
                        <i className="fas fa-ellipsis-h menu-dots" onClick={() => setToggleOptions(true)}></i>


                        </div>
                    </div>
                </div>
                <div className='te-innerfooter'>
                    <div className='te-if-icons' style={{
                        color: 'white'
                    }}>
                        FOOTER AREA WITH ICONS 
                    </div>
                </div>
            </div>



{/* NOTE OPTIONS POPUP */}
            {
                toggleOptions &&
                <div className='note-opt-container .hide-noteopt' ref={myRef}>
                    <div className='no-c-row'>
                        <p className='no-c-r-txt'>Move to..</p>
                    </div>

                    <div className='no-c-row'>
                        <p className='no-c-r-txt'>Copy to..</p>
                    </div>

                    <div className='no-c-row'>
                        <p className='no-c-r-txt'>Duplicate</p>
                    </div>

                    <div className='no-c-row' onClick={() => setToggleOptDelete(true)}>
                        <p className='no-c-r-txt'>Delete</p>
                    </div>


                </div>
            }




{/* DELETE FORM BELOW */}
            {
                toggleOptDelete &&
                <>
                <div className='note-delete-container' ref={deleteRef}>
                    <form className='note-delete-form' onSubmit={handleNoteDelete}>
                    <div className='cancel-form-row'>
                        <i className="fas fa-times cancel-form-x" onClick={() => setToggleOptDelete(false)}></i>
                    </div>
                    <p id='note-delete-txt'>Are you sure you want to delete this note?</p>
                    <div className='note-delete-btns'>
                    <button type='submit' id='note-delete-btn'>Delete Note</button>
                    <button type='button' id='cancel-delete-btn' onClick={() => setToggleOptDelete(false)}>Cancel</button>
                    </div>
                    </form>
                </div>
                </>
            }



            <div className='te-divider'>
                <div id='te-line'></div>
            </div>
            {/* <Route to='/notes/:noteId'> */}
            <MainTextArea note={currentNote}/>
            {/* </Route> */}
        </div>
    )
}


export default TextEditor;