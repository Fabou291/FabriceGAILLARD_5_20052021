const pathServer = 'http://localhost:3000/api/cameras/';

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
    let itemBasket = new ItemBasketManager().itemList;
    let HTML = "Aucun article sélectionné";

    let listCheckBox = document.querySelectorAll('input[type="checkbox"]').entries(), 
        listIndex = [],  j =0;
    for (const [i, checkbox] of listCheckBox) if(checkbox.checked) listIndex[j++] = i;    

    if(listIndex.length > 0){
        let total = listIndex
        .reduce((accumulateur, index) => 
            accumulateur += itemBasket[index].price / 100 * itemBasket[index].quantity
        ,0)
        HTML = `Sous-total de ${listIndex.length} item${ (listIndex.length>1) ? 's' : '' } : <strong id="total">${new Intl.NumberFormat( 'fr-FR', { style: 'currency', currency: 'EUR' }).format(total)}</strong>` 
    }

    document.querySelectorAll(".total").forEach( element => element.innerHTML = HTML ); 


}

function updateSelectAllButton(invert){
    let allChecked = true;
    let nodeListCheckbox = document.querySelectorAll('input[type="checkbox"]').entries();

    for (const [i, checkbox] of nodeListCheckbox){ allChecked &= checkbox.checked; }

    if(invert) allChecked = !allChecked;

    document.getElementById("deselectAll").innerHTML = (allChecked) ? 'Selectionner tout' : 'Déselectionner tout';
    return allChecked;

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
                    <input type="checkbox" class="form-check-input" name="selection" checked>
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
                            <a href="#" data-id="${item._id}" class="deleteItemShop">supprimer</a>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-auto">${item.getParsedPrice()}</div>
            </div>`;

        }
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
                new ItemBasketManager().updateItemQuantity(
                    [...document.querySelectorAll("input.quantity")].indexOf(input),
                    input.value
                );
                updateTotal();
            },false);

            const deleteItemShop = item.querySelector(".deleteItemShop");
            deleteItemShop.addEventListener('click',function(e){
                e.preventDefault();

                new ItemBasketManager().removeItem(
                    [...document.querySelectorAll(".deleteItemShop")].indexOf(deleteItemShop)
                );

                item.parentNode.removeChild(item);
                updateTotal();
                updateSelectAllButton(invert = true);
            },false);

        }
    })
    .then(()=>{
        /**
         * Gère l'evenement au lien/bouton **déselectionner tout**
         */
        document.getElementById("deselectAll").addEventListener('click', function(){
            let allChecked = updateSelectAllButton(invert = false);
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = !allChecked;
            })
        
            updateTotal();
        },false)
       
    })
    .then(()=>{
        /**
         * Gère l'evenement des checkbox
         */

        document.querySelectorAll('input[type="checkbox"]').forEach(checkBox => {
            checkBox.addEventListener('change',function(){
                updateTotal();
                updateSelectAllButton(invert = true);
            },false);
        })

    })
    .catch(e => console.error(e))

    
}