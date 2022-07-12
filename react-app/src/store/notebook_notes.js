const GET_NOTES_NOTEBOOKS = 'noteboookNotes/GET_NOTES_NOTEBOOKS';

const getNotebookNotes = (notes) =>({
    TYPE: GET_NOTES_NOTEBOOKS,
    notes
})


export const getNotesFromNotebook = (notebookId) => async dispatch => {
    const res = await fetch(`/api/notes/${notebookId}`)

    if (res.ok) {
        const notes = await res.json()
        dispatch(getNotebookNotes(notes))
    }
}