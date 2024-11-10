
function getRecommendedProducts(parsedData) {

  fetch(`https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(parsedData.productTitle)}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'RAPID_API_KEY', // Add your actual RapidAPI key here
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
    }
  })
    .then(response => response.json())
    .then(data => {
      // console.log("API response:", data['data']);

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

// aysnc function fetch_emission(parsedData) {
//   const request_body={
//     name:parsedData.productTitle,
//     desc:parsedData.aboutThisItem,
//     info:parsedData.additionalInformation,
//   }

  
//   const data=await fetch('http://127.0.0.1:3000/analyze', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(request_body) // Use parsedData here instead of productData
//   })
//   .then(response => response.json()) // Parse the JSON response
//   .then(data => {
//     console.log("Emission data:", data);
//     // You can handle the response data here
//     return data; // This will return the data, but not directly usable since fetch is async
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//     return null; // Return null or handle the error appropriately
//   });
// }
async function fetch_emission(parsedData) {
  const request_body = {
    name: parsedData.productTitle,
    desc: parsedData.aboutThisItem,
    info: parsedData.additionalInformation,
  };

  try {
    // Await the fetch request and parse the response as JSON
    const response = await fetch('http://127.0.0.1:3000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request_body), // Send the request body
    });

    console.log("before response json")
    const data = await response.json(); 
    console.log("after")// Parse the response as JSON
    console.log("Emission data:", data);
    return data; // Return the data directly after the request completes

  } catch (error) {
    console.error('Error:', error);
    return null; // Return null or handle the error appropriately
  }
}



async function updateProductInfo(parsedData) {
  console.log(parsedData)
  
  const productTitleElement = document.getElementById('productTitle');
  const lcaListElement = document.getElementById('lcaList');
  const progressValueElement = document.getElementById('progress-value');
  
  productTitleElement.innerHTML = parsedData.productTitle || "No Product Name";
  // Get references to HTML elements
  const data=await fetch_emission(parsedData)

  // console.log(data)
  estimated_CO2=data['data'].CO2EmissionEstimate.estimatedCO2Emission
  aspect_considered=data['data'].aspectsConsidered
  
  aspect_considered.forEach((aspect) => {
    // Extract the key (everything before the colon)
    const key = aspect.split(':')[0].trim();
    // Create a list item with the key and append it to the list
    const listItem = document.createElement('li');
    listItem.textContent = key;
    lcaListElement.appendChild(listItem);
  });

  progressValueElement.innerHTML = `${estimated_CO2 || '0 kg'}`;

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
            console.log(parsedData)
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