var text = document.getElementById("tshirt-text");
var showText = document.getElementById("tshirt-preview");
var fontSelect = document.getElementById("tshirt-font");
var fontSizeInput = document.getElementById("tshirt-font-size");
var textColor = document.querySelectorAll(".tshirt-color");
var textError = document.getElementById("tshirt-text-help");
let addBtn = document.querySelector(".btn.btn-primary");
let removeBtn = document.querySelector("#btn-remove");
let cartMsg = document.querySelector("#cart-message");
let cartSubtotal = document.querySelector("#subtotal")
let cartTax = document.querySelector("#tax")
let cartTotal = document.querySelector("#total")
let quantity = 0;

// Update the text content of the "tshirt-preview" element when the input changes
// Trigger the checkLength function to handle text length validation
text.oninput = function(e) {
  showText.innerText = e.target.value;
  checkLength();
}

addBtn.addEventListener("click", function(e) {
  e.preventDefault();
  isTextEmpty();
  updateCart();
});

/**
 * Checks if the text input is empty.
 * If empty, sets text color to red and adds "is-invalid" class.
 * If not empty, sets text color to black, removes "is-invalid" class, and adds "validated" class.
 */
function isTextEmpty() {
  if(showText.innerText.length < 1) {
    textError.style.color = "red";
    text.classList.add("is-invalid");
  } else {
    textError.style.color = "black";
    text.classList.remove("is-invalid");
    text.classList.add("validated")
  }
}
/**
 * Updates the cart based on the user input, maintaining quantity, subtotal, tax, and total cost.
 * If the text input is valid, it increments the quantity and updates the cart details.
 * If the text input is empty, it resets the cart to zero.
 */
function updateCart() {
  if(text.classList.contains("validated")) {
    quantity++

    cartMsg.textContent = "Custom Shirt" + ` x${quantity}`
    const shirtCost = 20.00 * quantity;
    const taxRate = 0.095;
    const calcTax = shirtCost * taxRate;
    const totalCost = shirtCost + calcTax;

    cartSubtotal.textContent = `$${shirtCost.toFixed(2)}`;
    cartTax.textContent = `$${calcTax.toFixed(2)}`;
    cartTotal.textContent = `$${totalCost.toFixed(2)}`;

  } else {
    text.classList.remove("validated");
    cartMsg.textContent = "Cart is empty";
    cartSubtotal.textContent = "$0.00";
    cartTax.textContent = "$0.00";
    cartTotal.textContent = "$0.00";
    quantity = 0;
  }
}


removeBtn.addEventListener("click", removeCart);
/**
 * Function to remove items from the cart.
 * Resets the text input and preview, updates cart display to show empty cart, and resets quantity to zero.
 */
function removeCart() {
  text.classList.remove("validated");
  cartMsg.textContent = "Cart is empty";
  text.value = "";
  showText.textContent = "";
  cartSubtotal.textContent = "$0.00";
  cartTax.textContent = "$0.00";
  cartTotal.textContent = "$0.00";
  quantity = 0;
}


// Check the length of the text content in the "tshirt-preview" element
// If the length is greater than 20, set text color to red and add "is-invalid" class
// Otherwise, set text color to black and remove "is-invalid" class
function checkLength() {
  if(showText.innerText.length > 20) {
    textError.style.color = "red";
    text.classList.add("is-invalid");
  } else {
    textError.style.color = "black";
    text.classList.remove("is-invalid");
  }
}

// Update the font of the showText element based on the selected option in the fontSelect dropdown
var changeFont = function() {
  var selectedFont = fontSelect.value
  showText.style.fontFamily = selectedFont;
}

fontSelect.addEventListener("change", changeFont);


// Update the font size of the showText element dynamically as the user interacts with the fontSizeInput slider
var changeFontSize = function() {
  var selectedFontSize = fontSizeInput.value + "px"
  showText.style.fontSize = selectedFontSize;
}

fontSizeInput.addEventListener("input", changeFontSize);


// Iterate over each color input in the textColor NodeList
// Add a click event listener to change the font color based on the selected color
textColor.forEach(function(colorInput) {
  colorInput.addEventListener("click", function() {
    var selectedColor = colorInput.getAttribute('data-color');

    showText.style.color = selectedColor;
  });
});

