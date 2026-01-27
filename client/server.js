import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const DIST = join(__dirname, 'dist');

app.use(express.static(DIST, { index: 'index.html', redirect: false }));

// Serve static prompt-queue pages (for Google OAuth verification)
app.get('/prompt-queue', (req, res) => {
  res.sendFile(join(DIST, 'prompt-queue', 'index.html'));
});
app.get('/prompt-queue/', (req, res) => {
  res.sendFile(join(DIST, 'prompt-queue', 'index.html'));
});
app.get('/prompt-queue/privacy', (req, res) => {
  res.sendFile(join(DIST, 'prompt-queue', 'privacy', 'index.html'));
});
app.get('/prompt-queue/privacy/', (req, res) => {
  res.sendFile(join(DIST, 'prompt-queue', 'privacy', 'index.html'));
});
app.get('/prompt-queue/terms', (req, res) => {
  res.sendFile(join(DIST, 'prompt-queue', 'terms', 'index.html'));
});
app.get('/prompt-queue/terms/', (req, res) => {
  res.sendFile(join(DIST, 'prompt-queue', 'terms', 'index.html'));
});

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(DIST, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
