let pathServer = "http://localhost:3000/api/cameras/";

fetch("http://localhost:3000/api/cameras")
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
        `<div class="col-12 p-3">
            <div class="card card-item">
                <div class="row">
                    <div class="col-4">
                        <a href=""><img class="card-item__thumb" src="${item.imageUrl}"  alt="${item.description}"></a>
                    </div>
                    <div class="col-8">
                        <div class="card-body">
                            <h3 class="card-item__title fs-5"><a href="../item/item.html?_id=${item._id}">${item.name}</a></h5>
                            <div>${ getStarsHTML(4) }</div>
                            <span class="fs-5">${item.getParsedPrice()}</span>
                            <p class="card-text">${item.description}</p>
                        </div>
                    </div>
                </div>
            </div>                   
        </div> `
    }
})

function getStarsHTML(note){
    let iconName, starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        iconName = (i <= note) ? "star-fill" : "star";
        starsHTML += `<i class="bi bi-${ iconName }"></i>`;
    }
    return starsHTML;
}

