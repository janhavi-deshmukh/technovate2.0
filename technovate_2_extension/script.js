
function getRecommendedProducts(parsedData){
  
    fetch(`https://real-time-amazon-data.p.rapidapi.com/search?query=${parsedData.productTitle}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '62dddc529amsha15a775e60e2121p130226jsn1b950b185372',
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("API response:", data);
      
      const pageData = {
        // url: url,
        // domTree: domTreeJSON,
        apiData: data // Store the API response here
      };
  
      // Save data to Chrome storage
      chrome.storage.local.set({ "pageData": pageData }, () => {
        console.log("Data saved to storage");
      });
    })
    .catch(error => {
      console.error("Error fetching API data:", error);
    }); 
} 

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
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
            const { url, co2Emission } = result.co2Emission;
            const parsedData = JSON.parse(co2Emission);
            
            emissionDiv.innerHTML = `
              URL: ${url}<br>
              Product Title: ${parsedData.productTitle}<br>
              Additional Information: ${parsedData.additionalInformation}<br>
              About this item: ${parsedData.aboutThisItem}
            `;
            
             getRecommendedProducts(parsedData)

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

