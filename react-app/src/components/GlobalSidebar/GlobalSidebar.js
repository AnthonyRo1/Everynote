import './globalsidebar.css'
import {NavLink} from 'react-router-dom';
import { useState } from 'react';

const GlobalSidebar = () => {

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
                    </div>
                        <p id='sb-email'>new@new.com</p>
                        <i className="fa-solid fa-angle-down sbt-angle-down"></i>
                </div>
                <div className='sidebar-settings'>
                    <i className="fa-solid fa-gear sb-gear"></i>
                </div>
            </div>
            <div className='user-newnote-divider'></div>
            <div className='sidebar-new-note'>
                <div id='sb-new-note-btn'>
                    <div id='new-note-plus-box'>
                        <i class="fa-solid fa-plus new-note-plus"></i>
                        <p id='sb-new-txt'>New</p>
                    </div>
                    <div id='sbnn-angle-down-box'>
                        <i className="fa-solid fa-angle-down sbnn-ad"></i>
                    </div>
                </div>
            </div>
            <div id='sb-home-btn-box'>
                <div id='sb-home-background'>
                <i class="fa-solid fa-house sb-home-icon"></i>
                <NavLink to='/home' id='sb-home-link'>
                <p id='sb-home-txt'>Home</p>
                </NavLink>
                </div>
            </div>
            <div className='sidebar-list'>
                <ul className='sb-ul'>
                    <li className='sb-li'>
                     <NavLink to='/notes' className='sb-links'>
                            <i class="fa-solid fa-note-sticky sb-li-icon"></i>
                            <p className='sb-li-txt'>Notes</p>
                     </NavLink>
                    </li>
                    <li className='sb-li' onMouseEnter={() => liTextWhite()}
                    onMouseLeave={() => liTextDark()}>
                        <NavLink to='/notes' className='sb-links'>
                                <i class="fa-solid fa-book sb-li-icon"></i>
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