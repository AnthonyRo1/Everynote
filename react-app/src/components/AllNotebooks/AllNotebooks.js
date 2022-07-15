import './allnotebooks.css'
import {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getAllNotebooks} from '../../store/notebook'
import NotebooksPreview from '../NotebooksPreview/NotebooksPreview'
import { createSingleNotebook } from '../../store/notebook';


const AllNotebooks = () => {



    const dispatch = useDispatch();




    useEffect(() => {
        dispatch(getAllNotebooks())
    }, [dispatch])  



    const notebookFormRef = useRef(null);




    useEffect(() => {
        window.document.addEventListener('mousedown', (e) => {
            if (notebookFormRef.current && !notebookFormRef.current.contains(e.target)) {
                setNotebookForm(false);
            }
        })


    }, [])


    // NEW NOTEBOOK FORM STATE
    const [notebookForm, setNotebookForm] = useState(false);
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');


    
    // LOAD ALL NOTEBOOKS STATE 
    const user = useSelector((state) => state.session.user);
    const allNotebooks = useSelector((state) => state.notebooksAll);
    const userNotebooks = Object.values(allNotebooks).filter(notebook => notebook?.user_id === user?.id);


    const showNotebookForm = () => {
        setNotebookForm(true);
    }


    useEffect(() => {
        const err = [];
        if (title.length <= 0) err.push('Your notebook name must have at least one character.')

        setErrors(err);
    }, [title])


    const createNewNotebook = (e) => {
        e.preventDefault();

        const data = {
            title
        }


        dispatch(createSingleNotebook(data));
        setNotebookForm(false);
        setTitle('');
    }





    return (
        <div className='all-notebooks-container'>

            <div className='an-header'>
                <p id='an-header-title'>Notebooks</p>
            </div>

            <div className='an-subheader'>
                <p id='an-subheader-title'>{userNotebooks.length} notebooks</p>
                <div className='new-notebook-btn'>
                    <div className='nn-btn-txt-box' onClick={() => showNotebookForm()}>
                        <i className="fa-solid fa-square-plus new-notebook-icon" ></i>
                        <p id='new-notebook-txt'>New Notebook</p>
                    </div>
                </div>
            </div>

            <div className='an-header-divider'>
                <div className='an-hd-line'></div>
            </div>



            {notebookForm &&   <div className='new-notebook-form-container' ref={notebookFormRef}>
                <div className='new-nbf-header'>
                    <p>Create new notebook</p>
                    <i className="fas fa-times new-nbf-exit-icon" onClick={() => setNotebookForm(false)}></i>
                </div>
                <div className='new-nbf-description'>
                    <p>Notebooks can be useful for grouping notes around a common topic.</p>
                </div>
                 <form className='new-notebook-form' onSubmit={createNewNotebook}>
                    <div className='new-nbf-inputs'>
                        <label htmlFor='title'>Name</label>
                        <input
                        placeholder='Notebook Name'
                         name='title'
                         type='text'
                         value={title}
                         onChange={(e) => setTitle(e.target.value)}
                         >
                        </input>
                    </div>
                    <div className='new-nbf-error-box'>
                    {   errors.length > 0 &&              
                    <p id='new-nbf-error'>Your notebook name must have at least one character.</p>
                    }
                    </div>
                    <div className='new-nbf-btns'>
                        <button type='button' id='new-nbf-cancel' onClick={() => setNotebookForm(false)}>Cancel</button>
                        <button type='submit' className={errors.length > 0 ? 'new-nbf-submit grey-btn' : 'new-nbf-submit green-btn'} disabled={!!errors.length}>Create</button>
                    </div>
                </form>
            </div>
            }


                <div className='all-notebooks-main'>
                <div className='nb-table-header'>
                    <div className='nb-th-txt nb-th-one'>TITLE
                    </div>
                    <div className='nb-th-txt nb-th-two'>CREATED BY</div>
                    <div className='nb-th-txt nb-th-four'>ACTIONS</div>
                </div>
            {
                userNotebooks.length > 0 && userNotebooks.map((notebook, i) => (
                    
                    <NotebooksPreview key={i} tabindex={i} notebook={notebook}/>
                ))
            }
                </div>
            
        </div>
    )
}


export default AllNotebooks;