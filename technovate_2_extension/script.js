
  

document.addEventListener('DOMContentLoaded', function() {
  // Get the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
      // Execute content script
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      }).then(() => {
        // After content script execution, get the stored data
        chrome.storage.local.get(['co2Emission'], (result) => {

          const emissionDiv = document.getElementById('co2-emission');
          console.log('Retrieved data:', result);
          
          if (result.co2Emission) {
            emissionDiv.innerHTML = `
              URL: ${result.co2Emission.url}<br>
              CO2 Emission: ${result.co2Emission.co2Emission}
            `;
          } else {
            emissionDiv.innerText = 'No data available. Please try again.';
          }
        });
      }).catch(err => {
        console.error('Failed to execute content script:', err);
        document.getElementById('co2-emission').innerText = 'Error: Could not access page data';
      });
    }
  });
});

