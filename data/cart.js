import {products} from './products.js';

export let cart = [{
  id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
},{
  id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

let selectorQuantity = '';

export function addToCart(productId) { //pass productId as a parameter HERE!
    let matchingItem; //saves the parameter passed in the forEach loop, so it can be used outside of its scope
    const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);

    selectorQuantity =  quantitySelectorElement.value;
  
    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){ //find out if item is already in the cart
        matchingItem = cartItem;  //save it into the matchingItem variable
      }
    });
    
    if(matchingItem){ //if true
      matchingItem.quantity += Number(selectorQuantity);
    }else{ 
      cart.push({
        productId: productId,
        quantity: Number(selectorQuantity)
      })
    }
    console.log(cart);
  }

export function deleteFromCart(productId) {
  let newCart =[];

  cart.forEach((cartItem) => {
    if(cartItem.id !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
}