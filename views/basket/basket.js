const pathServer = 'http://localhost:3000/api/cameras/';

const itemBasketManager = new ItemBasketManager();
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
         * Gère les boutons du formulaire
         */

        console.log(document.querySelectorAll('#formBasket button[type="submit"]'))

        document.querySelectorAll('#formBasket button[type="submit"]').forEach(button => {
            button.addEventListener('click',function(event){
                event.preventDefault();
                displayFormDelivery.classList.remove('d-none');
                document.querySelector('body').classList.add('overflow-hidden')
            },false)
        })

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
            event.preventDefault();

            let formDelivery = displayFormDelivery.querySelector('form');
            formDelivery.reportValidity();
            formDelivery.classList.add('was-validated');
        },false)
    })
    .catch(e => console.error(e))

    
}