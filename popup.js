document.getElementById('save').addEventListener('click', () => {
    const topic = document.getElementById('topic').value;
    chrome.storage.sync.set({ topic: topic }, () => {
      console.log('Topic is set to ' + topic);
    });
  });
  