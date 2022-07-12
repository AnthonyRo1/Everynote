from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Note, Notebook, db
from app.forms.note_form import NoteForm
from datetime import datetime
note_routes = Blueprint('notes', __name__)


# GET ALL NOTES 
@note_routes.route('')
def get_notes():
    notes = Note.query.all()
    return {'notes': [note.to_dict() for note in notes]}


# GET ALL NOTES BELONGING TO A NOTEBOOK 
@note_routes.route('/<int:notebookId>')
@login_required
def get_notebook_notes(notebookId):
    notebook = Notebook.query.get(notebookId)
    all_notes = Note.query.all()
    notebook_notes = [note for note in all_notes if note.notebook_id == notebookId]
    return {'notes': [note.to_dict() for note in notebook_notes]}


# CREATE STANDALONE NOTE
@note_routes.route('', methods=['POST'])
@login_required
def create_note():
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit(): 
        note = Note(
            title=form.data['title'],
            description=form.data['description'],
            content=form.data['content'],
            user_id=current_user.id,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    else:
        return



# CREATE NOTE BELONGING TO NOTEBOOK
@note_routes.route('/<int:notebookId>', methods=['POST'])
def create_notebook_note(notebookId):
    notebook = Notebook.query.get(notebookId)
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note = Note(
            title=form.data['title'],
            description=form.data['description'],
            content=form.data['content'],
            notebook_id=notebookId,
            user_id=current_user.id,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    else:
        return {'errors': form.errors}

# UPDATE STANDALONE NOTE AND IT'S CONTENT
@note_routes.route('/<int:noteId>', methods=['PUT'])
@login_required
def update_note(noteId):
    note = Note.query.get(noteId)
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and note:
        note.title = form.data['title']
        note.description = form.data['description']
        note.content = form.data['content']
        note.updated_at = datetime.utcnow()
        db.session.commit()
        return note.to_dict()
    else:
        return {'errors': form.errors()}

# MOVE NOTE TO NOTEBOOK OR UPDATE THE NOTEBOOK THAT THE NOTE BELONGS TO
@note_routes.route('/<int:noteId>/<int:notebookId>', methods=['PUT'])
@login_required
def update_notebook_note(noteId, notebookId):
    note = Note.query.get(noteId)
    notebook = Notebook.query.get(notebookId)
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and note and notebook:
        note.notebook_id = notebookId
        note.updated_at = datetime.utcnow()
        db.session.commit()
        return note.to_dict()
    else:
        return {'errors': form.errors()}

@note_routes.route('/<int:noteId>', methods=['DELETE'])
@login_required
def delete_note(noteId):
    note = Note.query.get(noteId)
    if note.user_id == current_user.id:
        db.session.delete(note)
        db.session.commit()
        return note.to_dict()
    else:
        return 'No such note exists'



    