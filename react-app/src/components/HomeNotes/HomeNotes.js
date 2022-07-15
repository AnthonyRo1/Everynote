import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './homenotes.css';

const HomeNotes = ({note}) => {

    const allNotebooks = useSelector((state) => state.notebooksAll);
    const notebook = Object.values(allNotebooks).find(notebook => notebook?.id === note?.notebook_id);

    return (
        <NavLink to={notebook ? `/notes/notebooks/${notebook?.id}/${note?.id}` : `notes/${note?.id}`}>
        <div className='home-note-container'>
            <div className='hn-c-text-box'>
                <div className='hn-c-tb-header'>
                    <p id='p-title'>{note?.title}</p>
                </div>
                    <div className='home-notes-divider'></div>
                <div className='hn-c-tb-content'>
                    <p id='p-content'>{note?.content}</p>
                </div>
            </div>
        </div>
        </NavLink>
    )
}


export default HomeNotes;