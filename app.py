from flask import Flask, render_template
from routes.main import main  # Import the blueprint from routes/main.py
import os
from dotenv import load_dotenv

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
# Register the blueprint
app.register_blueprint(main)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact_form')
def contact_form():
    return render_template('contact_form.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 10000)))