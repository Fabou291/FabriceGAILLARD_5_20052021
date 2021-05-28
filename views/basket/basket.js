const pathServer = 'http://localhost:3000/api/cameras/';

const itemBasketManager = new ItemBasketManager();

const deliveryConctact = (sessionStorage.getItem('deliveryContact') !== null) ? new DeliveryConctact(JSON.parse(sessionStorage.getItem('deliveryContact'))) : new DeliveryConctact([]) ;
let displayFormDelivery = document.getElementById('displayFormDelivery');
let listCheckbox;


async function fetchWithIdList(idList){
    let responseList = [], response;
    for (const i in idList) {
        response = await fetch(pathServer + idList[i]);
        if(!response.ok) throw `Un problème est suvenu lors de la req numéro ${i}`
        responseList[i] = await response.json();        
    }

    return responseList;    
}

function updateTotal(){
    let itemBasket = itemBasketManager.itemList;
    let HTML = "Aucun article sélectionné";

    let listIndex = [],  j =0;

    for (const [i, checkbox] of listCheckbox.entries()) if(checkbox.checked) listIndex[j++] = i;    

    if(listIndex.length > 0){
        let total = listIndex
        .reduce((accumulateur, index) => 
            accumulateur += itemBasket[index].price / 100 * itemBasket[index].quantity
        ,0)
        HTML = `Sous-total de ${listIndex.length} item${ (listIndex.length>1) ? 's' : '' } : <strong id="total">${new Intl.NumberFormat( 'fr-FR', { style: 'currency', currency: 'EUR' }).format(total)}</strong>` 
    }

    document.querySelectorAll(".total").forEach( element => element.innerHTML = HTML ); 


}

function updateSelectAllButton(allChecked){
    document.getElementById("deselectAll").innerHTML = (allChecked) ? 'Déselectionner tout' : 'Selectionner tout'; 
}

function updateButtonCmd(allUnChecked){
    document.querySelectorAll('button[type="submit"]').forEach(button => {
        if(allUnChecked) button.setAttribute('disabled','');
        else button.removeAttribute('disabled','');
    })
}



let itemListBasketStorage = localStorage.getItem('itemListBasket');
if(itemListBasketStorage == null) alert("Il n'y à rien dans votre panier");
else{

    itemListBasket = JSON.parse(itemListBasketStorage);

    idList = itemListBasket.map(e => e.id)
    idList = idList.filter( (item,index) => idList.indexOf(item) === index);

    fetchWithIdList(idList)
    .then( JsonListItem => {
        listItem = [];
        for (const i in JsonListItem) {
            listItem[i] = new Item(JsonListItem[i]);
        }
        return listItem;
    } )
    .then(listItem => {
        let item;
        for (const itemBasket of itemListBasket) {
            item = listItem.find(item => item._id == itemBasket.id);
            document.getElementById('content').innerHTML +=
            `<div class="row border-bottom py-4 itemShop">
                <div class='d-flex col-12 col-md-auto align-items-center'>
                    <input type="checkbox" class="form-check-input" name="selection" ${(itemBasket.selected) ? 'checked' : '' } >
                </div>
                <div class='col-12 col-md-2'>
                    <img class="w-100" src="${item.imageUrl}" alt="${item.description}">
                </div>
                <div class='col-12 col-md'>
                    <h5 class="card-title">${item.name}</h5>
                    <span>${ item.lenses[itemBasket.version] }</span>
                    <p class="card-text">${item.description}</p>
                    <div class="row">
                        <div class="col-auto">
                            <label for="quantity">Quantité : </label>
                            <input class="w-auto quantity" name="quantity" type="number" value="${itemBasket.quantity}" min=1 >                                          
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-link deleteItemShop" data-id="${item._id}" >supprimer</button>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-auto">${item.getParsedPrice()}</div>
            </div>`;

        }
        listCheckbox = document.querySelectorAll('#formBasket input[type="checkbox"]');
        updateSelectAllButton(itemBasketManager.areAllSelected());
        updateButtonCmd(itemBasketManager.areAllNotSelected())
        updateTotal();
        return listItem;
    })
    .then(listItem => {
        /**
         * Ajout des évenements
         * Sur les input[type='number']
         * Sur les lien permettant de supprimer
         */

        let collectionItem = document.querySelectorAll(".itemShop");
        for (let i = 0; i < collectionItem.length; i++) {

            const item = collectionItem[i];

            const input = item.querySelector("input.quantity");
            input.addEventListener('change',function(){
                itemBasketManager.updateItemQuantity(
                    [...document.querySelectorAll("input.quantity")].indexOf(input),
                    input.value
                );
                updateTotal();
            },false);

            const deleteItemShop = item.querySelector(".deleteItemShop");
            deleteItemShop.addEventListener('click',function(e){
                e.preventDefault();

                itemBasketManager.removeItem(
                    [...document.querySelectorAll(".deleteItemShop")].indexOf(deleteItemShop)
                );
                
                item.parentNode.removeChild(item);
                listCheckbox = document.querySelectorAll('#formBasket input[type="checkbox"]');

                updateSelectAllButton(itemBasketManager.areAllSelected());
                updateButtonCmd(itemBasketManager.areAllNotSelected())
                updateTotal();
            },false);

        }
    })
    .then(()=>{
        /**
         * Gère **déselectionner tout**
         */

         document.getElementById('deselectAll').addEventListener('click',function(){
            
            let allChecked = itemBasketManager.areAllSelected();
            for (const [i, checkbox] of listCheckbox.entries()) {
                itemBasketManager.updateSelected(i,!allChecked);
                checkbox.checked = !allChecked;
                updateSelectAllButton(!allChecked);
                updateButtonCmd(itemBasketManager.areAllNotSelected())
                updateTotal();
            }
            
        },false)
       
    })
    .then(()=>{
        /**
         * Gère les checkbox
         */   

        for (const [i, checkbox] of listCheckbox.entries()) {
            checkbox.addEventListener('change',function(){
                itemBasketManager.updateSelected(i,checkbox.checked);
                updateSelectAllButton(itemBasketManager.areAllSelected());
                updateButtonCmd(itemBasketManager.areAllNotSelected())
                updateTotal();
            },false);            
        }
        

    })
    .then(()=>{
        /**
         * Gère les boutons du formulaire basket
         */

        document.querySelectorAll('#formBasket button[type="submit"]').forEach(button => {
            button.addEventListener('click',function(event){
                event.preventDefault();
                displayFormDelivery.classList.remove('d-none');
                document.querySelector('body').classList.add('overflow-hidden')
            },false)
        })

    })
    .then(()=>{
        document.querySelector("#displayFormDelivery").innerHTML =
        `<div class="row position-relative">
            <section class="col-11 px-0 col-lg-4 m-auto bg-white my-5 rounded-3 overflow-hidden form-delivery">
                    <div class=" bg-light p-3 fs-5 d-flex">
                        Informations de livraison 
                        <button id="shutButtonForm" class="btn btn-default ms-auto px-2">
                            <i class="bi bi-x-square-fill"></i>
                        </button>
                    </div>
                    <div class=" m-auto p-3">
                        <h2>Informations de livraison</h2>
                        <form id="formDelivery" class="row" action="../confirm-command/confirm-command.html" method="POST"  novalidate>

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
                                <input type="text" class="form-control" id="city" name="city"  required value="${deliveryConctact.city}">
                                
                                <div class="invalid-feedback"> <strong>La Ville n'a pas été renseignée.</strong> </div>
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
                            <section>
                                <div class="">
                                    <h3 class="h5">Ajouter des instructions pour la livraison</h3>
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
                            </section>

                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Valider</button>
                            </div>

                        </form>  
                    </div>     
            </section>                 
        </div>
        <div class="w-100 h-100 position-absolute top-0 shut-zone"></div>`

    })
    .then(()=>{

        /**
         * Gère le display delivery
         */

        [ document.querySelector('.shut-zone'), document.querySelector('#shutButtonForm') ].forEach(element => {
            element.addEventListener('click',function(event){
                displayFormDelivery.classList.add('d-none');
                document.querySelector('body').classList.remove('overflow-hidden')
            },false)            
        })

    })
    .then(()=>{
        
        /**
         * Gère le button submit du form delivery
         */
        
        displayFormDelivery.querySelector('button[type="submit"]').addEventListener('click',function(event){
            let formDelivery = displayFormDelivery.querySelector('form');

            deliveryConctact.hydrate(
                [...formDelivery.querySelectorAll('input, select, textarea')].reduce((accumulator, node) => ({
                    ...accumulator, 
                    [node.name] : node.value
                }), {} )
            );

            sessionStorage.setItem('deliveryContact', JSON.stringify(deliveryConctact) )


            if(!formDelivery.reportValidity()){
                event.preventDefault();
                formDelivery.classList.add('was-validated');
            }else{
                let formData = new FormData();
                    formData.append('contact', JSON.stringify(
                        {
                            firstName   : deliveryConctact.firstName,
                            lastName    : deliveryConctact.lastName,
                            city        : deliveryConctact.city,
                            adress      : deliveryConctact.getAdressOneLine(),
                            email       : deliveryConctact.email
                        }
                    ))
                    formData.append(
                        'product_id',
                        JSON.stringify(itemBasketManager.getSelectedItems().map(listItemBasket => listItemBasket.id))
                    );
            }
            
        },false)
    })
    .catch(e => console.error(e))

    
}