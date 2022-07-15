import './notepreview.css';
import { NavLink, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';



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
            </div>
        </div>
        </NavLink>
    )
}


export default NotePreview;