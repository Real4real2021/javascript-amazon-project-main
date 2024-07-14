//named exports
import { cart, deleteFromCart, upadateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOption } from "../../data/deliveryOptons.js";
// ESM external library does not require loading via script tags in HTML file
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //default export || check utils/money.js

export function renderOrderSummary() {

    let cartSummaryHTML = "";
    
    cart.forEach((cartItem) => {
      const productId = cartItem.id; //iterate cart and get cartItem Id
      
      const matchingProduct = getProduct(productId);
         
    
      const deliveryOptionId = cartItem.deliveryOptionId; //get the 'deliveryOptionId' out of the cart
    
      let deliveryOptions; 
    
      deliveryOption.forEach((option) => {
        //forEach through the deliveryOption. See if the option.id
        //is the same as (===) the deiveryOptionId from the cart. If it is, save it to the deliveryOption array.
        if (option.id === deliveryOptionId) {
          deliveryOptions = option;
        }
      });
    
      const today = dayjs();
      let deliveryDate = today.add(deliveryOptions.deliverDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
    
      cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
    
          Delivery date: ${dateString}
        </div>
    
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">
    
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary">Save</span>
              </span>
              <span class="del;ete-quantity-link js-delete-link link-primary" data-product-id="${
                matchingProduct.id
              }">
                Delete
              </span>
            </div>
          </div>
    
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
             ${deliveryOptionsHTML(matchingProduct, cartItem)} 
            </div>    
          </div>
        </div>
      </div>
      `;
    });
    
    function deliveryOptionsHTML(matchingProduct, cartItem) {
      //pass matchingProduct if it isnt declared globaly where ever deliveryOptionsHTML is called
      let html = "";
    
      deliveryOption.forEach((option) => {
        const today = dayjs();
        let deliveryDate = today.add(option.deliverDays, "days");
        const dateString = deliveryDate.format("dddd, MMMM D");
    
        const priceString =
          option.priceCents === 0
            ? `FREE`
            : `${formatCurrency(Number(option.priceCents))}`;
    
        const isChecked = option.id === cartItem.deliveryOptionId;
    
        html += `
          <div class="delivery-option js-delivery-option">
            <input type="radio"
              ${isChecked ? "checked" : ""}
                class="delivery-option-input"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  $${priceString} - Shipping
                </div>
              </div>
          </div>
        `;
      });
      return html;
    }
    
    
    
    let orderSummaryElement = document.querySelector('.order-summary');
    orderSummaryElement.innerHTML = cartSummaryHTML;
    
    const deleteLink = document.querySelectorAll('.js-delete-link');
    deleteLink.forEach((link) => {
      link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        deleteFromCart(productId);
    
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        ); //use the DOM to get the element using the class we created, substitute product ID
    
        container.remove(); //remove that item from the container element
      });
    });
    
    const deliveryOptionElement = document.querySelectorAll('.js-delivery-option');
    
    deliveryOptionElement.forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        upadateDeliveryOption(productId, deliveryOptionId);
        });
    });
}