const { parentPort, workerData } = require('worker_threads');
const axios = require('axios');
const fs = require('fs');

const { url, filename, speedLimit } = workerData;

async function downloadFile() {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    const totalLength = response.headers['content-length'];
    let downloadedLength = 0;
    let lastTime = Date.now();

    const writer = fs.createWriteStream(filename);

    response.data.on('data', (chunk) => {
        downloadedLength += chunk.length;
        writer.write(chunk);

        const currentTime = Date.now();
        const elapsedTime = (currentTime - lastTime) / 1000; // seconds
        const downloadSpeed = chunk.length / elapsedTime; // bytes per second

        if (downloadSpeed > speedLimit) {
            const delay = (chunk.length / speedLimit) * 1000; // milliseconds
            setTimeout(() => {
                parentPort.postMessage({ progress: (downloadedLength / totalLength) * 100, threads: 1, size: formatBytes(totalLength) });
            }, delay);
        } else {
            parentPort.postMessage({ progress: (downloadedLength / totalLength) * 100, threads: 1, size: formatBytes(totalLength) });
        }

        lastTime = currentTime;
    });

    response.data.on('end', () => {
        writer.end();
        parentPort.postMessage({ status: 'completed' });
    });

    response.data.on('error', (err) => {
        parentPort.postMessage({ error: err.message });
    });
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

downloadFile();
