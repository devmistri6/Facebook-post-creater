import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Facebook Configuration
    FB_PAGE_ID = os.getenv('FB_PAGE_ID', 'YOUR_PAGE_ID_HERE')
    FB_PAGE_ACCESS_TOKEN = os.getenv('FB_PAGE_ACCESS_TOKEN', 'YOUR_PAGE_ACCESS_TOKEN_HERE')
    
    # Upload Configuration
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    
    # Flask Configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-change-this-in-production')
    DEBUG = os.getenv('FLASK_ENV') != 'production'

# import os

# class Config:
#     FB_PAGE_ID = '888434154355027'
#     FB_PAGE_ACCESS_TOKEN = 'EAA1MDxDpXvkBQCIVSWgziTmarFqF3CKWNmTJdl9z1TgknIAqyquBZB5pZBQcJEMBifdeS6wkbL5hrUYahlWs072COlZCmvUkO5zvvTPYIvyRUjZAFp6hdFRbDMXnGnw8mah3SZBtEVi96y4x8qjmWbr9v6CbfPNk1ZCMM6IyzDzZAv5lBeVzUct1vYONYqrCpLKnkrQ'
    
#     UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'uploads')
#     MAX_CONTENT_LENGTH = 16 * 1024 * 1024 
#     ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    
#     SECRET_KEY = 'your-secret-key-change-this-in-production'