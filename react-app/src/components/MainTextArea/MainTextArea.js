import './maintextarea.css'
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
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


    const noteContentRef = useRef(null);

    const currentNote = Object.values(allNotes).find(note => note?.id == noteId)
    const currentNoteTitle = noteId == undefined ? '' : currentNote?.title
    // const currentNoteContent = currentNote?.content ? currentNote?.content : ''
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('')
    const [brightenBtn, setBrightenBtn] = useState(false);
    const [errors, setErrors] = useState([]);
    const [textareaDisabled, setTextareaDisabled] = useState(false);
    const [savedText, setSavedText] = useState(false);
    const [noteLimit, setNoteLimit] = useState('');
    useEffect(() => {

        if (currentNote !== undefined) {
            setNoteContent(note?.content)
            setNoteTitle(note?.title)
        } else if (currentNote === undefined) {
            setNoteContent('');
            setNoteTitle('')
        }
        setErrors([]);
    }, [currentNote?.title])



    useEffect(() => {
        if (noteTitle.length === 49) {
            setErrors(['(You\'ve reached the 50 character note title limit.)'])
            setTimeout(() => {
                setErrors([])
            }, 4000)
        }

        
    }, [noteTitle])



    useEffect(() => {

        setNoteLimit(500 - noteContent.length)
        
    }, [noteContent])

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

        if (noteTitle.length <= 0 ) {
            err.push('Title must contain at least one character.')
        }
        if (noteTitle.length === 50) {
            err.push('Title may not be longer than 50 characters.')
        } 
        if (noteContent.length <= 0) {
            err.push('Note content must contain at least one character.')
        }
        if (noteContent.length > 500 ) {
            err.push('Note content may not be longer than 500 characters.')
        }
        setErrors(err);
        setTimeout(() => {
            setErrors([])
        }, 6000)

        if (err.length === 0) {
            dispatch(updateSingleNote(noteId, data))
            setBrightenBtn(false);
            setSavedText(true);
            setErrors([]);
            setTimeout(() => {
                setSavedText(false);
            }, 3000)

        }
    
        } else {
            
            setErrors(['You must make changes to this note before saving.'])
            setSavedText(false);
            setTimeout(() => {
                setErrors([]);
            }, 4000)
        }

    }

    const handleTitle = (e) => {
        if (e.target.value.length >= 0 && e.target.value.length < 50) {
            setNoteTitle(e.target.value);
        } 
    }

    const submitter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            noteContentRef.current.focus()
        }
    }


    return (
    <div className='entire-container'>
        <ul className='note-err-li'>
        {
            errors.length > 0 && errors.map((err) => (
                <li>{err}</li>
            ))
        }
        </ul>
        { savedText &&
        <div className='note-saved-box'>
        <p id='note-saved-txt'>Note saved</p>
        </div>
        }
        <button className={brightenBtn ? 'save-text-button brighten' : 'save-text-button'} onClick={() => saveContent()}>Save</button>
            <div className='te-divider'>
                <div id='te-line'></div>
            </div>
        <div className='main-text-area-container'>
{
    currentNote &&
            <form className='text-area-main-form' onSubmit={submitter}>

                {/* TITLE + NOTE - DIVIDER TOP */}
                <div className='text-area-divider te-d-top'>
                </div>

                {/* NOTE TITLE */}
                <div className='top-txt-container'>
                <textarea id='text-editor-title'
                placeholder='Title'
                value={noteTitle}
                onChange={(e) => {
                    handleTitle(e)
                }}
                onKeyDown={(e) => submitter(e)}>
                </textarea>
                </div>


                {/* TITLE + NOTE - DIVIDER BOTTOM */}
                <div className='text-area-divider te-d-bottom'>
                </div>

                            <p id='note-limit-txt'>Note content character limit: <span className={noteLimit < 0 ? 'note-limit color-red' : 'note-limit'}>{noteLimit}</span></p>
                {/* NOTE */}
                <div className='bottom-txt-container'>
                <textarea className='text-editor-type'
                placeholder='Start writing a new note.'
                value={noteContent}
                onChange={(e) => trackChanges(e)}
                ref={noteContentRef}
                >
                </textarea>
                </div>


            </form>
}
        </div>
    </div>
    )
}


export default MainTextArea;