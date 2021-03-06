import './landingnav.css'
import {useEffect, useState} from 'react';
import logos from '../../images/everynote_logo.png'
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';

const LandingNav = () => {

    const linkLeftRef = useRef(null);
    const history = useHistory();
    const [hoverData, setHoverData] = useState([]);

    const [rightLinkHovered, setRightLinkHovered] = useState(false);
    const [leftLinkHovered, setLeftLinkHovered] = useState(false)
    const [mouseOver, setMouseOver] = useState(false);
    const [dropDownHovered, setDropDownHovered] = useState(false);




    const rightLinkHover = () => {
        setMouseOver(true);
        setDropDownHovered(true);
    }

    const leftLinkHover = () => {
    }

    const rightLinkExit = () => {
        setMouseOver(false)
    }

    const leftLinkExit = () => {
        setMouseOver(false)
        setDropDownHovered(false);
    }

    const anyLinkHovered = leftLinkHovered || rightLinkHovered;

    return (
        <div className='landing-nav-container'>
            <div className='landing-nav-bg'>
            <div className='landing-nav-content'>
                <div className='ln-c-left'>
                <div className='logo-container'>
                    <img src={logos}></img>
                    <p id='logo-txt'>Everynote</p>
                </div>
                <nav className='nav-container'>
                    <ul className='nc-ul'>
                        <li className='nc-li'>
                                    <a id='github-link' href='https://github.com/AnthonyRo1/Everynote'>
                            GITHUB
                            <i class="fab fa-github"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
                </div>
                <div className='login-area-container'>
                        <button id='la-c-login-btn' onClick={() => history.push('/login')}>Log In</button>
                </div>
            </div>
        </div>
        {
            mouseOver && dropDownHovered &&
            <div className='ln-dropdown-container' onMouseEnter={() => setDropDownHovered(true)}
            onMouseLeave={() => setDropDownHovered(false)}
            >

            </div>
        }
        </div>
    )
}


export default LandingNav;