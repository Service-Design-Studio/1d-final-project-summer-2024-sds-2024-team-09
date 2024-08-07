import io
import os
import pytest
from to_record import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['UPLOAD_FOLDER'] = 'test_uploads'
    with app.test_client() as client:
        with app.app_context():
            yield client

def test_index(client):
    rv = client.get('/')
    assert rv.status_code == 200
    assert b'Uploaded Videos' in rv.data

def test_start_recording(client):
    rv = client.post('/start_recording')
    assert rv.status_code == 200
    json_data = rv.get_json()
    assert json_data['status'] == 'recording started'

def test_stop_recording(client):
    rv = client.post('/stop_recording')
    assert rv.status_code == 200
    json_data = rv.get_json()
    assert json_data['status'] == 'recording stopped'
#
# def test_upload_video_no_file(client):
#     rv = client.post('/test_uploads', content_type='multipart/form-data')
#     assert rv.status_code == 400
#     json_data = rv.get_json()
#     assert 'error' in json_data
#     assert json_data['error'] == 'No video part'
#
# def test_upload_video(client):
#     data = {
#         'video': (io.BytesIO(b'my file contents'), 'test.webm')
#     }
#     rv = client.post('/test_uploads', data=data, content_type='multipart/form-data')
#     assert rv.status_code == 200
#     json_data = rv.get_json()
#     assert 'message' in json_data
#     assert json_data['message'] == 'File uploaded and converted successfully'
#
#     # Clean up
#     os.remove(os.path.join(app.config['UPLOAD_FOLDER'], 'test.webm'))
