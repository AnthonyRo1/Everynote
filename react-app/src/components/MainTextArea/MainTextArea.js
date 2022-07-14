import './maintextarea.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateSingleNote } from '../../store/notes';




const MainTextArea = ({note}) => {
    // note title = 'get breakfast'


    // state should have === 'get breakfast'

    // if state changes ? record the changes

    // 

    const dispatch = useDispatch();

    const {noteId} = useParams();
    const {notebookId} = useParams();
    const allNotes = useSelector((state) => state.notesAll);



    const currentNote = Object.values(allNotes).find(note => note?.id == noteId)

    const [noteTitle, setNoteTitle] = useState(currentNote?.title);
    const [noteContent, setNoteContent] = useState(currentNote?.content)
    const [brightenBtn, setBrightenBtn] = useState(false);
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        setNoteContent(currentNote?.content)
        setNoteTitle(currentNote?.title)
        setErrors([]);
    }, [currentNote?.id])



    const trackChanges = (e) => {
        setNoteContent(e.target.value);
        setBrightenBtn(true);
    }

    const saveContent = () => {

        const err = [];


        if ((currentNote?.title !== noteTitle) || (currentNote.content !== noteContent)) {

        const title = noteTitle;
        const content = noteContent;

        const data = {
            title,
            content
        }
        const err = [];
        if (noteTitle.length > 50) {
            err.push('Title may not be longer than 50 characters.')
        } 

        if (noteContent.length > 500 ) {
            err.push('Note content may not be longer than 500 characters.')
        }
        setErrors(err);

        if (err.length === 0) {
            dispatch(updateSingleNote(noteId, data))
            setBrightenBtn(false);
        }
    
        } else {
            setErrors(['error'])
        }

    }



    return (
    <div className='entire-container'>
        {
            errors.length > 0 && 
            <p id='err-txt-note'>Please make changes to this note before saving.</p>
        }
        <button className={brightenBtn ? 'save-text-button brighten' : 'save-text-button'} onClick={() => saveContent()}>Save</button>
            <div className='te-divider'>
                <div id='te-line'></div>
            </div>
        <div className='main-text-area-container'>

            <form className='text-area-main-form'>

                {/* TITLE + NOTE - DIVIDER TOP */}
                <div className='text-area-divider te-d-top'>
                </div>


                {/* NOTE TITLE */}
                <div className='top-txt-container'>
                <textarea id='text-editor-title'
                placeholder='Title'
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
                placeholder='Start writing a new note.'
                value={noteContent}
                onChange={(e) => trackChanges(e)}
                >
                </textarea>
                </div>


            </form>
        </div>
    </div>
    )
}


export default MainTextArea;