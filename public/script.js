document.getElementById('downloadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const quality = document.getElementById('quality').value;
    const type = document.getElementById('type').value;
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = "Processing your request...";

    try {
        const response = await fetch(`/download?url=${encodeURIComponent(url)}&quality=${quality}&type=${type}`);
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'download.mp4';  // or 'download.mp3' if audio
        a.click();
        resultDiv.innerHTML = "Download started!";
    } catch (error) {
        resultDiv.innerHTML = "Failed to download the video.";
    }
});

