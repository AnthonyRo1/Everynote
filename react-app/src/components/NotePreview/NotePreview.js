import './notepreview.css';
import { NavLink, useParams } from 'react-router-dom';
import { useState } from 'react';

const NotePreview = ({title, content, updated, id, notebookId}) => {
    

    return (
        <NavLink to={!notebookId ? `/notes/${id}` : `/notes/notebooks/${notebookId}/${id}`}>
        <div className={'note-preview-container'} >
            <div className='np-c-title'>
                <p id='np-ct-txt'>{title}</p>
            </div>
            <div className='np-c-inner'>
                <p id='np-ci-maintxt'>{content}</p>
            </div>
            <div className='np-c-footer'>
                <p id='np-cf-txt'>{updated}</p>
            </div>
        </div>
        </NavLink>
    )
}


export default NotePreview;