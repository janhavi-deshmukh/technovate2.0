
function getRecommendedProducts(parsedData) {
  fetch(`https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(parsedData.product_title)}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '62dddc529amsha15a775e60e2121p130226jsn1b950b185372', // Add your actual RapidAPI key here
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log("API response:", data['data']);

      const products = data['data'].products; // Ensure we're accessing the products array directly
      const carousel = document.getElementById('carousel');
      carousel.innerHTML = ''; // Clear existing products

      // Check if the response has products
      if (products && products.length > 0) {
        products.forEach(product => {
          // Create product HTML dynamically
          const productDiv = document.createElement('div');
          productDiv.className = 'recommended-product';

          // Use optional chaining to safely access product properties
          productDiv.innerHTML = `
            <img src="${product.product_photo || 'default.jpg'}" alt="${product.product_title || 'Product'}" />
            <p>${product.product_title || 'Unnamed Product'}</p>
            <p>Price: ${product.product_price || 'N/A'}</p>
            <p>Rating: ${product.product_star_rating || 'N/A'} ⭐ (${product.product_num_ratings || 0} reviews)</p>
            <button onclick="addToFavorites('${product.product_title || 'Product'}')">Add to Favorites</button>
            <a href="${product.product_url}" target="_blank" class="product-link">View on Amazon</a>
          `;
          carousel.appendChild(productDiv); // Add each product to the carousel
        });
      } else {
        carousel.innerHTML = '<p>No recommended products found.</p>';
      }

      // Save data to Chrome storage if needed
      const pageData = { apiData: data };
      chrome.storage.local.set({ "pageData": pageData }, () => {
        console.log("Data saved to storage");
      });
    })
    .catch(error => {
      console.error("Error fetching API data:", error);
      document.getElementById('carousel').innerHTML = '<p>Error fetching recommended products.</p>';
    });
}

function updateProductInfo(parsedData) {
  // Get references to HTML elements
  console.log(parsedData)
  const productTitleElement = document.getElementById('productTitle');
  const lcaListElement = document.getElementById('lcaList');
  const progressValueElement = document.getElementById('progress-value');

  // Update product title
  productTitleElement.innerHTML = parsedData.productTitle || "No Product Name";

  // Update the LCA list dynamically
  // lcaListElement.innerHTML = `
  //   <li>Material Extraction: ${parsedData.materialExtraction || '0'} kg CO₂</li>
  //   <li>Manufacturing: ${parsedData.manufacturing || '0'} kg CO₂</li>
  //   <li>Transportation: ${parsedData.transportation || '0'} kg CO₂</li>
  //   <li>Usage: ${parsedData.usage || '0'} kg CO₂</li>
  //   <li>Disposal: ${parsedData.disposal || '0'} kg CO₂</li>
  // `;

  // Update the progress value dynamically
  progressValueElement.innerHTML = `${parsedData.progressValue || '0'}%`;

  // Optionally, log the values for debugging
  console.log('Updated Product Info:', parsedData);
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
            
            // emissionDiv.innerHTML = `
            //   URL: ${url}<br>
            //   Product Title: ${parsedData.productTitle}<br>
            //   Additional Information: ${parsedData.additionalInformation}<br>
            //   About this item: ${parsedData.aboutThisItem}
            // `;
              updateProductInfo(parsedData)
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

