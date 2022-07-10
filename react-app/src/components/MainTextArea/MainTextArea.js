import './maintextarea.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const MainTextArea = ({note}) => {
    const {noteId} = useParams();

    console.log(noteId, 'MAIN NOTE MAIN NOTE MAIN NOTE');
    const allNotes = useSelector((state) => state.notesAll);



    const currentNote = Object.values(allNotes).find(note => note?.id == noteId)


    const [noteTitle, setNoteTitle] = useState(currentNote?.title);
    const [noteContent, setNoteContent] = useState(currentNote?.content)
    

    
    useEffect(() => {
        setNoteContent(currentNote?.content)
        setNoteTitle(currentNote?.title)
    }, [currentNote?.content])

    console.log(noteContent, 'IS NOTE CONTENT CHANGE????')



    return (
        <div className='main-text-area-container'>
            <form className='text-area-main-form'>

                {/* TITLE + NOTE - DIVIDER TOP */}
                <div className='text-area-divider te-d-top'>
                </div>


                {/* NOTE TITLE */}
                <div className='top-txt-container'>
                <textarea id='text-editor-title'
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                >
                </textarea>
                </div>


                {/* TITLE + NOTE - DIVIDER BOTTOM */}
                <div className='text-area-divider te-d-bottom'>
                </div>


                {/* NOTE */}
                <div className='bottom-txt-container'>
                <textarea className='text-editor-type'
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                >
                </textarea>
                </div>


            </form>
        </div>
    )
}


export default MainTextArea;