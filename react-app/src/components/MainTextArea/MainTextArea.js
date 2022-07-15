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
    console.log(noteId, 'MAIN TEXT AREA');
    const {notebookId} = useParams();
    const allNotes = useSelector((state) => state.notesAll);



    const currentNote = Object.values(allNotes).find(note => note?.id == noteId)
    const currentNoteTitle = currentNote?.title ? currentNote?.title : ''
    const currentNoteContent = currentNote?.content ? currentNote?.content : ''
    const [noteTitle, setNoteTitle] = useState(currentNoteTitle);
    const [noteContent, setNoteContent] = useState(currentNoteContent)
    const [brightenBtn, setBrightenBtn] = useState(false);
    const [errors, setErrors] = useState([]);
    const [textareaDisabled, setTextareaDisabled] = useState(false);
    useEffect(() => {
        if (noteId !== undefined) {
            setNoteContent(currentNote?.content)
            setNoteTitle(currentNote?.title)
        } else {
            setNoteContent('');
            setNoteTitle('')
        }
        setErrors([]);
    }, [currentNote?.id, noteId == undefined])



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
        if (noteTitle.length > 50) {
            err.push('Title may not be longer than 50 characters.')
        } 
        if (noteContent.length <= 0) {
            err.push('Note content must contain at least one character.')
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
            setErrors(['You must make changes to this note before saving.'])
        }

    }

    const handleTitle = (e) => {
        if (e.target.value.length >= 0 && e.target.value.length < 50) {
            setNoteTitle(e.target.value);
        }
    }


    return (
    <div className='entire-container'>
        {
            errors.length > 0 && errors.map((err) => (
                <p id='err-txt-note'>{err}</p>
            ))
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
                onChange={(e) => {
                    handleTitle(e)
                }}
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