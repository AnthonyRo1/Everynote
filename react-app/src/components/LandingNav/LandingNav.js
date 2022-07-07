import './landingnav.css'
import {useState} from 'react';
import logos from '../../images/everynote_logo.png'
import {NavLink} from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const LandingNav = () => {
    const history = useHistory();
    const [rightLinkHovered, setRightLinkHovered] = useState(false);
    const [leftLinkHovered, setLeftLinkHovered] = useState(false)
    const [mouseOver, setMouseOver] = useState(false);
    const [dropDownHovered, setDropDownHovered] = useState(false);



    const rightLinkHover = () => {
        setMouseOver(true);
        setRightLinkHovered(true);
    }

    const leftLinkHover = () => {
        setMouseOver(true)
        setLeftLinkHovered(true)
    }

    const rightLinkExit = () => {
        setMouseOver(true)
        setRightLinkHovered(false);
    }

    const leftLinkExit = () => {
        setMouseOver(true)
        setLeftLinkHovered(false)
    }

    const anyLinkHovered = leftLinkHovered || rightLinkHovered;

    console.log(anyLinkHovered)

    return (
        <div className='nav-popup-container'>
        <div className='landing-nav-container'>
            <div className='landing-nav'>
                
                <div className='left-nav'>
                    <div id='landing-logo-box'>
                            <img id='landing-img' src={logos}></img>
                    </div>
                    <div id='landing-title-box'>
                        <p id='landing-logo-text'>Everynote</p>
                    </div>
                    <div id='landing-links-left'>
                            <div className={leftLinkHovered ? 'landing-link-left link-hovered ll-first' : 'landing-link-left ll-first'}>
                                <a onMouseEnter={() => leftLinkHover()}
                                    onMouseLeave={() => leftLinkExit()}
                                    className={leftLinkHovered ? 'landing-link each-link-hovered' : 'landing-link'}>GITHUB</a>
                                {!leftLinkHovered ?
                                    <i className="fas fa-caret-down arrow-down" ></i> :
                                    <i className="fas fa-caret-up arrow-up"></i>
                                }
                        </div>
                        <div className={rightLinkHovered ? 'landing-link-left link-hovered ll-last' : 'landing-link-left ll-last'}>
                            <a onMouseEnter={() => rightLinkHover()}
                            onMouseLeave={() => rightLinkExit()}
                            className={rightLinkHovered ? 'landing-link each-link-hovered' : 'landing-link'}>ABOUT</a>

                            { !rightLinkHovered ?
                            <i className="fas fa-caret-down arrow-down" ></i> :
                             <i className="fas fa-caret-up arrow-up"></i>
                            }
                        </div>
                        <div className='landing-link-left ll-last'>
                        </div>
                    </div>
                </div>
                <div className='right-nav'>
                    <div className='login-box'>
                        <button id='login-nav-btn' onClick={() => history.push('/login')}>Login</button>
                    </div>
                </div>
            </div>
        </div>{ mouseOver &&
        <div className='landing-nav-dropdown' onMouseEnter={() => setMouseOver(true)} 
        onMouseLeave={() => setMouseOver(false)}>
            
        </div>}
            {mouseOver &&
        <div className='landing-nav-dropdown' onMouseEnter={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}>

        </div>}

        </div>
    )
}


export default LandingNav;