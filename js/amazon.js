const products = [{
  productImage: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  productName: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  productRating: {
    stars: 4.5,
    count: 87
  },
  productPriceCents: 1090
}, {
  productImage: 'images/products/intermediate-composite-basketball.jpg',
  productName: 'Intermediate Size Basketball',
  productRating: {
    stars: 4.0,
    count: 127
  },
  productPriceCents: 2095
}, {
  productImage: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  productName: 'Adults Plain Cotton T-Shirt - 2 Pack',
  productRating: {
    stars: 4.5,
    count: 56
  },
  productPriceCents: 799
}];

let innerHTML = '';

products.forEach((product) => {
  innerHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.productImage}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.productName}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.productRating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.productRating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.productPriceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>`;
});

console.log(innerHTML);
const mainDivElement = document.querySelector('.products-grid');
mainDivElement.innerHTML = innerHTML;
