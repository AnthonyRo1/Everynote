const GET_NOTES = 'notes/GET_NOTES'
const CREATE_NOTE = 'notes/CREATE_NOTE'
const UPDATE_NOTE = 'notes/UPDATE_NOTE'
const DELETE_NOTE = 'notes/DELETE_NOTE'
const MOVE_NOTE = 'notes/MOVE_NOTE'


const getNotes = (notes) => ({
    type: GET_NOTES,
    notes
})

const createNote = (note) => ({
    type: CREATE_NOTE,
    note
})

const updateNote = (note) => ({
    type: UPDATE_NOTE,
    note
})

const deleteNote = (note) => ({
    type: DELETE_NOTE,
    note
})

const moveNote = (note) => ({
    type: MOVE_NOTE,
    note
})



export const getAllNotes = () => async dispatch => {
    const res = await fetch('/api/notes')

    if (res.ok) {
        const notes = await res.json()
        dispatch(getNotes(notes))
    }
}


export const createSingleNote = (data) => async dispatch => {
    const res = await fetch(`/api/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const note = await res.json()
        dispatch(createNote(note))
        return note;
    }
}


export const updateSingleNote = (id, data) => async dispatch => {
    const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const note = await res.json();
        dispatch(updateNote(note))
        return note
    }
};



export const deleteSingleNote = (id) => async dispatch => {
    const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const deletedNote = await res.json();
        dispatch(deleteNote(deletedNote))
        dispatch(getAllNotes())
        return deletedNote
    }
};

export const moveSingleNote = (noteId, notebookId) => async dispatch => {
    const res = await fetch(`/api/notes/${noteId}/${notebookId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({noteId, notebookId})
    })

    if (res.ok) {
        const movedNote = await res.json();
        dispatch(moveNote(movedNote))
    }
}


export const createNotebookNote = (notebookId, data) => async dispatch => {
    const res = await fetch(`/api/notes/${notebookId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const notebookNote = await res.json();
        dispatch(createNote(notebookNote));
        return notebookNote;
    }
}

export default function notesAll(state = {}, action) {
    let newState;
    let note;
    let notes;
    switch(action.type) {
        case CREATE_NOTE:
            newState = {...state}
            note = action.note;
            newState[note.id] = note;
            return newState;
        case GET_NOTES: 
            newState = {}
            notes = action.notes.notes;
            notes.forEach(note => {
                newState[note.id] = note
            });
            return newState;
        case UPDATE_NOTE:
            newState = {...state}
            note = action.note;
            newState[note.id] = note;
            return newState
        case DELETE_NOTE:
            newState = {...state}
            note = action.note;
            delete newState[note.id]
            return newState;
        case MOVE_NOTE:
            newState = {...state} 
            note = action.note;
            newState[note.id] = note;
            return newState
        default:
            return state;
    }
}