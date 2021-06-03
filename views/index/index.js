import config from '../../src/js/config.js';
import {addHeader, addFooter} from '../../src/js/functions.js';
import Product from '../../src/js/product.js';


addHeader(); addFooter();

fetch(config.serverPath)
.then(response => {
    if(!response.ok) throw "Une erreur est survenue";
    return response.json();
})
.then(listProduct => {
    listProduct.forEach(JSONproduct => {
        let product = new Product(JSONproduct);
        document.getElementById('products').innerHTML +=  
        `
        <a href="${'../shop-item/shop-item.html' + '?_id='  + product._id}" class="card-default">
            <img class="card-default__thumbnail" src="${product.imageUrl}"  alt="${product.description}" >
            <div class="card-default__caption">
                <h3 class="card-default__title">${product.name}</h3>
                <div class="card-default__price">${product.getFormatedPrice()}</div>
            </div>
        </a>
        `
    });
})
.catch(e => console.error(e)) 
  