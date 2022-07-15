import { getAllNotes } from "./notes"

const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS'
const UPDATE_NOTEBOOK = 'notebooks/UPDATE_NOTEBOOK'
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK'
const CREATE_NOTEBOOK = 'notebooks/CREATE_NOTEBOOK'


const getNotebooks = (notebooks) => ({
    type: GET_NOTEBOOKS,
    notebooks
})

const createNotebook = (notebook) => ({
    type: CREATE_NOTEBOOK,
    notebook
})

const updateNotebook = (notebook) => ({
    type: UPDATE_NOTEBOOK,
    notebook
})

const deleteNotebook = (notebook) => ({
    type: DELETE_NOTEBOOK,
    notebook
})


export const getAllNotebooks = () => async dispatch => {
    const res = await fetch('/api/notebooks')

    if (res.ok) {
        const notebooks = await res.json()
        dispatch(getNotebooks(notebooks))
    }

};


export const createSingleNotebook = (data) => async dispatch => {
    const res = await fetch(`/api/notebooks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const notebook = await res.json();
        dispatch(createNotebook(notebook))
        return notebook;
    }
}


export const updateSingleNotebook = (id, data) => async dispatch => {
    const res = await fetch(`/api/notebooks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const notebook = await res.json();
        dispatch(updateNotebook(notebook))
    }
}


export const deleteSingleNotebook = (id) => async dispatch => {
    const res = await fetch(`/api/notebooks/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const notebook = await res.json()
        dispatch(deleteNotebook(notebook))
        dispatch(getAllNotes())
    }
}


export default function notebooksAll(state = {}, action) {
    let newState;
    let notebooks;
    let notebook;
    switch(action.type) {
        case CREATE_NOTEBOOK:
            newState = {...state} 
            notebook = action.notebook;
            newState[notebook.id] = notebook;
            return newState
        case GET_NOTEBOOKS:
            newState = {}
            notebooks = action.notebooks.notebooks;
            notebooks.forEach(notebook => {
                newState[notebook.id] = notebook;
            })
            return newState;
        case UPDATE_NOTEBOOK:
            newState = {...state} 
            notebook = action.notebook;
            newState[notebook.id] = notebook;
            return newState;
        case DELETE_NOTEBOOK:
            newState = {...state};
            notebook = action.notebook;
            delete newState[notebook.id];
            return newState;
        default: 
            return state;
    }
}

