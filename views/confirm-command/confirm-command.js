import config from '../../src/js/config.js';
import {addHeader, addFooter} from '../../src/js/functions.js';
import DeliveryContact from '../../src/js/deliveryContact.js';



let orderSessionStorage = JSON.parse(sessionStorage.getItem(config.storageName.ordered)) || [];
let deliveryContactSessionStorage = JSON.parse(sessionStorage.getItem(config.storageName.deliveryContact)) || [];

let deliveryContact = new DeliveryContact(deliveryContactSessionStorage);


function updateOnPage(){
    //prix
    document.querySelector('').innerHTML = orderSessionStorage.totalPrice;

    //numéro de commande
    document.querySelector('').innerHTML = orderSessionStorage.order;
    
    //nom prénom
    document.querySelector('').innerHTML = deliveryContact.firstName;
}

addHeader();
addFooter();