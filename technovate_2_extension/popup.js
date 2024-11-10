let favorites = [];

function toggleFavorites() {
  const dropdown = document.getElementById("favoritesDropdown");
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

function addToFavorites(productName) {
  if (!favorites.includes(productName)) {
    favorites.push(productName);
    updateFavoritesList();
  } else {
    alert(`${productName} is already in favorites.`);
  }
}

function updateFavoritesList() {
  const favoritesList = document.getElementById("favoritesList");
  favoritesList.innerHTML = "";
  
  if (favorites.length === 0) {
    favoritesList.innerHTML = "<li>No favorites yet</li>";
  } else {
    favorites.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = product;
      favoritesList.appendChild(li);
    });
  }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  const dropdown = document.getElementById("favoritesDropdown");
  if (!event.target.matches(".favorite-icon")) {
    dropdown.style.display = "none";
  }
};

// JavaScript to handle carousel scrolling
// JavaScript to handle carousel scrolling
function scrollCarousel(direction) {
    const carousel = document.getElementById("carousel");
    const productWidth = document.querySelector(".recommended-product").offsetWidth;
    const scrollAmount = productWidth + 15; // Add gap if needed
  
    // Scroll the carousel by one product width at a time
    carousel.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }
  
  