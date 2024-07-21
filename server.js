const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, 'static')));

// Route for the playground page (if needed)
app.get('/playground', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/playground.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
