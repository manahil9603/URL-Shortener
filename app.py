from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS  # Import CORS
from models import db
from resources import ShortenURL, RetrieveURL, UpdateURL, DeleteURL, URLStats

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///urls.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
api = Api(app)

# Serve the frontend
@app.route('/')
def serve_frontend():
    return send_from_directory('../frontend', 'index.html')

# Serve static files (CSS, JS)
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('../frontend', filename)

# Create the database tables
with app.app_context():
    db.create_all()

# Add API endpoints
api.add_resource(ShortenURL, '/shorten')
api.add_resource(RetrieveURL, '/shorten/<string:short_code>')
api.add_resource(UpdateURL, '/shorten/<string:short_code>')
api.add_resource(DeleteURL, '/shorten/<string:short_code>')
api.add_resource(URLStats, '/shorten/<string:short_code>/stats')

if __name__ == '__main__':
    app.run(debug=True)