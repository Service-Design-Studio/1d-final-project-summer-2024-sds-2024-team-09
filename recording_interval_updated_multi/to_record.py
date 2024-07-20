import subprocess
from threading import Thread
# active listneer

from flask import Flask, render_template, request, redirect, url_for, jsonify
from google.auth.transport import requests
from werkzeug.utils import secure_filename
import os
from datetime import datetime

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100 MB limit

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/')
def index():
    videos = os.listdir(app.config['UPLOAD_FOLDER'])
    return render_template('index.html', videos=videos)

@app.route('/start_recording', methods=['POST'])
def start_recording():
    # Logic to start recording
    return jsonify({'status': 'recording started'})

@app.route('/stop_recording', methods=['POST'])
def stop_recording():
    # Logic to stop recording
    return jsonify({'status': 'recording stopped'})

def convert_to_mp4(webm_path, mp4_path):
    command = [
        'ffmpeg',
        '-i', webm_path,
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-strict', 'experimental',
        mp4_path
    ]
    subprocess.run(command, check=True)

@app.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video part'}), 400

    file = request.files['video']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        webm_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(webm_path)

        mp4_path = webm_path.replace('.webm', '.mp4')
        convert_to_mp4(webm_path, mp4_path)
        os.remove(webm_path)  # Remove the original WebM file

        return jsonify({'message': 'File uploaded and converted successfully', 'path': mp4_path}), 200


# def run():
  # app.run(host='0.0.0.0',port=8080)

if __name__ == '__main__':
    # t = Thread(target=run)
    # t.start()
    app.run(debug=True)
