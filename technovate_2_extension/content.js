// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// License: MIT


// Serialize the DOM tree

let prevUrl=""

function getDOMTree(element) {

  
    return {
      tag: element.tagName,
      attributes: [...element.attributes].reduce((acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
      }, {}),
      children: [...element.children].map(getDOMTree),
      content: element.children.length === 0 ? element.textContent : undefined
    };
  }
  
//   if(prevUrl===window.location.href){
//       return
//   }
    prevUrl=window.location.href
  const domTree = getDOMTree(document.body);
  const domTreeJSON = JSON.stringify(domTree);
  
  chrome.storage.local.set({ co2Emission: "data" });
  
  // Send the DOM tree to the backend
//   fetch('https://your-backend-url.com/get_co2_emission', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: domTreeJSON
//   })
//   .then(response => response.json())
//   .then(data => {
//     // Store result in chrome.storage to access in index.html
//     chrome.storage.local.set({ co2Emission: data });
//   })
//   .catch(error => console.error('Error:', error));
  