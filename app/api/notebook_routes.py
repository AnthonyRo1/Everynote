from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Notebook, db
from app.forms.notebook_form import NotebookForm
from datetime import datetime


notebook_routes = Blueprint('notebooks', __name__)

@notebook_routes.route('')
def get_notebooks():
    notebooks = Notebook.query.all()
    return {'notebooks': [notebook.to_dict() for notebook in notebooks if notebook.user_id == current_user.id]}



@notebook_routes.route('', methods=['POST'])
@login_required
def create_notebook():
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        notebook = Notebook(
            title=form.data['title'],
            user_id=current_user.id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()
    else:
        return {'errors': form.errors}



@notebook_routes.route('/<int:id>')
@login_required
def get_notebook(id):
    notebook = Notebook.query.get(id)
    return notebook.to_dict()



@notebook_routes.route('/<int:id>', methods=['PUT'])
@login_required 
def update_notebook(id):
    notebook = Notebook.query.get(id)
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and notebook:
        notebook.title = form.data['title']
        notebook.updated_at = datetime.now()
        db.session.commit()
        return notebook.to_dict()


@notebook_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_notebook(id):
    notebook = Notebook.query.get(id)
    if notebook.user_id == current_user.id:
        db.session.delete(notebook)
        db.session.commit()
        return notebook.to_dict()
    else:
        return 'no such notebook exists.'

