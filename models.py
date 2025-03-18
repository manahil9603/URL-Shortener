from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ShortURL(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    original_url = db.Column(db.String(500), nullable=False)
    short_code = db.Column(db.String(10), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    access_count = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f"ShortURL('{self.original_url}', '{self.short_code}')"