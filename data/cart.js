export const cart = [];

export function addToCart(productId) { //pass productId as a parameter HERE!
    let matchingItem; //saves the parameter passed in the forEach loop, so it can be used outside of its scope
    const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);

    const selectorQuantity =  quantitySelectorElement.value;
  
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
  }