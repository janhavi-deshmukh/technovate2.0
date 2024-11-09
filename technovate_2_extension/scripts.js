// Handles your frontend UI logic.
// async function fetchData() {
//     const res=await fetch ("url");
//     const data=await res.json();
//     console.log(data);
//     document.getElementById("product_detail").innerHTML = data.product_details;
//     document.getElementById("other_products").innerHTML=data.other_details;

// }


// fetchData();

chrome.storage.local.get(['co2Emission'], (result) => {
    const emissionDiv = document.getElementById('co2-emission');
    if (result.co2Emission) {
      emissionDiv.innerText = window.location.href;
    } else {
      emissionDiv.innerText = 'No data available. Please try again.';
    }
  });
  