import './notebooknotes.css'
import { useSelector } from 'react-redux';
import NotePreview from '../NotePreview/NotePreview';
import { NavLink, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const NotebookNotes = () => {
    const { noteId, notebookId } = useParams();
    console.log(noteId);
    const user = useSelector((state) => state.session.user)
    const allNotes = useSelector((state) => state.notesAll);
    const notesArr = Object.values(allNotes);
    const allUserNotes = notesArr.filter(notes => notes?.user_id == user?.id).reverse();


    return (
        <div className='right-sidebar-container'>
            <div className='rs-header'>
                <div className='rs-h-innerheader'>
                    <div className='rs-h-ih-title'>
                        <i className="fa-solid fa-file-lines rs-h-ih-icon"></i>
                        <p id='rs-h-ih-txt' >All Notes</p>
                    </div>
                </div>
                <div className='rs-h-innerfooter'>
                    <div className='rs-h-if-icons'>
                        <div className='rs-h-if-icons-left'>
                            <p id='rs-h-if-txt'>{allUserNotes.length} notes</p>
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
                    allUserNotes.map((note, i) => (
                        <NotePreview key={i} title={note?.title} content={note?.content} updated={note?.updated_at} id={note?.id} />
                    ))

                }
            </div>
        </div>
    )
}


export default NotebookNotes;