chrome.storage.sync.get('topic', (data) => {
  if (data.topic) {
    const topic = data.topic.toLowerCase();
    console.log('Topic retrieved from storage:', topic);

    // Function to filter videos
    const filterVideos = () => {
      try {
        const videoTitles = document.querySelectorAll('#video-title');
        console.log('Found video titles:', videoTitles.length);
        videoTitles.forEach(title => {
          const video = title.closest('ytd-video-renderer') || title.closest('ytd-grid-video-renderer');
          if (video) {
            const titleText = title.innerText.toLowerCase();
            console.log('Video title:', titleText);
            const descriptionElement = video.querySelector('#description');
            const description = descriptionElement ? descriptionElement.innerText.toLowerCase() : '';
            console.log('Video description:', description);
            let tags = [];
            const metaTags = document.querySelectorAll('meta[name="keywords"]');
            metaTags.forEach(meta => {
              tags = tags.concat(meta.getAttribute('content').split(', '));
            });
            console.log('Video tags:', tags);

            const tagMatch = tags.some(tag => tag.toLowerCase().includes(topic));
            const descriptionMatch = description.includes(topic);

            if (!titleText.includes(topic) && !descriptionMatch && !tagMatch) {
              console.log('Hiding video:', titleText);
              video.style.display = 'none';
            }
          }
        });
      } catch (error) {
        console.error('Error filtering videos:', error);
      }
    };

    // Initial filtering
    filterVideos();

    // Observer to monitor changes in the DOM
    const observer = new MutationObserver(() => {
      filterVideos();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    console.log('No topic found in storage');
  }
});
