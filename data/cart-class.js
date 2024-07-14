//OOP organising code into an objects, group the data and functions together into an object
//Tries to represent the real world

//Class is an object generator, 
/**Classes allow use of a constructor-lets us put setup code inside the class */
class Cart {
    cartItems;
    localStorageKey;

    //When an object is generated, the constructor is run automatically
    //method hAs to be named consturctor
    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    
        if (!this.cartItems) {
          this.cartItems = [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              quantity: 2,
              deliveryOptionId: 1,
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity: 1,
              deliveryOptionId: 2,
            },
          ];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.localStorageKey), JSON.stringify(this.cartItems); //Name of what we want to save, data that we want to save
        //(can only save strings to convert using JSON.stringify)
    }
    
      addToCart(productId) {
        //pass productId as a parameter HERE!
        let matchingItem; //saves the parameter passed in the forEach loop, so it can be used outside of its scope
        const quantitySelectorElement = document.querySelector(
          `.js-quantity-selector-${productId}`
        );
        selectorQuantity = quantitySelectorElement.value;
    
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.id) {
            //find out if item is already in the cart
            matchingItem = cartItem; //save it into the matchingItem variable
          }
        });
    
        if (matchingItem) {
          //if true
          matchingItem.quantity += Number(selectorQuantity);
          console.log(matchingItem.quantity);
        } else {
          this.cartItems.push({
            id: productId,
            quantity: Number(selectorQuantity),
            deliveryOptionId: "1",
          });
        }
        this.saveToStorage();
        console.log(productId);
        console.log(cart);
      }

      deleteFromCart(productId) {
        let newCart = []; //create a new cart array
    
        this.cartItems.forEach((cartItem) => {
          if (cartItem.id !== productId) {
            //check that the id of the original cart item is not the same as the productId being passed to the function
            newCart.push(cartItem); //if they are not the same, add that item to the new cart
            console.log(productId);
          }
        });
        this.cartItems = newCart; // overwrite the previous cart array
    
        this.saveToStorage();
      }

      upadateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem; //saves the matching cart item
      
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.id) {
            //find out if item is already in the cart
            matchingItem = cartItem; //save it into the matchingItem variable
          } else {
            console.log(productId);
            console.log("ProdcutId is undefined!");
          }
        });
        // matchingItem.deliveryOptionId = deliveryOptionId
        this.saveToStorage();
      }
    
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
