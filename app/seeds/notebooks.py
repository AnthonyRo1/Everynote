from app.models import db, Notebook
from datetime import datetime

def seed_notebooks():
    notebook1 = Notebook(
        title='School',
        user_id=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    notebook2 = Notebook(
        title='Work',
        user_id=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    notebook3 = Notebook(
    title='Personal',
    user_id=1,
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )


    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)
    db.session.commit()


def undo_notebooks():
    db.session.execute('TRUNCATE notebooks RESTART IDENTITY CASCADE;')
    db.session.commit()

