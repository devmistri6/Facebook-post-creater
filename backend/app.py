from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
from werkzeug.utils import secure_filename
from config import Config

app = Flask(__name__, static_folder='../frontend')
CORS(app)
app.config.from_object(Config)

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


@app.route('/')
def index():
    return send_from_directory('../frontend', 'index.html')


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('../frontend', path)


@app.route('/api/post-to-facebook', methods=['POST'])
def post_to_facebook():
    try:
        # Validate fields
        if 'image' not in request.files:
            return jsonify({'success': False, 'error': 'No image provided'}), 400

        if 'title' not in request.form or 'description' not in request.form:
            return jsonify({'success': False, 'error': 'Title and description required'}), 400

        image = request.files['image']
        title = request.form['title']
        description = request.form['description']

        if image.filename == "":
            return jsonify({'success': False, 'error': 'No image selected'}), 400

        if not allowed_file(image.filename):
            return jsonify({
                'success': False,
                'error': 'Invalid file type. Allowed: JPG, JPEG, PNG, GIF'
            }), 400

        # Save temporarily
        filename = secure_filename(image.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(filepath)

        # Create message
        message = f"{title}\n\n{description}"

        # Prepare Facebook API request
        fb_url = f"https://graph.facebook.com/v18.0/{app.config['FB_PAGE_ID']}/photos"

        with open(filepath, 'rb') as img:
            files = {'source': img}
            data = {
                'message': message,
                'access_token': app.config['FB_PAGE_ACCESS_TOKEN']
            }

            fb_response = requests.post(fb_url, files=files, data=data)

        # Remove temp file
        os.remove(filepath)

        # Check Facebook response
        if fb_response.status_code == 200:
            fb_data = fb_response.json()
            print("✅ Successfully Posted to Facebook!")  # Visible in terminal

            return jsonify({
                "success": True,
                "message": "Posted successfully to Facebook!",
                "post_id": fb_data.get("post_id") or fb_data.get("id")
            }), 200

        else:
            fb_error = fb_response.json()
            return jsonify({
                "success": False,
                "error": fb_error.get('error', {}).get('message', 'Unknown Facebook API error')
            }), 400

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/test-connection', methods=['GET'])
def test_connection():
    try:
        test_url = f"https://graph.facebook.com/v18.0/{app.config['FB_PAGE_ID']}"
        params = {
            'fields': 'name,id',
            'access_token': app.config['FB_PAGE_ACCESS_TOKEN']
        }

        resp = requests.get(test_url, params=params)

        if resp.status_code == 200:
            data = resp.json()
            return jsonify({
                'success': True,
                'page_name': data.get('name'),
                'page_id': data.get('id')
            }), 200

        return jsonify({'success': False, 'error': 'Invalid Facebook credentials'}), 400

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=app.config['DEBUG'], host='0.0.0.0', port=port)
