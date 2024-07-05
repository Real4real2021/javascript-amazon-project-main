//Normalize the data for the cart
import {products} from './products.js';

export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },{
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))  //Name of what we want to save, data that we want to save
    //(can only save strings to convert using JSON.stringify)
}

let selectorQuantity = '';

export function addToCart(productId) { //pass productId as a parameter HERE!
    let matchingItem; //saves the parameter passed in the forEach loop, so it can be used outside of its scope
    const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);

    selectorQuantity =  quantitySelectorElement.value;
  
    cart.forEach((cartItem) => {
      if(productId === cartItem.id){ //find out if item is already in the cart
        matchingItem = cartItem;  //save it into the matchingItem variable
      }
    });
    
    if(matchingItem){ //if true
      matchingItem.quantity += Number(selectorQuantity);
      console.log(matchingItem.quantity);
    }else{ 
      cart.push({
        id: productId,
        quantity: Number(selectorQuantity),
        deliveryOptionId: '1'
      })
    }
    saveToStorage();

    console.log(cart)
  }

export function deleteFromCart(productId) {
  let newCart =[]; //create a new cart array

  cart.forEach((cartItem) => {
    if(cartItem.id !== productId){ //check that the id of the original cart item is not the same as the productId being passed to the function
      newCart.push(cartItem); //if they are not the same, add that item to the new cart
    }
  });
  cart = newCart; // overwrite the previous cart array

  saveToStorage();
}