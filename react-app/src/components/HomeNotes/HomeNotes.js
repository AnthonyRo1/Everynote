import { useEffect } from 'react';
import './homenotes.css';

const HomeNotes = ({note}) => {


    const str = new Date(note?.created_at).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })

    const today = new Date();
    const noteDate = new Date(note?.created_at);
    const minutesAgo = today.getMinutes() - noteDate.getMinutes()
    const hoursAgo = today.getHours() - noteDate.getHours();


    const getNoteTime = () => {
        if (minutesAgo < 60) {
            return minutesAgo.toString()+ ' minutes ago'
        } else if (hoursAgo < 24) {
            if (hoursAgo === 1) {
                return '1 hour ago'
            } else {
                return hoursAgo.toString() + ' hours ago';
            }
        } else return daysBetween(today, noteDate).toString() + 'days ago';
    }

    
    

    const daysBetween = (date_1, date_2) => {
        date_1 = new Date(date_1);
        date_2 = new Date(date_2);
        let difference = date_2.getTime() - date_1.getTime()
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays
    }

    



    return (
        <div className='home-note-container'>
            <div className='hn-c-text-box'>
                <div className='hn-c-tb-header'>
                    <p id='p-title'>{note?.title}</p>
                </div>
                    <div className='home-notes-divider'></div>
                <div className='hn-c-tb-content'>
                    <p id='p-content'>{note?.content}</p>
                </div>
            </div>
        </div>
    )
}


export default HomeNotes;