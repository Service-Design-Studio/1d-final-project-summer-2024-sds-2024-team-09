const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const recordingsDir = path.join(__dirname, 'public', 'recordings');
if (!fs.existsSync(recordingsDir)) {
    fs.mkdirSync(recordingsDir, { recursive: true });
}

app.post('/save-recording', (req, res) => {
    const { uid, channel } = req.body;

    // Simulate saving the recording
    const recordingPath = path.join(recordingsDir, `${channel}_${uid}.mp4`);

    // Here you would implement the actual recording saving logic
    // For this example, we'll just create an empty file to simulate
    fs.writeFile(recordingPath, '', (err) => {
        if (err) {
            console.error('Failed to save recording:', err);
            return res.status(500).send('Failed to save recording');
        }

        console.log('Recording saved successfully!');
        res.send('Recording saved successfully!');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
