const socket = io();

socket.on('connect', () => {
    console.log('WebSocket connected');
});

socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
});

socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error);
});

function getUrls() {
    const keyword = document.getElementById('keyword').value;
    if (!keyword) {
        displayStatus('Please enter a keyword', 'error');
        return;
    }
    socket.emit('getUrls', keyword, (response) => {
        if (response.error) {
            displayStatus(response.error, 'error');
        } else {
            const urls = response.urls;
            const urlList = document.getElementById('urlList');
            urlList.innerHTML = '';
            urls.forEach(url => {
                const li = document.createElement('li');
                const button = document.createElement('button');
                button.innerText = 'Download';
                button.onclick = () => downloadContent(url);
                li.innerText = url;
                li.appendChild(button);
                urlList.appendChild(li);
            });
            displayStatus('URLs loaded successfully', 'success');
        }
    });
}

function downloadContent(url) {
    socket.emit('downloadContent', url);
    displayStatus(`Downloading content from ${url}`, 'info');
}

socket.on('downloadProgress', (data) => {
    document.getElementById('status').innerText = `Progress: ${data.progress.toFixed(2)}% - Threads: ${data.threads} - Size: ${data.size}`;
});

socket.on('content', (content) => {
    const downloadedContentList = document.getElementById('downloadedContentList');
    const li = document.createElement('li');
    li.innerText = 'Downloaded content';
    const button = document.createElement('button');
    button.innerText = 'View';
    button.onclick = () => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded_content.txt';
        a.click();
    };
    li.appendChild(button);
    downloadedContentList.appendChild(li);
    displayStatus('Content downloaded successfully', 'success');
});

socket.on('error', (error) => {
    displayStatus(`Error: ${error}`, 'error');
});

function displayStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.innerText = message;
    statusDiv.className = type;
}
