import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/backend-practice.js'
import { laodProducts } from "../data/products.js";
// import '../data/cart-class.js'; //runs all the code in the file without having to import individual elements

laodProducts(() => { //anonymous function
    renderOrderSummary();
    renderPaymentSummary();
});