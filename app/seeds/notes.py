from app.models import db, Note
from datetime import datetime

def seed_notes():
    note1 = Note(
        title='Demo note',
        description='example note for testing',
        content='I need to create seeder data in order to test my backend routes and state',
        user_id=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note2 = Note(
    title='Demo note 2 (INSIDE NOTEBOOK 1)',
    description='example note for testing 2',
    content='I need to create seeder data in order to test my backend routes and state 2',
    notebook_id=1,
    user_id=1,
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note3 = Note(
    title='Demo note 3 (INSIDE NOTEBOOK 2)',
    description='example note for testing',
    content='I need to create seeder data in order to test my backend routes and state 3',
    notebook_id=1,
    user_id=1,
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note4 = Note(
    title='Demo note 4',
    description='example note for testing 4',
    content='I need to create seeder data in order to test my backend routes and state 4',
    user_id=2,
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.commit()



def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE')
    db.session.commit()