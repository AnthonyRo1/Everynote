import './landingnav.css'

const LandingNav = () => {

    const setCaret = () => {
        console.log(true);
    }
    return (
        <div className='landing-nav-container'>
            <div className='landing-nav'>
                
                <div className='left-nav'>
                    <div id='landing-logo'></div>
                    <div id='landing-links-left'>
                        <div className='landing-link-left ll-first'>
                            <a>Github</a>
                        </div>
                        <div className='landing-link-left'>
                            <a>About</a>
                        </div>
                        <div className='landing-link-left ll-last'>

                        </div>
                    </div>
                </div>
                <div className='right-nav'>
                </div>
                </div>

        </div>
    )
}


export default LandingNav;