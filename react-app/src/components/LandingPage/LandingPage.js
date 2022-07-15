import './landingpage.css'
import LandingNav from '../LandingNav/LandingNav'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LandingTitle from '../LandingTitle/LandingTitle'
import LandingPageContent from '../LandingPageContent/LandingPageContent'



const LandingPage = () => {

    const user = useSelector((state) => state.session.user);

    
    useEffect(() => {
        if (user) {
            <Redirect to='/home'/>
        }
    }, [])


    return (
        <div className='landing-page-container'>
            <LandingNav/>
            <LandingTitle/>
            <LandingPageContent/>
        </div>
    )
}

export default LandingPage