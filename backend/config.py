import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))

# Load environment variables
load_dotenv()

class Config(object):
    # General config
    FLASK_APP = os.getenv("FLASK_APP", "project.py")
    FLASK_ENV = os.getenv("FLASK_ENV", "development")
