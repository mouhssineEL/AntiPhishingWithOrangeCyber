// background.js

// Function to check if an email or link is phishing using the external website
async function checkPhishing(data) {
    const formData = new FormData();
    formData.append('email', data);
  
    const response = await fetch('https://cybersecurite.orange.fr/', {
      method: 'POST',
      body: formData
    });
  
    const text = await response.text();
    // You will need to parse the HTML response to extract the phishing verdict
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const verdictElement = doc.querySelector('#cs-verdict-result'); // Adjust selector as needed
    return verdictElement ? verdictElement.textContent.includes('phishing') : false;
  }
  
  // Listen for messages from the content script
  chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === 'checkPhishing') {
      const { emailBody, links } = message.data;
      let results = [];
      for (let link of links) {
        let isPhishing = await checkPhishing(link);
        results.push({ link, isPhishing });
      }
      // Also check the email body itself if needed
      let isEmailPhishing = await checkPhishing(emailBody);
      results.push({ emailBody, isEmailPhishing });
  
      // Send the results back to the content script or popup
      chrome.runtime.sendMessage({ action: 'phishingResults', results });
    }
  });
  