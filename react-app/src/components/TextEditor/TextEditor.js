import './texteditor.css'
import './noteoptions.css'

import LogoutButton from '../auth/LogoutButton';
import MainTextArea from '../MainTextArea/MainTextArea';
import Main from '../Main/Main';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory, Route } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { deleteSingleNote, getAllNotes } from '../../store/notes';
import { useDispatch } from 'react-redux';

const TextEditor = () => {

    // CURRENT NOTE ID 
    const {noteId, notebookId} = useParams();


    const myRef = useRef(null);
    const deleteRef = useRef(null);


    const [moveTo, setMoveTo] = useState(false);
    



    const dispatch = useDispatch();
    const history = useHistory();
    // USESELECTOR FOR CURRENT NOTE INFO
    const user = useSelector((state) => state.session.user);
    const allNotes = useSelector((state) => state.notesAll);
    const allMyNotes = Object.values(allNotes).filter(note => note?.user_id === user?.id);

    const currentNote = Object.values(allNotes).find(note => String(note?.id) === noteId);
    console.log(currentNote)
    const allNotebooks = useSelector((state) => state.notebooksAll);
    const notebooksArr = Object.values(allNotebooks);
    const allNbNotes = Object.values(allNotes).filter(note => String(note?.notebook_id) === notebookId);

    // IF a note belongs to a notebook, find the notebook it belongs to.
    const currentNotesOwner = notebooksArr.find(notebook => notebook?.id === currentNote?.notebook_id);


    const notebookTitle = notebooksArr.find(notebook => notebook?.id == notebookId)?.title;
 // FIND THE NOTE ABOVE (ONE BEHIND) THE CURRENT NOTE;





    // ALL OF THE NOTE OPTIONS' STATE
    const [toggleOptions, setToggleOptions] = useState(false);
    const [toggleOptDelete, setToggleOptDelete] = useState(false);

    useEffect(() => {

    }, [noteId, notebookId, currentNote])




    // DETECT CLICK OUTSIDE OF FORMS 
    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if ((myRef.current && !myRef.current.contains(e.target))) {
                setToggleOptions(false);
            }

            if (deleteRef.current && !deleteRef.current.contains(e.target)) {
                setToggleOptDelete(false);
            }
        })

    }, [])





    const handleNoteDelete = async(e) => {
        e.preventDefault();
      const deletedNote = await dispatch(deleteSingleNote(noteId));
      
        setToggleOptDelete(false);
if (deletedNote) {
    if (!notebookId && allMyNotes.length > 0) {
        const allNotes = allMyNotes.reverse();
        const noteDeletedIndex = allMyNotes.reverse().map(note => note?.id).indexOf(deletedNote?.id)

        if (noteDeletedIndex > 0) {
            history.push(`${allNotes[noteDeletedIndex - 1]?.id}`)
        } else if (noteDeletedIndex === 0) {
            history.push(`${allNotes[noteDeletedIndex + 1]?.id}`)
        }
    } else if ((notebookId && noteId) && allMyNotes.length > 0) {
        const allNotesNb = allNbNotes.reverse();
        const noteDeletedIndex = allNotesNb.reverse().map(note => note?.id).indexOf(deletedNote?.id);

        if (noteDeletedIndex > 0) {
            history.push(`${allNotesNb[noteDeletedIndex - 1]?.id}`)
        } else if (noteDeletedIndex === 0) {
            history.push(`${allNotesNb[noteDeletedIndex + 1]?.id}`)
        }
    } 
}



}





    return (
        <div className='text-editor-container'>
            <div className='text-editor-header'>
                <div className='te-innerheader'>
                    <div className='te-ih-title'>
                        <div id='te-ih-title-box'>


                            {
                                currentNotesOwner ? 
                                <i className="fa-solid fa-book nb-th-notebook"></i>
                                : currentNote ?
                            <i className="fa-solid fa-file-lines rs-h-ih-icon"></i> : ''}

                        {/* IF NOTE BELONGS TO NOTEBOOK DISPLAY LINK WITH NOTEBOOK NAME / ELSE DISPLAY NOTEBOOK NAME */}



                        <p id='rs-h-ih-txt'>{notebookId ? notebookTitle : currentNotesOwner ? currentNotesOwner?.title : currentNote === undefined ? '' : 'Note'}
                        </p>
                        {
                            notebookId && allNbNotes.length === 0 ?
                            <p id='no-nbs-txt'>(This notebook is empty)</p> :
                            <p></p>
                        }

                        {
                            (allMyNotes.length === 0) && (!notebookId)  ? 
                            <p id='no-notes-txt'>(No notes available)</p> :
                            <p></p>
                        }

                        
                        
                    


                        <i className="fas fa-ellipsis-h menu-dots" onClick={() => setToggleOptions(true)}></i>
                    
                    


                        </div>
                    </div>
                </div>
                {/* <div className='te-innerfooter'>
                </div> */}
            </div>



{/* NOTE OPTIONS POPUP */}
            {
                toggleOptions &&
                <div className='note-opt-container .hide-noteopt' ref={myRef}>
                    <div className='no-c-row last' onClick={() => setToggleOptDelete(true)}>
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






            {












            }
            { noteId != undefined &&
            <Route path={['/notes/notebooks/:notebookId/:noteId', '/notes/:noteId']}>
            <MainTextArea note={currentNote}/>
            </Route>
            }
        </div>
    )
}


export default TextEditor;