from .db import db 

class Notebook(db.Model):
    __tablename__ = 'notebooks'

    #COLUMNS
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(50))

    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)

    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)
    #COLUMNS

    #RELATIONSHIPS
    users = db.relationship('User', back_populates='notebooks', foreign_keys='Notebook.user_id')

    notes = db.relationship('Note', back_populates='notebooks', foreign_keys='Note.notebook_id', cascade='all, delete')
    #RELATIONSHIPS 

    #TO_DICT
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }


    