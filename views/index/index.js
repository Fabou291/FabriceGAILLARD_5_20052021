let pathServer = "http://localhost:3000/api/cameras/";
let pathPageItem = "../shop-item/shop-item.html?_id=";

fetch(pathServer)
.then(data => data.json())
.then( JsonListItem => {
    listItems = [];
    for (const i in JsonListItem) {
        listItems[i] = new Item(JsonListItem[i]);
    }
    return listItems;
} )
.then(listItems => {
    let nodeItems = document.getElementById('items');
    for (const item of listItems) {
        nodeItems.innerHTML += 
        `<div class="col-12 ">
            <div class="card-item">
                <div class="row py-5 border-bottom">
                    <div class="col-3">
                        <a href="${pathPageItem  + item._id}"><img class="card-item__thumb" src="${item.imageUrl}"  alt="${item.description}"></a>
                    </div>
                    <div class="col-8 ps-3">
                        <h3 class="card-item__title fs-5 "><a href="${pathPageItem  + item._id}">${item.name}</a></h5>
                        <span class="fs-4">${item.getParsedPrice()}</span>
                        <p class="card-text">${item.description}</p>
                        <a href="${pathPageItem  + item._id}" class="btn btn-sm btn-warning rounded-3">en savoir plus</a>
                    </div>
                </div>
            </div>                   
        </div>`
    }
})

/*function getStarsHTML(note){
    let iconName, starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        iconName = (i <= note) ? "star-fill" : "star";
        starsHTML += `<i class="bi bi-${ iconName } text-primary"></i>`;
    }
    return starsHTML;
}*/

