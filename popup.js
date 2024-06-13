// popup.js

// Function to update the popup with the results
function updatePopup(results) {
    let resultsList = document.getElementById('results');
    resultsList.innerHTML = '';
    results.forEach(result => {
      let li = document.createElement('li');
      li.textContent = result.link || 'Email Body';
      li.className = result.isPhishing ? 'phishing' : 'safe';
      resultsList.appendChild(li);
    });
  }
  
  // Listen for results from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'phishingResults') {
      updatePopup(message.results);
    }
  });
  