import { useState } from 'react';
import './notebookspreview.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotebooksPreview = ({notebook, tabindex}) => {

    const [arrowTurned, setArrowTurned] = useState(false);
    const [notebookNoteForm, setNotebookNoteForm] = useState(false);


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

    

    const showNotebookNoteForm = () => {

    }
    return (
        <>
        <div className='notebooks-preview-container'>
            <div className='notebooks-table'>
                <div className='nb-table-content' tabIndex={tabindex} >
                    <div className='nb-td-txt nb-td-one'>
                        <i class={arrowTurned ? "fa-solid fa-caret-right nb-th-arrow-right arrow-right-turned" : "fa-solid fa-caret-right nb-th-arrow-right"} onClick={() => turnArrow()}></i>
                        <i class="fa-solid fa-book nb-th-notebook"></i>
                        {notebook?.title}
                        </div>
                    <div className='nb-td-txt nb-td-two'>{user?.email}</div>
                    <div className='nb-td-txt nb-td-three'>{notebook?.updated_at}</div>
                    <div className='nb-td-txt nb-td-four'>
                        <i className="fa-solid fa-ellipsis nb-td-actions"></i>
                    </div>
                </div>
            </div>
        </div>
        {
            arrowTurned &&
            <>
                {
                    notebookNotes.length > 0 && notebookNotes.map((note, i) => (
                        <div className='notebook-notes-dropdown'>
                        <div className='nn-row nn-row-one'>
                            <div id='nn-row-title'>
                                <i className="fa-solid fa-file-lines nn-row-icon"></i>
                                <p id='nn-row-title-txt'>{note?.title}</p>
                            </div>
                        </div>
                        <div className='nn-row nn-row-two'></div>
                        <div className='nn-row nn-row-three'>
                            <p className='nn-row-txt'>{note?.updated_at}</p>
                        </div>
                        <div className='nn-row nn-row-four'>
                            <i class="fa-solid fa-ellipsis nn-row-ellips" onClick={() => showNotebookNoteForm()}></i>
                        </div>
                        <div className='nn-options-dropdown'>

                        </div>
                        </div>
                    ))
                }
                </>
        }

        </>
    )
}


export default NotebooksPreview;