import config from '../../src/js/config.js';
import {addHeader, addFooter} from '../../src/js/functions.js';
import Product from '../../src/js/product.js';
import ProductBasket from '../../src/js/productBasket.js';
import Basket from '../../src/js/Basket.js';

/**
 * @function fetchProductById
 * @description Récupére le produit par l'id "_id" 
 * @param {string} id
 * @returns Promesse
 */
async function fetchProductById(id){
    let response = await fetch(config.serverPath + id);
    if(!response.ok) throw `Aucun _id ne correspond à : "${id}"` ;
    return await response.json();
}

/**
 * @function setEventAddBasket
 * @description Ajoute l'evenement au bouton submit du formulaire 
 * Permettant de l'ajout d'un produit au panier
 * @param {Product} product 
 */
function setEventAddBasket(product){
    document.querySelector('#addToBasket').addEventListener('click',function(event){

        event.preventDefault();

        let listNodeSelect = document.querySelectorAll('#quantity, #version');

        let productBasket = new ProductBasket(
            Object.assign(
                {...product},
                [...listNodeSelect].reduce( (accumulator, node) => ({ ...accumulator, [node.id] : node.value }), {selected : true} )
            )
        );
        
        let listProductOnStorage = JSON.parse(localStorage.getItem(config.storageName.basket)) || [];

        let basket = new Basket( listProductOnStorage.map(product => new ProductBasket(product)) );
            basket.add(productBasket);

        localStorage.setItem(config.storageName.basket, JSON.stringify(basket.listProduct));
       
        updateModal(productBasket);
        modal.show();
        
    },false)
}

/**
 * @function getUrlParam
 * @description Récolte le paramètre demandé
 * @param {string} param 
 * @returns {string} paramValue
 */
function getUrlParam(param){
    let urlParams = new URLSearchParams(window.location.search);
    if(!urlParams.has(param)) throw `Aucun "${param}" trouvé`;
    return urlParams.get(param)    
}

function updateModal(productBasket){
    document.getElementById('imageProductAdded').innerHTML      = `<img src="${productBasket.imageUrl}" class="card-img-top" >`;
    document.getElementById('titleProductAdded').innerHTML      = `${productBasket.name}`;
    document.getElementById('quantityProductAdded').innerHTML   = `${productBasket.quantity}`;
    document.getElementById('versionProductAdded').innerHTML    = `${productBasket.getNameVersionChoosed()}`;
}

let modal = new bootstrap.Modal(document.getElementById('modalAddBasket'));
addHeader(); addFooter();

fetchProductById(getUrlParam('_id'))
.then(jsonProduct => {
    let product = new Product(jsonProduct);
    let htmlOptions = product.lenses.reduce( (accumulator, lens)  => accumulator += `<option value="${product.lenses.indexOf(lens)}">${lens}</option>`, '');

    document.querySelector('#container').innerHTML = 
        `<div class="row py-5">
            <div class="col-4">
                <img class="w-100" src="${product.imageUrl}" alt="${product.description}">
            </div>
            <div class="col-8">
                <h1>${product.name}</h1>
                <p>${product.description}</p>
                <div>${product.getFormatedPrice()}</div>
                <form id="formAddBasket" action="" >

                    <label for="quantity" aria-label="Quantité : ">Quantité : </label>
                    <select name="quantity" class="form-select mb-3 w-auto" id="quantity" aria-label="quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <label for="version" aria-label="Version : ">Version : </label>
                    <select name="version" id="version" class="form-select mb-3 w-auto">${htmlOptions}</select>

                    <button type="submit" id="addToBasket" class="btn btn-warning" >Ajouter au panier</button>
                
                </form>
            </div>
        </div>`;
    

    setEventAddBasket(product);

})
.catch(e => console.error)






