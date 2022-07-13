import './homepage.css'
import HomeNotes from '../HomeNotes/HomeNotes';
import {useSelector} from 'react-redux';
import { useState } from 'react';
const HomePage = () => {

    const [recent, setRecent] = useState(true);
    const [seeAll, setSeeAll] = useState(false);


    const daysBetween = (date_1, date_2) => {
        date_1 = new Date(date_1);
        date_2 = new Date(date_2);
        let difference = date_2.getTime() - date_1.getTime()
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays
    }

    const allNotes = useSelector((state) => state.notesAll)
    const notesArr = Object.values(allNotes).reverse();

    const allRecent = notesArr.filter((note) => {
        const noteMinutes = new Date(note?.created_at).getMinutes();
        const todayMinutes = new Date().getMinutes();

        return (todayMinutes - noteMinutes) < 10;
    });


    return (
        <div className='home-page-container'>
            <div className='hp-bg' style={{
                background: `url(https://images.unsplash.com/photo-1521495084171-3ad639e3d525?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwYW5kJTIwbGFwdG9wfGVufDB8fDB8fA%3D%3D&w=1000&q=80)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                filter: 'sepia(10%)'
            }}></div>
            <div className='home-page-grid'>
                <div className='grid-row'>
                    <div className='gr-header'>
                        <div className='gr-h-txt'>
                        <p id='gr-h-txt'>Notes</p>
                        <i className="fas fa-chevron-right gr-right-arrow"></i>
                        </div>
                    </div>
                    <div className='gr-links-mid'>
                        <p className='gr-links-txt' tabIndex={0}>Recent</p>
                        <p className='gr-links-txt' tabIndex={1}>All</p>
                    </div>
                    <div className='gr-inner'>
                        <div className='gr-scroll'>
                        { 
                        notesArr.length > 0 && notesArr.map((note, i) => (
                            <HomeNotes key={i} note={note}/>
                        ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;