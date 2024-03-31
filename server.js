const express = require('express');
const detectPort = require('detect-port');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const PORT = 3000;

detectPort(PORT, (err, availablePort) => {
  if (err) {
    console.error('Error detecting port:', err);
    return;
  }

  if (PORT === availablePort) {
    console.log(`Port ${PORT} is available. Starting server on this port.`);
  } else {
    console.warn(`Port ${PORT} is in use. Server starting on alternative port ${availablePort}.`);
  }

  app.listen(availablePort, () => {
    console.log(`Server is running on port ${availablePort}`);
  });
});
