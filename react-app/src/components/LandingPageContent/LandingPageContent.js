import './landingpagecontent.css'
import laptop from '../../images/laptop_example.png'
import logo  from '../../images/everynote_logo.png'
const LandingPageContent = () => {
    return (
        <div className='lp-content-container'>
            <div className='laptop-container'>
                <img id='laptop-img' src={laptop}></img>
                <div className='cool-stuff-container'>
                    <div className='cool-stuff-txt first-cs-t'>
                        <div>
                        <p className='cool-stuff-h first-h'>
                            ACCESS NOTES ANYWHERE</p>
                        <p className='cool-stuff-s first-cs'>
                            Keep important info, manage your notes by moving, duplicating, or displaying all notes.</p>
                        </div>
                    </div>
                    <div className='cool-stuff-txt second-cs-t'>
                        <p className='cool-stuff-h'>ORGANIZE NOTES</p>
                        <p className='cool-stuff-s'>Make notes more useful by grouping them within notebooks.</p>
                    </div>
                </div>
            </div>
            <div className='lp-footer-container'>
                <div className='lp-footer-logo'>
                    <img src={logo}></img>
                    <p id='lp-f-logo-txt'>Everynote</p>
                </div>
            </div>
        </div>
    )
}

export default LandingPageContent;