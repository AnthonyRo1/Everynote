import { useState, useRef, useEffect } from 'react';
import './notebookspreview.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateSingleNotebook, deleteSingleNotebook} from '../../store/notebook';
import { createNotebookNote } from '../../store/notes';
const NotebooksPreview = ({notebook, tabindex}) => {


    const dispatch = useDispatch();
    const history = useHistory();


    const noteOptionsRef = useRef(null);
    const notebookOptionsRef = useRef(null);
    const deleteRef = useRef(null);



    const [notebookActions, setNotebookActions] = useState(false);
    const [arrowTurned, setArrowTurned] = useState(false);
    const [notebookNoteForm, setNotebookNoteForm] = useState(false);
    const [currentNoteInfo, setCurrentNoteInfo] = useState('');
    const [renameNotebook, setRenameNotebook] = useState(false);
    const [title, setTitle] = useState(notebook?.title);
    const [renameErrors, setRenameErrors] = useState([]);
    const [deleteNotebook, setDeleteNotebook] = useState(false);



    const turnArrow = () => { 
        if (arrowTurned) {
           return setArrowTurned(false);
        } else {
           return setArrowTurned(true);
        }
    }




    const user = useSelector((state) => state.session.user);
    const allNotes = useSelector((state) => state.notesAll);

    const notebookNotes = Object.values(allNotes).filter(note => note?.notebook_id == notebook?.id);
    const notebooksArr = Object.values(allNotes);
    

    const showNotebookNoteForm = (noteTitle) => {
        setNotebookNoteForm(true);
        setCurrentNoteInfo(noteTitle);
    }




    useEffect(() => {
        const err = [];

        if (title.length <= 0) err.push('Notebook name must contain at least one character.')

        setRenameErrors(err);
    }, [title])






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




    const renameNotebookFunc = () => {
        setNotebookActions(false);
        setRenameNotebook(true);

    }
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


    const duplicateNotebook = async() => {
        console.log(notebook?.title, notebook?.id)
    }

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


    const goToSingleNote = (noteId) => {
        history.push(`/notes/${noteId}`)
    }


    const goToNotebook = (notebookId) => {
       const firstNoteId = notebookNotes[0]?.id;
        history.push(`/notes/notebooks/${notebookId}/${firstNoteId}`)
        // notes/notesbooks/:notebookId/:noteId
    }


    return (
        <>
        <div className='notebooks-preview-container'>
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
                    <div className='nb-td-txt nb-td-three'>{notebook?.updated_at}</div>
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
                    <div className='nn-row nn-row-three'>
                        <p className='nn-row-txt'>{note?.updated_at}</p>
                    </div>

                    <div className='nn-row nn-row-four'>
                                <i className='fa-solid fa-ellipsis nn-row-ellips' onClick={() => showNotebookNoteForm(note?.title)}></i>
                    </div>
                            

                </div>
                    ))
                }

                    { notebookNoteForm &&
                    <div className='nn-options-dropdown' ref={noteOptionsRef}>
                        <div className='nn-od-row nn-odr-title'>
                        <i className="fa-solid fa-file-lines nn-odr-icon"></i>
                        <p id='nn-od-title'>{currentNoteInfo}</p>
                        </div>
                        <div className='nn-od-row'>
                            <p>Move to..</p>
                        </div>
                        <div className='nn-od-row'>
                            <p>Copy to..</p>
                        </div>
                        <div className='nn-od-row'>
                            <p>Duplicate</p>
                        </div>
                        <div className='nn-od-row nn-odr-last'>
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
                <div className='nb-actions-row'>
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
                            { renameErrors.length > 0 && 
                            <p id='rn-nbf-err-txt'>Notebook name must contain at least one character.</p>
                            }
                        </div>

                    </div>
                    <div className='rn-nbf-btns'>
                        <button type='button' id='nb-rn-btn-cancel' onClick={() => setRenameNotebook(false)}>Cancel</button>
                        <button type='submit' className='nb-rn-btn-submit' disbaled={!!renameErrors.length}>Continue</button>
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

        </>
    )
}


export default NotebooksPreview;