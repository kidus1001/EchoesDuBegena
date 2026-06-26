const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Serve the uploads folder as static so audio files are accessible
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (fs.existsSync(uploadsDir)) {
  app.use('/uploads', express.static(uploadsDir));
}

// Helper: read directory recursively for artists and songs
app.get('/api/artists', async (req, res) => {
  try {
    const audioRoot = path.join(__dirname, '..', 'uploads', 'audio');
    if (!fs.existsSync(audioRoot)) {
      return res.json([]);
    }

    const artistDirs = await fs.promises.readdir(audioRoot, { withFileTypes: true });

    const artists = await Promise.all(
      artistDirs
        .filter((d) => d.isDirectory())
        .map(async (dir) => {
          const artistName = dir.name;
          const artistPath = path.join(audioRoot, dir.name);
          const files = await fs.promises.readdir(artistPath, { withFileTypes: true });

          // Build songs from audio files (simple mapping)
          const songs = files
            .filter((f) => f.isFile())
            .filter((f) => /\.(mp3|wav|ogg|m4a)$/i.test(f.name))
            .map((f, idx) => {
              return {
                id: `${dir.name}-${idx}`,
                title: toTitle(f.name.replace(/\.[^.]+$/, '')),
                duration: '--:--',
                audioUrl: `/uploads/audio/${encodeURIComponent(dir.name)}/${encodeURIComponent(f.name)}`,
              };
            });

          return {
            id: dir.name,
            name: formatArtistName(artistName),
            role: undefined,
            recordings: songs.length,
            songs,
          };
        })
    );

    res.json(artists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read uploads' });
  }
});

function toTitle(str) {
  // Replace dashes/underscores with spaces and capitalize words
  return str.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatArtistName(dirName) {
  // Try to make a nicer display name
  return dirName.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
