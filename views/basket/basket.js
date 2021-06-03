import config                   from '../../src/js/config.js';
import {addHeader, addFooter, getDateAWeekLater} from '../../src/js/functions.js';
import ProductBasket            from '../../src/js/productBasket.js';
import Basket                   from '../../src/js/basket.js';
import DeliveryContact          from '../../src/js/deliveryContact.js';

let listProductOnStorage = JSON.parse(localStorage.getItem(config.storageName.basket)) || [];
let deliveryContactOnStorage = JSON.parse(sessionStorage.getItem(config.storageName.deliveryContact)) || [];

let basket = new Basket(listProductOnStorage.map(productOnStorage => new ProductBasket(productOnStorage)));
let deliveryConctact = new DeliveryContact(deliveryContactOnStorage);


let listCheckBox, listSelectQuantity, listItemShop, listDeleteButton, formDelivery;


/**
 * @function displayListProduct
 * @description Affiche l'ensemble des produits ajouté au Panier
 */
function displayListProduct(){
    let listProductBasket = listProductOnStorage.map(productBasket => new ProductBasket(productBasket));
    let content = document.querySelector("#content");
    listProductBasket.forEach((productBasket,i) => {
        content.innerHTML += 
        `<div class="row border-bottom py-4 itemShop">
            <div class='d-flex col-12 col-md-auto align-items-center'>
                <input type="checkbox" class="form-check-input" name="selection" ${(productBasket.selected) ? 'checked' : '' } >
            </div>
            <div class='col-12 col-md-2'>
                <img class="w-100" src="${productBasket.imageUrl}" alt="${productBasket.description}">
            </div>
            <div class='col-12 col-md'>
                <div class="card-title fw-bold">${productBasket.name}</div>
                <span>${ productBasket.lenses[productBasket.version] }</span>
                <p class="card-text">${productBasket.description}</p>
                <div class="row">
                    <div>
                        <label for="quantity${i}" class="col-12">Quantité : </label>
                        <input class="quantity" name="quantity[]" id="quantity${i}" type="number" value="${productBasket.quantity}" min=1 >                                          
                    </div>
                    <div>
                        <button type="button" class="btn btn-link ps-0 deleteItemShop">supprimer</button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-auto">${productBasket.getFormatedPrice()}</div>
        </div>`;
    })
}

/**
 * @function addDatePrev
 * @description Ajoute la date prévisionnelle
 */
function addDatePrev(){
    document.getElementById('date_prev').innerHTML = getDateAWeekLater();
}

/**
 * @function displayDeliveryForm
 * @description Affiche le formulaire de contact pour la livraison (prérempli ou non)
 */
function displayDeliveryForm(){
    document.querySelector('#modalContainer').innerHTML = 
    `
        <div class="modal fade" id="modalDeliveryContact" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title" id="exampleModalLabel">Informations de livraison</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formDelivery" class="row" action="#"  novalidate>

                            <div class="mb-3">
                                <label for="country" class="mb-1" aria-label="Pays">Pays</label>
                                <select class="form-control" id="country" name="country" disabled>
                                    <option value="0">France</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="firstName" class="mb-1" aria-label="Prénom">Prénom</label>
                                <input type="text" class="form-control" id="firstName" name="firstName"  pattern="^[\\p{L} '-]+$" required value="${deliveryConctact.firstName}">
                                
                                <div class="invalid-feedback">
                                    <strong>Le Prénom n'a pas été renseigné, ou a été mal renseigné.</strong><br/>
                                    Seul les caracètres suivants sont autorisés : 
                                    <ul>
                                        <li>Les caractères alphabétiques</li>
                                        <li>l'apostrophe (')</li>
                                        <li>le tiret (-)</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="lastName" class="mb-1"   aria-label="Nom">Nom</label>
                                <input type="text" class="form-control" id="lastName" name="lastName" pattern="^[\\p{L} '-]+$"  required value="${deliveryConctact.lastName}">
                                
                                <div class="invalid-feedback">
                                    <strong>Le Nom n'a pas été renseigné, ou a été mal renseigné.</strong><br/>
                                    Seul les caracètres suivants sont autorisés : 
                                    <ul>
                                        <li>Les caractères alphabétiques</li>
                                        <li>l'apostrophe (')</li>
                                        <li>le tiret (-)</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="adressLine1" class="mb-1"   aria-label="Adresse ligne 1">Adresse ligne 1</label>
                                <input type="text" class="form-control" id="adressLine1" name="adressLine1" placeholder="Adresse postale, boîte postale" required value="${deliveryConctact.adressLine1}">
                                
                                <div class="invalid-feedback"> <strong>L'Adresse ligne 1 n'a pas été renseignée..</strong> </div>
                            </div>

                            <div class="mb-3">
                                <label for="adressLine2" class="mb-1"   aria-label="Adresse ligne 2">Adresse ligne 2</label>
                                <input type="text" class="form-control" id="adressLine2" name="adressLine2" placeholder="Appartement, suite unité, immeuble, étage, etc." value="${deliveryConctact.adressLine2}">
                            </div>

                            <div class="mb-3">
                                <label for="city" class="mb-1" aria-label="Ville">Ville</label>
                                <input type="text" class="form-control" id="city" name="city" pattern="^[\\p{L} '-]+$"  required value="${deliveryConctact.city}">
                                
                                <div class="invalid-feedback">
                                    <strong>La ille n'a pas été renseignée ou a été mal renseignée.</strong><br>
                                    Seul les caracètres suivants sont autorisés : 
                                    <ul>
                                        <li>Les caractères alphabétiques</li>
                                        <li>l'apostrophe (')</li>
                                        <li>le tiret (-)</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="zipCode" class="mb-1"   aria-label="Code Postale">Code Postale</label>
                                <input id="zipCode" name="zipCode" type="text" class="form-control" pattern="^[\\p{N}]{5}$" minlength="5" maxlength="5"  required value="${deliveryConctact.zipCode}">
                                
                                <div class="invalid-feedback">
                                    <strong>Le code Postale n'a pas été renseigné, ou a été mal renseigné.</strong>
                                    <ul>
                                        <li>Seul les caracètres numériques sont autorisés</li>
                                        <li>Il doit contenir 5 chiffres</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="phoneNumber" class="mb-1"   aria-label="Numéro de téléphone">Numéro de téléphone</label>
                                <input id="phoneNumber" name="phoneNumber" type="tel" class="form-control" pattern="^0[\\p{N}]{9}$" maxlength="10"   required value="${deliveryConctact.phoneNumber}">
                                
                                <div class="invalid-feedback">
                                    <strong>Le numéro de téléphone n'a pas été renseigné, ou a été mal renseigné.</strong>
                                    <ul>
                                        <li>Seul les caracètres numériques sont autorisés</li>
                                        <li>Il doit commencer par un 0</li>
                                        <li>Il doit contenir 10 chiffres</li>
                                    </ul>
                                </div>
                            </div>


                            <div class="mb-3">
                                <label for="email" class="mb-1" aria-label="Adresse email">Adresse email</label>
                                <div class="input-group has-validation ">
                                    <span class="input-group-text" id="inputGroupPrepend3">@</span>
                                    <input type="email" class="form-control" name="email" id="email" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback emailHelp" required value="${deliveryConctact.email}">
                                    <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                        <strong>L'adresse email n'a pas été renseigné, ou a été mal renseigné.</strong>
                                    </div>
                                </div>
                                <div id="emailHelp" class="form-text">Exemple : Phil@contat.fr</div>
                            </div>

                            <div class="">
                                <h3 class="h3">Ajouter des instructions pour la livraison</h3>
                                <div class="mb-3">
                                    <label for="moreInfo" class="mb-1"   aria-label="Avons-nous besoin de directions supplémentaires pour trouver cette adresse?">
                                        Avons-nous besoin de directions supplémentaires pour trouver cette adresse?
                                    </label>
                                    <textarea name="moreInfo" class="form-control" id="moreInfo" rows="5" placeholder="Fournir des détails tels que la description du bâtiment, un point de repère à proximité ou d'autres instructions de navigation">${deliveryConctact.moreInfo}</textarea>
                                </div>
                            </div>   
                            
                            <div class="mb-3">
                                <label for="secureBuildingCode" class="mb-1"   aria-label="Faut-il un code de sécurité ou un numéro de téléphone pour accéder au bâtiment ?">
                                    Faut-il un code de sécurité ou un numéro de téléphone pour accéder au bâtiment ?
                                </label>
                                <input type="text" class="form-control" id="secureBuildingCode" name="secureBuildingCode" value="${deliveryConctact.secureBuildingCode}" >
                            </div>

                            <div class="modal-footer">
                                <button class="btn btn-primary" type="submit">Valider</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * @function defineVariablesDOM
 * @description Défini l'ensemble des variables en lien avec le DOM
 */
function defineVariablesDOM(){
    listItemShop        = document.querySelectorAll('.itemShop');
    listDeleteButton    = document.querySelectorAll('.deleteItemShop')
    listSelectQuantity  = document.querySelectorAll('#formBasket input[name="quantity[]"]');
    listCheckBox        = document.querySelectorAll('#formBasket input[type="checkbox"]');
    formDelivery        = document.querySelector('#formDelivery');
}

/**
 * @function defineVariablesDOM
 * @description Défini l'ensemble des variables en lien avec le DOM
 */
function addEventSubmitFormBasket(){
    formBasket.querySelectorAll('#formBasket button[type="submit"]').forEach(button => {
        button.addEventListener('click',function(event){
            event.preventDefault();

            let modal = new bootstrap.Modal(document.getElementById('modalDeliveryContact'));
                modal.show()
        },false);
    })
}

/**
 * @function addEventInputQuantity
 * @description Ajout de l'evenement "change" à tous les input Quantity
 */
function addEventInputQuantity(){

    listSelectQuantity = document.querySelectorAll('#formBasket input[name="quantity[]"]');

        listSelectQuantity.forEach(node => {
            node.addEventListener('change',function(event){
                event.stopPropagation();

                basket.update(
                    [...listSelectQuantity].findIndex( node => node === this ), 
                    { quantity : this.value } 
                );
                updateHTMLPriceZone();
            })
        },false)

}

/**
 * @function addEventCheckBox
 * @description Ajout de l'evenement "change" à tous les input checkbox
 */
function addEventCheckBox(){

    listCheckBox = document.querySelectorAll('#formBasket input[type="checkbox"]');

        listCheckBox.forEach(node => {
            node.addEventListener('change',function(event){
                event.stopPropagation();

                basket.update(
                    [...listCheckBox].findIndex( node => node === this ), 
                    { selected : this.checked } 
                );
                updateHTMLSelectAll();
                updateHTMLPriceZone();
            })
        },false)

}

/**
 * @function addEventSelectAll
 * @description Ajout de l'evenement "click" au bouton #deseclectAll
 */
function addEventSelectAll(){
    document.querySelector('#deselectAll').addEventListener('click',function(event){

        let allSelected = (basket.areAllSelected()) ? false : true ;
        
        document.querySelectorAll('#formBasket input[type="checkbox"]').forEach((node,index) => { 
            basket.update(index, { selected : allSelected });
            node.checked = allSelected; 
        })

        updateHTMLSelectAll();
        updateHTMLPriceZone();

    },false)
}

/**
 * @function addEventDelete
 * @description Ajout de l'evenement "click" à chaque bouton ayant la class .deleteItemShop
 */
function addEventDelete(){
    listItemShop        = document.querySelectorAll('.itemShop');
    listDeleteButton    = document.querySelectorAll('.deleteItemShop')

    listDeleteButton.forEach(node => {
        node.addEventListener('click', function(event){
            let index = [...listDeleteButton].findIndex(deleteButton => deleteButton === node);
                basket.remove(index);
                listItemShop[index].parentNode.removeChild(listItemShop[index]);
                updateHTMLSelectAll();
                updateHTMLPriceZone();
                defineVariablesDOM();
        },false);
    })
}

/**
 * @function addEventSubmitFormDelivery
 * @description Ajout de l'evenement "click" aux boutons[type="submit"] du #formDelivery
 */
function addEventSubmitFormDelivery(){

    document.querySelector('#formDelivery button[type="submit"]').addEventListener('click',function(event){
        event.preventDefault();

        if(!formDelivery.reportValidity()){
            formDelivery.classList.add('was-validated');
        }else{

            let deliveryConctact = new DeliveryContact(getFormDeliveryValues());

            sessionStorage.setItem( config.storageName.deliveryContact , JSON.stringify(deliveryConctact) );

            let objectPost = Object.assign(
                { contact : deliveryConctact.getPostObject() }, 
                { products : basket.getSelectedProduct().map(product => product._id ) }
            );

            postOrder(objectPost)
            .then(response => {
                response.totalPrice = basket.getFormatedSelectedTotal();

                basket.getSelectedProduct().forEach(product => { basket.remove( basket.getIndex(product) ) })

                sessionStorage.setItem( config.storageName.ordered , JSON.stringify(response) );

                window.location.href = '../confirm-command/confirm-command.html'                
            })
            .catch(e => console.error(e))


        }
    },false);
}

/**
 * @function updateHTMLSelectAll
 * @description Met à jour l'intitulé du bouton #deselectAll
 */
function updateHTMLSelectAll(){
    let deselectAll = document.querySelector('#deselectAll');
    if(basket.areAllSelected()) deselectAll.innerHTML = 'Deselectionner tout';
    else deselectAll.innerHTML = 'Selectionner tout';
}

/**
 * @function updateHTMLPriceZone
 * @description Met à jour les zones .total en indiquant le prix total
 */
function updateHTMLPriceZone(){
    let innerHTML = 'Aucun produit sélectionné';

    if(!basket.areAllNotSelected()) innerHTML = basket.getFormatedSelectedTotal();

    document.querySelectorAll('.total').forEach(node => node.innerHTML = innerHTML );

    updateSubmitButtonFormBasket()
}

/**
 * @function updateSubmitButtonFormBasket
 * @description Enable ou Disable les boutons de validation du formation du panier en fonction des produits selectionnés ou non 
 */
function updateSubmitButtonFormBasket(){
    document.querySelectorAll('#formBasket button[type="submit"]').forEach(button => {
        if(basket.areAllNotSelected()) button.setAttribute('disabled','');
        else button.removeAttribute('disabled');
    })
}

/**
 * @function getFormDeliveryValues
 * @description Récupère l'ensemble des valeurs renseignées au sein du formulaire de contact pour la livraison
 * @return {object}
 */
function getFormDeliveryValues(){
    return [...formDelivery.querySelectorAll('input, textarea')].reduce((accumulator, node) => ({
        ...accumulator,
        [node.name] : node.value
    }), {})
}

/**
 * @function postOrder
 * @description Réalise une requete Post, envoie des informations de contact{} et 
 * l'ensemble des produits selectionné products[] au sein de l'objet body
 * @param {object} body représente le body attendu de la requete
 * @return {Promise} 
 */
async function postOrder(body){
    let response = await fetch(config.serverPath + 'order', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body : JSON.stringify(body)
    });
    if(!response.ok) throw 'Erreur lors de la requete POST'
    return await response.json();
}

addHeader(); addFooter();
addDatePrev();
displayListProduct();
displayDeliveryForm();
defineVariablesDOM();
updateHTMLSelectAll();
updateHTMLPriceZone();
addEventSubmitFormBasket();
addEventInputQuantity();
addEventCheckBox();
addEventSelectAll();
addEventDelete();
addEventSubmitFormDelivery();
