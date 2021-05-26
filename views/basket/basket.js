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
    let itemBasketManager = new ItemBasketManager();
    document.querySelectorAll(".total").forEach( 
        element => element.innerHTML = 
            `Sous-total de ${itemBasketManager.itemList.length} item${ (itemBasketManager.itemList.length>1) ? 's' : '' } : <strong id="total">${itemBasketManager.getParsedTotal()}</strong>` 
    );
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
            `<div class="row border-bottom py-4">
                <div class='d-flex col-12 col-md-auto align-items-center'>
                    <input type="checkbox" class="form-check-input" name="A REMPLIR" >
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
                            <input class="w-auto" name="quantity" type="number" value="${itemBasket.quantity}" min=1 >                                          
                        </div>
                        <div class="col-auto">
                            <a href="#" data-id="${item._id}">supprimer</a>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-auto">${item.getParsedPrice()}</div>
            </div>`;
        }
        updateTotal();
    })
    .catch(e => console.error(e))

    
}