import './landingnav.css'
import {useState} from 'react';
import logos from '../../images/everynote_logo.png'

const LandingNav = () => {

    const [rightLinkHovered, setRightLinkHovered] = useState(false);
    const [leftLinkHovered, setLeftLinkHovered] = useState(false)

    const rightLinkHover = () => {
        setRightLinkHovered(true);
    }

    const leftLinkHover = () => {
        setLeftLinkHovered(true)
    }

    const rightLinkExit = () => {
        setRightLinkHovered(false);
    }

    const leftLinkExit = () => {
        setLeftLinkHovered(false)
    }


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
                                    <i class="fas fa-caret-up arrow-up"></i>
                                }
                        </div>
                        <div className={rightLinkHovered ? 'landing-link-left link-hovered ll-last' : 'landing-link-left ll-last'}>
                            <a onMouseEnter={() => rightLinkHover()}
                            onMouseLeave={() => rightLinkExit()}
                            className={rightLinkHovered ? 'landing-link each-link-hovered' : 'landing-link'}>ABOUT</a>

                            { !rightLinkHovered ?
                            <i className="fas fa-caret-down arrow-down" ></i> :
                             <i class="fas fa-caret-up arrow-up"></i>
                            }
                        </div>
                        <div className='landing-link-left ll-last'>
                        </div>
                    </div>
                </div>
                <div className='right-nav'>
                    <div className='login-box'>
                        <button id='login-nav-btn'></button>
                    </div>
                </div>
                </div>
        </div>
        </div>
    )
}


export default LandingNav;