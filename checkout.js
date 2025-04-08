document.addEventListener("DOMContentLoaded", function () {
  // Fetch cart items from local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Get total price and item count elements
  let itemCount = document.getElementById("item-count");
  let totalCost = document.getElementById("total-cost");

  // Calculate total items and total price
  let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  let totalPrice = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
    0
  );

  // Prevent NaN values if localStorage is empty
  if (isNaN(totalPrice)) {
    totalPrice = 0;
  }

  // Update the UI
  if (itemCount) itemCount.textContent = totalItems;
  if (totalCost) totalCost.textContent = `₹${totalPrice.toFixed(2)}`;

  // Store the total price in localStorage for future reference
  localStorage.setItem("totalPrice", totalPrice.toFixed(2));

  // Checkout Form Submission
  document
    .querySelector(".checkout-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let phone = document.getElementById("phone").value.trim();
      let address = document.getElementById("address").value.trim();

      if (!name || !email || !phone || !address) {
        alert("Please fill in all fields.");
        return;
      }

      // Store order details in localStorage
      let orderDetails = {
        name,
        email,
        phone,
        address,
        totalItems,
        totalPrice
      };
      localStorage.setItem("order", JSON.stringify(orderDetails));

      // Redirect to confirmation page
      window.location.href = "order-confirmation.html";
    });
});
