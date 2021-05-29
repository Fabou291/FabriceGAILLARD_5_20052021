import config from '../../src/js/config.js';
import Product from '../../src/js/product.js';


/*async function getTemplate(url){
    let response = await fetch(url);
    if(!response.ok) throw "Une erreur est survenue";

    return await response.text() ;
}
let card = await getTemplate('../_templates/_indexCard.html');*/


fetch(config.serverPath)
.then(response => {
    if(!response.ok) throw "Une erreur est survenue";
    return response.json();
})
.then(listProduct => {
    listProduct.forEach(JSONproduct => {
        let product = new Product(JSONproduct);
        document.getElementById('products').innerHTML +=  
        `<div class="col-12 ">
            <div class="card-item">
                <div class="row py-5 border-bottom">
                    <div class="col-3">
                        <a href="${'../shop-item/shop-item.html' + '?_id='  + product._id}"><img class="card-item__thumb" src="${product.imageUrl}"  alt="${product.description}"></a>
                    </div>
                    <div class="col-8 ps-3">
                        <h3 class="card-item__title fs-5 "><a href="${'../shop-item/shop-item.html' + '?_id='  + product._id}">${product.name}</a></h5>
                        <span class="fs-4">${product.getFormatedPrice()}</span>
                        <p class="card-text">${product.description}</p>
                        <a href="${'../shop-item/shop-item.html'  + '?_id='  + product._id}" class="btn btn-sm btn-warning rounded-3">en savoir plus</a>
                    </div>
                </div>
            </div>                   
        </div>`;
    });
})
.catch(e => console.error(e)) 
  