import config from '../../src/js/config.js';
import {addHeader, addFooter, getDateAWeekLater} from '../../src/js/functions.js';
import DeliveryContact from '../../src/js/deliveryContact.js';

let orderSessionStorage = JSON.parse(sessionStorage.getItem(config.storageName.ordered)) || [];
let deliveryContactSessionStorage = JSON.parse(sessionStorage.getItem(config.storageName.deliveryContact)) || [];

let deliveryContact = new DeliveryContact(deliveryContactSessionStorage);

/**
 * @function updateOnPage
 * @description Met à jours les informations sur différentes zones de la pages
 */
function updateOnPage(){
    document.getElementById('order_price').innerHTML = orderSessionStorage.totalPrice;

    document.getElementById('order_number').innerHTML = orderSessionStorage.orderId;
    
    document.getElementById('order_name').innerHTML = deliveryContact.firstName;

    document.getElementById('delivery_date_prev').innerHTML = getDateAWeekLater();

}

addHeader(); addFooter();
updateOnPage();

