import { useState, useRef, useEffect } from 'react';
import './notebookspreview.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateSingleNotebook, deleteSingleNotebook, createSingleNotebook} from '../../store/notebook';
import { createNotebookNote, moveSingleNote, deleteSingleNote, getAllNotes} from '../../store/notes';

const NotebooksPreview = ({notebook, tabindex}) => {


    const dispatch = useDispatch();
    const history = useHistory();

// REFS ALLOWING FOR DETECTION OF CLICK OUTSIDE OF ELEMENT
    const noteOptionsRef = useRef(null);
    const notebookOptionsRef = useRef(null);
    const deleteRef = useRef(null);


// USESTATE FOR SPECIFIC PAGE ACTIONS
    const [notebookActions, setNotebookActions] = useState(false);
    const [arrowTurned, setArrowTurned] = useState(false);
    const [notebookNoteForm, setNotebookNoteForm] = useState(false);
    const [currentNoteInfo, setCurrentNoteInfo] = useState('');
    const [renameNotebook, setRenameNotebook] = useState(false);
    const [title, setTitle] = useState(notebook?.title);
    const [renameErrors, setRenameErrors] = useState([]);
    const [deleteNotebook, setDeleteNotebook] = useState(false);
    const [moveTo, setMoveTo] = useState(false); 
    const [moveNotebookInfo, setMoveNotebookInfo] = useState(-1)
    const [coloredRow, setColoredRow] = useState(false);
    const [moveErrors, setMoveErrors] = useState([]);
    const [deleteNote, setDeleteNote] = useState(false);


// FUNCTION THAT TURNS AN ARROW 90 DEGREES OnClick
    const turnArrow = () => { 
        if (arrowTurned) {
           return setArrowTurned(false);
        } else {
           return setArrowTurned(true);
        }
    }


// USE SELECTORS GETTING CURRENT STATE 
    // const str = new Date(note?.created_at).toLocaleTimeString('en-US', {
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     hour12: true
    // })

    // USER STATE 
    const user = useSelector((state) => state.session.user);
    // NOTES STATE 
    const allNotes = useSelector((state) => state.notesAll);
    const notebookNotes = Object.values(allNotes).filter(note => note?.notebook_id == notebook?.id);
    // NOTEBOOKS STATE 
    const allNotebooks = useSelector((state) => state.notebooksAll)
    const userNotebooks = Object.values(allNotebooks).filter(nb => (nb?.user_id === user?.id) && nb?.id !== notebook?.id);
    





// SHOW NOTEBOOK NOTE FORM 
    const showNotebookNoteForm = (noteTitle) => {
        setNotebookNoteForm(true);
        setCurrentNoteInfo(noteTitle);
    }

// THIS USEEFFECT IS HANDLING ERRORS 
    useEffect(() => {
        const err = [];
        if (title.length <= 0) err.push('Notebook name must contain at least one character.')
        if (title.length > 50) err.push('Notebook name must have less than 50 characters.')
        setRenameErrors(err);

        const moveNoteErr = [];
        if (moveNotebookInfo === -1) {
            moveNoteErr.push('err');
        }
        
        setMoveErrors(moveNoteErr);


    }, [title, moveNotebookInfo])


// THIS USE EFFECT IS HANDLING REFS 
    useEffect(() => {
        window.document.addEventListener('mousedown', (e) => {
            if (noteOptionsRef.current && !noteOptionsRef.current.contains(e.target)) {
                setNotebookNoteForm(false);
            }

            if (notebookOptionsRef.current && !notebookOptionsRef.current.contains(e.target)) {
                setNotebookActions(false);
            }

            if (deleteRef.current && !deleteRef.current.contains(e.target)) {
                setDeleteNotebook(false);
            }
        })
    }, [])



// TRIGGER THE DISPLAY OF NOTEBOOK ACTION FORM
    const renameNotebookFunc = () => {
        setNotebookActions(false);
        setRenameNotebook(true);

    }
// TRIGGER THE DISPLAY OF NOTEBOOK ACTION FORM
    const deleteNotebookFunc = () => {
        setNotebookActions(false);
        setDeleteNotebook(true);
    }







// NOTEBOOK ACTIONS -> ALL ACTIONS AVAILABLE TO A NOTEBOOK BASED ON POPUP ELLIPSES ;
    const renameNotebookSubmit = (e) => {
            e.preventDefault();
            const data = {
                title
            }

        dispatch(updateSingleNotebook(notebook?.id, data));
        setRenameNotebook(false);
    }

    const deleteNotebookSubmit = (e) => {
            e.preventDefault();
            dispatch(deleteSingleNotebook(notebook?.id));
            setDeleteNotebook(false);
    }




// DUPLICATE NOTEBOOK
    const duplicateNotebook = async(notebook) => {
        const data = {
            title: notebook?.title,
        }

       const newNotebook = await dispatch(createSingleNotebook(data));

        if (newNotebook) {
            for (let note of notebookNotes) {
              const title = note?.title;
              const description = note?.description;
              const content = note?.content;
             const payload = {
                  title,
                  description,
                  content
              }
              dispatch(createNotebookNote(newNotebook?.id, payload))
             }
        }
        setNotebookActions(false);

    }


// MOVE A NOTE FROM AN EXISTING NOTEBOOK TO ANOTHER
    const moveNotebookTo = (notebookId) => {

        dispatch(moveSingleNote(currentNoteInfo?.id, notebookId))
        setMoveTo(false);
        setColoredRow(true) 
        setTimeout(() => {
            setColoredRow(false);
            setMoveNotebookInfo(-1);
        }, 800)
    }

    const cancelMoveNote = () => {
        setMoveTo(false);
        setMoveNotebookInfo(-1);
    }




// CREATE A NEW NOTE BELONGING TO A SPECIFIC NOTEBOOK
    const newNotebookNote = async() => {
        const title = 'Untitled';
        const content = '';
        const description = '';

        const data = {
            title,
            description,
            content
        }

       const newNote = await dispatch(createNotebookNote(notebook?.id, data))

       if (newNote) {
        history.push(`/notes/notebooks/${notebook?.id}/${newNote?.id}`)
       }
    }



// DUPLICATE A SINGLE NOTE THAT BELONGS TO A NOTEBOOK
    const duplicateNote = (note) => {
        const title = note?.title;
        const content = note?.content;
        const description = '';

        const data = {
            title,
            description,
            content
        }

        dispatch(createNotebookNote(notebook?.id, data))
        setNotebookNoteForm(false);
    }



    // REDIRECT TO SPECIFIC NOTE 
    const goToSingleNote = (noteId) => {
        history.push(`/notes/notebooks/${notebook?.id}/${noteId}`)
    }

    // REDIRECT TO NOTEBOOK AND ALL NOTES WITHIN NOTEBOOK
    const goToNotebook = (notebookId) => {
       const firstNoteId = notebookNotes[0]?.id;
        history.push(`/notes/notebooks/${notebookId}/${firstNoteId}`)
        // notes/notesbooks/:notebookId/:noteId
    }

    // DELETE NOTEBOOK NOTE 
    const deleteNotebookNote = (noteId) => {
        dispatch(deleteSingleNote(noteId));
        setDeleteNote(false);
    }

    // TRIGGER DISPLAY OF NOTEBOOK NOTE ACTION FORM
    const moveNotebookNoteTrigger = () => {
        setNotebookNoteForm(false);
        setMoveTo(true)
    }


    // TRIGGER DISPLAY OF NOTEBOOK NOTE ACTION FORM
    const deleteNotebookNoteTrigger = () => {
        setNotebookNoteForm(false);
        setDeleteNote(true);
    }


    return (
        <>
        <div className={coloredRow ? 'notebooks-preview-container flash' : 'notebooks-preview-container'}>
            <div className='notebooks-table'>
                <div className='nb-table-content' tabIndex={tabindex} >
                    <div className='nb-td-txt nb-td-one'>
                        <i className={arrowTurned ? "fa-solid fa-caret-right nb-th-arrow-right arrow-right-turned" : "fa-solid fa-caret-right nb-th-arrow-right"} onClick={() => turnArrow()}></i>
                        <i className="fa-solid fa-book nb-th-notebook"></i>
                        {/* <NavLink to={`/notes/notebooks/${notebook?.id}`}> */}
                        <p id='nb-td-name' onClick={() => goToNotebook(notebook?.id)}>{notebook?.title}</p>
                        {/* </NavLink> */}
                        </div>
                    <div className='nb-td-txt nb-td-two'>{user?.email}</div>
                    <div className='nb-td-txt nb-td-four'>
                        <i className="fa-solid fa-ellipsis nb-td-actions" onClick={() => setNotebookActions(true)}></i>
                    </div>
                </div>
            </div>
        </div>
        {
            arrowTurned &&
            <div className='notebook-notes-dropdown-container'>
                {
                    notebookNotes.length > 0 && notebookNotes.map((note, i) => (

                <div key={i}className='notebook-notes-dropdown'>
                    <div className='nn-row nn-row-one'>
                                <div id='nn-row-title' onClick={() => goToSingleNote(note?.id)}>
                                <i className="fa-solid fa-file-lines nn-row-icon"></i>
                                <p id='nn-row-title-txt'>{note?.title}</p>
                                
                            </div>
                    </div>
                    <div className='nn-row nn-row-two'>

                    </div>

                    <div className='nn-row nn-row-four'>
                                <i className='fa-solid fa-ellipsis nn-row-ellips' onClick={() => showNotebookNoteForm(note)}></i>
                    </div>
                </div>
                    ))
                }

                    { notebookNoteForm &&
                    <div className='nn-options-dropdown' ref={noteOptionsRef}>
                        <div className='nn-od-row nn-odr-title'>
                        <i className="fa-solid fa-file-lines nn-odr-icon"></i>
                        <p id='nn-od-title'>{currentNoteInfo?.title}</p>
                        </div>
                                <div className='nn-od-row' onClick={() => moveNotebookNoteTrigger()}>
                            <p>Move to..</p>
                        </div>
                        <div className='nn-od-row' onClick={() => duplicateNote(currentNoteInfo)}>
                            <p>Duplicate</p>
                        </div>
                                <div className='nn-od-row nn-odr-last' onClick={() => deleteNotebookNoteTrigger()}>
                            <p>Delete</p>
                        </div>
                    </div>
                    }
            </div>
        }


        {
            notebookActions && 
            <div className='notebook-actions-container' ref={notebookOptionsRef}>
                <div className='nb-actions-row nb-ar-title'>
                    <i className="fa-solid fa-book nb-ar-icon"></i>
                    <p id='nb-ar-title-txt'>{notebook?.title}</p>
                </div>
                <div className='nb-actions-row' onClick={() => newNotebookNote()}>
                    <p>Add new note</p>
                </div>
                <div className='nb-actions-row' onClick={() => renameNotebookFunc()} >
                    <p>Rename notebook</p>
                </div>
                <div className='nb-actions-row' onClick={() => duplicateNotebook(notebook)}>
                    <p>Duplicate</p>
                </div>
                <div className='nb-actions-row nb-ar-last' onClick={() => deleteNotebookFunc()}>
                    <p>Delete</p>
                </div>
            </div>
        }


        {
            renameNotebook && 
            <div className='rename-notebook-container'>
                <div className='rn-nb-row-title'>
                    <p id='rn-nb-rt-txt'>Rename Notebook</p>
                    <i class="fas fa-times rn-nb-rt-icon" onClick={() => setRenameNotebook(false)}></i>
                </div>
                <form className='rename-notebook-form' onSubmit={renameNotebookSubmit}>
                    <div className='rn-nbf-inputs'>
                        <label htmlFor='title'>Name</label>
                        <input
                        name='title'
                        placeholder='Notebook name'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        >
                        </input>
                        
                        <div className='rn-nbf-error'>
                            { renameErrors.length > 0 && renameErrors.map((err, i) => (
                                <p id='rn-nbf-err-txt'>{err}</p>
                            ))
                            }
                        </div>

                    </div>
                    <div className='rn-nbf-btns'>
                        <button type='button' id='nb-rn-btn-cancel' onClick={() => setRenameNotebook(false)}>Cancel</button>
                        <button type='submit' className={renameErrors.length > 0 ? 'nb-rn-btn-submit darken-disable' : 'nb-rn-btn-submit'} disabled={renameErrors.length > 0}>Continue</button>
                    </div>
                </form>
            </div>
        }





        {
            deleteNotebook &&
            <div className='delete-nb-container' ref={deleteRef}>
                <div className='delete-nb-text'>
                    <p>Are you sure you want to delete this notebook?</p>
                </div>
                <form className='delete-nb-form' onSubmit={deleteNotebookSubmit}>
                    <div className='delete-nbf-btns'>
                    <button type='button' id='delete-nbf-cancel' onClick={() => setDeleteNotebook(false)}>Cancel</button>
                    <button type='submit' id='delete-nbf-submit'>Delete</button>
                    </div>
                </form>
            </div>
        }


        {   

            moveTo && 
            <div className='move-to-container'>
                <div className='mtc-title-bar'>
                <p id='mtc-title'>All notebooks</p>
                </div>
                <div className='mtc-inner'>
                {
                    userNotebooks.map((nb, i) => (
                       <div key={i} className='move-to-row' tabIndex={i} onClick={() => setMoveNotebookInfo(nb?.id)}>
                            <i className="fa-solid fa-book nb-th-notebook"></i>
                            <p>{nb?.title}</p>
                        </div>
                    ))
                }
                        <div className='move-to-row current-nb'>
                            <i className="fa-solid fa-book nb-th-notebook"></i>
                            <p>{notebook?.title} (current)</p>
                        </div>
                </div>
                        <div className='confirm-row-mtc'>
                            <div className='confirm-row-mtc-err'>
                                { moveErrors.length > 0 &&
                                <p id='mtc-err-txt'>Please select a notebook to move this note to.</p>
                                }
                            </div>
                            <div className='confirm-row-mtc-btns'>
                            <button id='mtc-cancel-btn'onClick={() => cancelMoveNote()}>Cancel</button>
                            <button id={moveErrors.length ? 'mtc-submit-btn darken-disable' : 'mtc-submit-btn'} onClick={() => moveNotebookTo(moveNotebookInfo)} disabled={!!moveErrors.length}>Move</button>
                            </div>
                        </div>
            </div>
        }


        {
            deleteNote && 
            <div className='nn-delete-container'>
                <div className='nn-delete-title'>
                    <p id='nn-delete-txt'>{currentNoteInfo?.title}</p>
                </div>
                <div className='nn-delete-inner'>
                    <p id='nn-delete-inner-txt'>Are you sure you want to delete this note?</p>
                </div>
                <div className='nn-delete-btns'>
                    <button id='nn-delete-cancel' onClick={() => setDeleteNote(false)}>Cancel</button>
                    <button id='nn-delete-submit' onClick={() => deleteNotebookNote(currentNoteInfo?.id)}>Delete</button>
                </div>
            </div>
        }

        </>
    )
}


export default NotebooksPreview;