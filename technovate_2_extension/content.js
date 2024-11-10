

// Serialize the DOM tree

let prevUrl=""

function getDOMTree(ele) {

  let productTitle = ele.querySelector('#productTitle');
let titleText = productTitle ? productTitle.innerText.trim() : "Title not found";

// Extract "Additional Information"
let additionalInfo = ele.querySelector('#productDetails_techSpec_section_1');
let additionalInfoText = additionalInfo ? additionalInfo.innerText.trim() : "Additional Information not found";

// Extract "About this item"
let aboutThisItem = ele.querySelector('#feature-bullets');
let aboutThisItemText = aboutThisItem ? aboutThisItem.innerText.trim() : "About this item not found";

// Display results in console
console.log("Product Title:", titleText);
console.log("Additional Information:", additionalInfoText);
console.log("About this item:", aboutThisItemText);

  return {
    productTitle: titleText,
    additionalInformation: additionalInfoText,
    aboutThisItem: aboutThisItemText
};

  }

  
  
  
// //   if(prevUrl===window.location.href){
// //       return
// //   }
//     prevUrl=window.location.href
  const domTree = getDOMTree(document);
  const domTreeJSON = JSON.stringify(domTree);

  // console.log("content.js called")

  
console.log("content script executed");

function getCurrentPageData() {
  console.log("content.js executing");
  const url = window.location.href;
  // Here you can add logic to extract CO2 emission data from the current page
  const dummyData = {
    url: url,
    co2Emission:domTreeJSON 
  };
  
  chrome.storage.local.set({ "co2Emission": dummyData }, () => {
    console.log("Data saved to storage");
  });
}

getCurrentPageData();
