const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { Worker } = require('worker_threads');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Раздача статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Обработка корневого маршрута
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Храним соответствие ключевых слов и URL
const keywordMap = {
  "news": [
      "https://www.hq.nasa.gov/alsj/a17/A17_FlightPlan.pdf"          
  ],
  "sports": [
      "https://upload.wikimedia.org/wikipedia/commons/4/42/Football_in_Bloomington%2C_Indiana%2C_1995.jpg", 
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/Olympics_2012_Mixed_Doubles_Final.jpg"    
  ],
  "music": [
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  ],
};

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('getUrls', (keyword, callback) => {
    const urls = keywordMap[keyword];
    if (!urls) {
      callback({ error: 'No URLs found for the given keyword' });
      return;
    }
    callback({ urls });
  });

  socket.on('downloadContent', (url) => {
    const filename = `downloads/${path.basename(url)}`;
    const worker = new Worker('./worker.js', { workerData: { url, filename, speedLimit: 100000 } });
    worker.on('message', (msg) => {
      socket.emit('downloadProgress', msg);
    });
    worker.on('error', (err) => {
      socket.emit('error', err.message);
    });
    worker.on('exit', (code) => {
      if (code !== 0) {
        socket.emit('error', `Worker stopped with exit code ${code}`);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Запускаем сервер (только один раз!)
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
