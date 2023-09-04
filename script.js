let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}
/*
// Get the products section to animate as user scroll down the scetion
window.addEventListener('scroll', reveal);

function reveal() {

  var reveals = document.querySelectorAll('.reveal');

  for(var i = 0; i < reveals.length; i++){

    var windowheight = window.innerHeight;
    var realtop = reveals(i).getBoundingclientRect().top;
    var revealpoint = 150;

    if(realtop < windowheight - revealpoint){
      reveals(i).classList.add('active');

    }
    else{
      reveals(i).classList.remove('active');
    }
  }
}
*/
// Define your product data (name, price, image)
const products = [
  {
      name: "Epos H3 Gaming Headset",
      price: $129,
      image: "images/Products/Epos H3 Gaming Headset - Snow($129).jpg"
  },

    {
    name: "Apple AirPods Pro (2nd Generation)",
    price: $40,
    image: "images/E-products/Apple AirPods Pro (2nd Generation) ($40).jpg"
    },

    {
      name: "Digital Watch",
      price: $57,
      image: "images/E-products/Digital Watch ($57).JPG"
      },
      
      {
        name: "Beats Wireless AirPod",
        price: $42,
        image: "images/E-products/IMG_2139.JPG"
        },
      



  
  // Add more products here
];

// Array to store cart items
const cartItems = [];

// Total cost of items in the cart
let cartTotal = 0;

// Function to update the displayed cart total
function updateCartTotal() {
  const cartTotalElement = document.getElementById("cart-total");
  cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
}

// Function to add a product to the cart
function addToCart(product) {
  // Check if the product is already in the cart
  const existingCartItem = cartItems.find(item => item.product.name === product.name);

  if (existingCartItem) {
      // If the product is already in the cart, update its quantity and subtotal
      existingCartItem.quantity++;
      existingCartItem.subtotal = existingCartItem.quantity * existingCartItem.product.price;
  } else {
      // If the product is not in the cart, create a new cart item
      const newCartItem = {
          product: product,
          quantity: 1,
          subtotal: product.price
      };
      cartItems.push(newCartItem);
  }

  // Update the total cost
  cartTotal += product.price;

  // Update the cart items displayed in the table
  const cartItemsBody = document.getElementById("cart-items-body");
  cartItemsBody.innerHTML = ""; // Clear previous cart items

  cartItems.forEach(cartItem => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td><img src="${cartItem.product.image}" alt="Product Image"></td>
          <td>${cartItem.product.name}</td>
          <td>$${cartItem.product.price.toFixed(2)}</td>
          <td>${cartItem.quantity}</td>
          <td>$${cartItem.subtotal.toFixed(2)}</td>
          <td><button class="remove-item" data-product="${cartItem.product.name}">Remove</button></td>
      `;
      cartItemsBody.appendChild(row);
  });

  // Update the cart total display
  updateCartTotal();
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
      button.addEventListener("click", () => {
          // Get the product name associated with the clicked button
          const productName = button.closest(".product").dataset.productName;
          
          // Find the selected product based on its name
          const selectedProduct = products.find(product => product.name === productName);
          
          // If the product is found, add it to the cart
          if (selectedProduct) {
              addToCart(selectedProduct);
          }
      });
  });

// Add event listener to the cart items table
const cartItemsTable = document.getElementById("cart-items");
cartItemsTable.addEventListener("click", event => {
    // Check if the clicked element is a "Remove" button
    if (event.target.classList.contains("remove-item")) {
        // Get the product name associated with the clicked button
        const productName = event.target.getAttribute("data-product");
        
        // Find the cart item associated with the product name
        const cartItem = cartItems.find(item => item.product.name === productName);
        
        // If the cart item is found, remove it from the cart
        if (cartItem) {
            cartItems.splice(cartItems.indexOf(cartItem), 1);
            cartTotal -= cartItem.subtotal;
            updateCartTotal();
            // Re-add the product to the cart to re-render the table
            addToCart(cartItem.product);
        }
    }
});
});