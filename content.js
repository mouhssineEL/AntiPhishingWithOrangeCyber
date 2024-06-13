// content.js

// Function to extract email content and links
function extractEmailContent() {
    let emailBody = document.querySelector('.a3s').innerText;
    let links = Array.from(document.querySelectorAll('.a3s a')).map(link => link.href);
    return { emailBody, links };
  }
  
  // Send the extracted content to the background script
  chrome.runtime.sendMessage({ action: 'checkPhishing', data: extractEmailContent() });
  