import './landingtitle.css'
import {NavLink} from 'react-router-dom'
const LandingTitle = () => {
    return (
        <div className='landing-title-container'>
            <div className='lt-top-txt'>
                <p>Be in control of your work, manage your tasks.</p>
            </div>
            <div className='lt-mid-txt'>
                <p>Remember your tasks, organize projects with notes, and group notes together all in one place.</p>
            </div>
            <div className='lt-bottom-btn-box'>
                <NavLink to='/sign-up'>
                <button id='lt-bb-btn'>Sign up for free</button>
                </NavLink>
            </div>

            <div className='lt-bottom-link-box'>
                <NavLink to='/login' id='lt-bl-lb-txt'>
                    <p>Already have an account? Log in</p>
                </NavLink>
            </div>
        </div>
    )
}


export default LandingTitle;