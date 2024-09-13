const express = require('express');
const ytdl = require('ytdl-core');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Download route
app.get('/download', async (req, res) => {
    const { url, quality, type } = req.query;

    if (!url || !quality || !type) {
        return res.status(400).send("Missing required parameters.");
    }

    try {
        const video = ytdl(url, {
            filter: type === 'audio' ? 'audioonly' : 'videoandaudio',
            quality: quality
        });

        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        video.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to download the video.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

