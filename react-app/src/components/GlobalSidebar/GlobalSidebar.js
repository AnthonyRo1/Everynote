import './globalsidebar.css'
import {NavLink} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const GlobalSidebar = () => {
    const [userHasNotes, setUserHasNotes] = useState(0);
    const allNotes = useSelector((state) => state.notesAll);
    const user = useSelector((state) => state.session.user);
    const userNotes = Object.values(allNotes).filter(note => note?.user_id == user?.id);

    useEffect(() => {
        setUserHasNotes(userNotes.length);
    }, [])

    const [liText, setLiText] = useState(false);

    const liTextWhite = () => {
        setLiText(true);
    }

    const liTextDark = () => {
        setLiText(false);
    }

    return (
        <div className='global-sidebar-container'>
            <div className='sidebar-top' >
                <div className='sidebar-userinfo'>
                    <div id='sb-icon-box'>
                        <div id='sb-user-icon'>
                        </div>
                        <p id='sb-email'>new@new.com</p>
                        <i className="fa-solid fa-angle-down sbt-angle-down"></i>
                    </div>
                </div>
                    <div id='sb-gear-box'>
                    <i className="fa-solid fa-gear sb-gear"></i>
                    </div>
            </div>
            <div className='user-newnote-divider'></div>
            <div className='sidebar-new-note'>
                <div id='sb-new-note-btn'>
                    <div id='new-note-plus-box'>
                        <i className="fa-solid fa-plus new-note-plus"></i>
                        <p id='sb-new-txt'>New</p>
                    </div>
                    <div id='sbnn-angle-down-box'>
                        <i className="fa-solid fa-angle-down sbnn-ad"></i>
                    </div>
                </div>
            </div>
            <div id='sb-home-btn-box'>
                <NavLink to='/home' id='sb-home-link'>
                <div id='sb-home-background'>
                <i className="fa-solid fa-house sb-home-icon"></i>
                <p id='sb-home-txt'>Home</p>
                </div>
                </NavLink>
            </div>
            <div className='sidebar-list'>
                <ul className='sb-ul'>
                    <li className='sb-li'>
                     <NavLink to={userHasNotes > 0 ? `/notes/${userNotes[0]?.id}` : '/notes'} className='sb-links'>
                            <i className="far fa-sticky-note sb-li-icon"></i>
                            <p className='sb-li-txt'>Notes</p>
                     </NavLink>
                    </li>
                    <li className='sb-li' onMouseEnter={() => liTextWhite()}
                    onMouseLeave={() => liTextDark()}>
                        <NavLink to='/notebooks' className='sb-links'>
                                <i className="fa-solid fa-book sb-li-icon"></i>
                                <p className='sb-li-txt'>Notebooks</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='sidebar-footer'></div>
        </div>
    )
}

export default GlobalSidebar;