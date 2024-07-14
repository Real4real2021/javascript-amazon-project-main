import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

export let innerHTML = '';

products.forEach((product) => {
  innerHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart show-class-text">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});

const mainDivElement = document.querySelector('.products-grid');
mainDivElement.innerHTML = innerHTML;

const addToCartButton = document.querySelectorAll('.js-add-to-cart');
const addedTextElement = document.querySelector('.show-class-text');
let cartQuantityElement = document.querySelector('.cart-quantity');
export let cartQuantity = 0;

function updateCartQuantity(productId) {
  const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
  let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += Number(cartItem.quantity);
    });
    cartQuantityElement.innerHTML = cartQuantity
}

addToCartButton.forEach((button) => { //add the following functionality to each 'add to cart button'
  button.addEventListener('click', () => {
    const productId = button.dataset.productId; //retrive the productId using the dataset attribute 
    addToCart(productId); //pass it HERE as well
    updateCartQuantity(productId);
    });
});

/*Instead of increasing the cart quantity by 1, increase it by the number selected in the 
quantity selector element. get it into the javascript using document.querySelectorAll(`js-quantity-selector-${product.id}`)
for the math to work out, use Number() to convert the string into a number to update the cart quantity element in the HTML*/

/*Data attributes are ideal for storing custom data associated with an element that doesn't necessarily affect its presentation */

/*ids are used when targeting a specific element */