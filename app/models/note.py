from .db import db 

class Note(db.Model):
    __tablename__ = 'notes'
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(50))

    description = db.Column(db.String(150))

    content = db.Column(db.Text)

    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'), nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    created_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)

    updated_at = db.Column(db.TIMESTAMP(timezone=False), nullable=False)


    #RELATIONSHIPS 
    users = db.relationship('User', back_populates='notes', foreign_keys='Note.user_id')

    notebooks = db.relationship('Notebook', back_populates='notes', foreign_keys='Note.notebook_id')

    #RELATIONSHIPS

    #TO_DICT
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'content': self.content,
            'notebook_id': self.notebook_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
