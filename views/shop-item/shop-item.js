let pathServer = "http://localhost:3000/api/cameras/";

async function getIdParam(){
    const id = new URLSearchParams(window.location.search).get('_id');
    if(id === null) throw "Aucun argument _id n'a été trouvé";
    return id;

}



getIdParam()
.then(id => fetch(pathServer + id)) 
.then(data => {
    if(!data.ok) throw `Aucun item-shop ne correspond à l'id envoyé`;
    return data.json();
})
.then(jsonShopItem => new Item(jsonShopItem))
.then(shopItem => {
    let container = document.getElementById("container");

    let optionVersionHTML = '';
    for (const i in shopItem.lenses) optionVersionHTML += `<option value="${i}">${shopItem.lenses[i]}</option>`;

    

    container.innerHTML = 
    `<div class="row py-5">
        <div class="col-4">
            <img class="w-100" src="${shopItem.imageUrl}" alt="${shopItem.description}">
        </div>
        <div class="col-8">
            <h1>${shopItem.name}</h1>
            <p>${shopItem.description}</p>
            <div>${shopItem.getParsedPrice()}</div>
            <form id="formAddBasket" action="" >

                <label for="quantity" aria-label="Quantité : ">Quantité : </label>
                <select name="quantity" class="form-select mb-3 w-auto" id="quantity" aria-label="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <label for="version" aria-label="Version : ">Version : </label>
                <select name="version" class="form-select mb-3 w-auto" name="version">${optionVersionHTML}</select>

                <button type="submit" id="submit" data-id="${shopItem._id}" class="btn btn-warning">Ajouter au panier</button>
            
            </form>
        </div>
    </div>`
    return shopItem;
})
.then(function(shopItem) {
    let submitButton = document.getElementById('submit');
    let id = submitButton.dataset.id;

    submitButton.addEventListener('click',e => {
        e.preventDefault();  

        new ItemBasketManager().addItem(
            {
                id : id,
                quantity : parseInt(document.querySelector('select[name="quantity"]').value),
                version : parseInt(document.querySelector('select[name="version"]').value),
                price : shopItem.price
            }
        );
        
        console.log(JSON.parse(localStorage.getItem('itemListBasket')))

    },false);
})
.catch(function($error){
    alert($error)
    console.error($error)
})






