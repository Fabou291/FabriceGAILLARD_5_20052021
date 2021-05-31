import config from '../../src/js/config.js';
import {addHeader, addFooter} from '../../src/js/functions.js';
import DeliveryContact from '../../src/js/deliveryContact.js';



let orderSessionStorage = JSON.parse(sessionStorage.getItem(config.storageName.ordered)) || [];
let deliveryContactSessionStorage = JSON.parse(sessionStorage.getItem(config.storageName.deliveryContact)) || [];

let deliveryContact = new DeliveryContact(deliveryContactSessionStorage);


function updateOnPage(){
    //prix
    document.getElementById('order_price').innerHTML = orderSessionStorage.totalPrice;

    //numéro de commande
    document.getElementById('order_number').innerHTML = orderSessionStorage.orderId;
    
    //nom prénom
    document.getElementById('order_name').innerHTML = deliveryContact.firstName;

    //date previsionnel
    document.getElementById('delivery_date_prev').innerHTML = getDateAWeekLater();
}

function getDateAWeekLater(){
    let date = new Date(Date.now() + (7*24*60*60*1000));
    if(!isAWorkingDay(date)) date = getNextWorkingDay(date);
    return date.toLocaleDateString('fr-FR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
}

function getNextWorkingDay(date){
    //Intégrer le concept de jours férier
    if(!isAWorkingDay(date)) return getNextWorkingDay(new Date(date.getTime() + (1*24*60*60*1000)));
    return date;
}

function isAWorkingDay(date){
    return ![6,0].includes(date.getDay());
}

addHeader(); addFooter();
updateOnPage();

