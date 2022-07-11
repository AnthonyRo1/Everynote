import './allnotebooks.css'
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getAllNotebooks} from '../../store/notebook'
import NotebooksPreview from '../NotebooksPreview/NotebooksPreview'
const AllNotebooks = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllNotebooks())
    }, [])  

    const user = useSelector((state) => state.session.user);
    const allNotebooks = useSelector((state) => state.notebooksAll);
    const userNotebooks = Object.values(allNotebooks).filter(notebook => notebook?.user_id == user?.id);

    console.log(userNotebooks);

    return (
        <div className='all-notebooks-container'>

            <div className='an-header'>
                <p id='an-header-title'>Notebooks</p>
            </div>

            <div className='an-subheader'>
                <p id='an-subheader-title'>{userNotebooks.length} notebooks</p>
                <div className='new-notebook-btn'>
                    <div className='nn-btn-txt-box'>
                        <i class="fa-solid fa-square-plus new-notebook-icon"></i>
                        <p id='new-notebook-txt'>New Notebook</p>
                    </div>
                </div>
            </div>

            <div className='an-header-divider'>
                <div className='an-hd-line'></div>
            </div>
                <div className='all-notebooks-main'>
                <div className='nb-table-header'>
                    <div className='nb-th-txt nb-th-one'>TITLE
                    </div>
                    <div className='nb-th-txt nb-th-two'>CREATED BY</div>
                    <div className='nb-th-txt nb-th-three'>UPDATED</div>
                    <div className='nb-th-txt nb-th-four'>ACTIONS</div>
                </div>
            {
                userNotebooks.length > 0 && userNotebooks.map((notebook, i) => (
                    
                    <NotebooksPreview tabindex={i} notebook={notebook}/>
                ))
            }
                </div>
            
        </div>
    )
}


export default AllNotebooks;