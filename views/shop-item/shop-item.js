import config from '../../src/js/config.js';
import {addHeader, addFooter, getTemplateErrorMessage} from '../../src/js/functions.js';
import Product from '../../src/js/product.js';
import ProductBasket from '../../src/js/productBasket.js';
import Basket from '../../src/js/Basket.js';

let listProductOnStorage = JSON.parse(localStorage.getItem(config.storageName.basket)) || [];
let basket = new Basket( listProductOnStorage.map(product => new ProductBasket(product)) );

/**
 * @function fetchProductById
 * @description Récupére le produit par l'id "_id" 
 * @param {string}
 * @returns Promesse
 */
async function fetchProductById(id){
    let response = await fetch(config.serverPath + id);
    if(!response.ok) throw `_id incorrect` ;
    return await response.json();
}

/**
 * @function setEventAddBasket
 * @description Ajoute l'evenement au bouton submit du formulaire 
 * Permettant de l'ajout d'un produit au panier
 * @param {Product}
 */
function setEventAddBasket(product){
    document.querySelector('#addToBasket').addEventListener('click',function(event){
        event.preventDefault();
        addToBasket(product);
    },false)
}


/**
 * @function addToBasket
 * @description Ajout d'un produit au panier
 * @param {Product}
 */
function addToBasket(product){

    let listNodeSelect = document.querySelectorAll('#quantity, #version');

    let productBasket = new ProductBasket(
        Object.assign(
            {...product},
            [...listNodeSelect].reduce( (accumulator, node) => ({ ...accumulator, [node.id] : parseInt(node.value) }), {selected : true} )
        )
    );

    basket.add(productBasket);

    localStorage.setItem(config.storageName.basket, JSON.stringify(basket.listProduct));
   
    updateModal(productBasket);
    modal.show();
}


/**
 * @function getUrlParam
 * @description Récolte le paramètre demandé
 * @param {string}
 * @returns {string}
 */
function getUrlParam(param){
    let urlParams = new URLSearchParams(window.location.search);
    if(!urlParams.has(param)){
        document.querySelector('#container').innerHTML = getTemplateErrorMessage('Oups il semble que vous n\'ayez pas renseigné de produit pour le voir plus en détail');
        throw new Error(`Aucun ${param} trouvé`);
    } 
    return urlParams.get(param);        
}

/**
 * @function updateModal
 * @description Met à jour les données au sein de la modal 
 * jouant le role de confirmation d'ajout au panier
 * @param {ProductBasket} productBasket 
 */
function updateModal(productBasket){
    document.getElementById('imageProductAdded').innerHTML      = `<img src="${productBasket.imageUrl}" class="card-img-top" >`;
    document.getElementById('titleProductAdded').innerHTML      = `${productBasket.name}`;
    document.getElementById('quantityProductAdded').innerHTML   = `${productBasket.quantity}`;
    document.getElementById('versionProductAdded').innerHTML    = `${productBasket.getNameVersionChoosed()}`;
}

/**
 * @function addProductInnerHTML
 * @description Ajoute le produit demandé au sein du html
 * @param {Product} product 
 */
function addProductInnerHTML(product){
    let htmlOptions = product.lenses.reduce( (accumulator, lens)  => accumulator += `<option value="${product.lenses.indexOf(lens)}">${lens}</option>`, '');
    document.querySelector('#container').innerHTML = 
    `
        <div class="product">
            <div class="product__thumbnail">
                <img src="${product.imageUrl}" alt="${product.description}">
            </div> 
            <div class="product__caption">
                <h1>${product.name}</h1>
                <p>${product.description}</p>
                <div class="mb-3" >${product.getFormatedPrice()}</div>
                <form id="formAddBasket" action="#">
                <label for="quantity" aria-label="Quantité : ">Quantité : </label>
                <select name="quantity" class="form-select mb-3 w-auto" id="quantity" aria-label="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <label for="version" aria-label="Lentille : ">Lentille : </label>
                <select name="version" id="version" class="form-select mb-3 w-auto">${htmlOptions}</select>
                <button type="submit" id="addToBasket" class="btn btn-primary">Ajouter au panier</button>
                </form>
            </div>
        </div>
    `;
}

/**
 * @function addDescriptionProductHTML
 * @description Ajoute la description du produit au sein du html
 */
function addDescriptionProductHTML(){
    document.getElementById('description').innerHTML = 
        `
            <div class="bg-white p-sm-5 p-3">
                <h2 class="fw-bold">Caratéristiques</h2>

            
                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Les points clés</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>24,1 Mpx - Vidéo Full HD</li>
                    <li>Mise au point (AF) Autofocus 9 collimateurs - 6400 ISO</li>
                    <li>Capteur APS-C - Proc. DIGIC 4+</li>
                </ul>
                Le + : Full HD de qualité cinéma, pleins de couleurs, même en conditions de luminosité difficiles              
                </div>



                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Les + de ce modèle</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">Avantages : Processeur DIGIC 9</div>

                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Capteur</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Type : APS-C</li>
                    <li>Technologie : CMOS</li>
                    <li>Résolution (en mégapixels) : 24,1 Mpx</li>
                </ul>              
                </div>


                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Optique</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Sensibilité ISO : 100 - 6400</li>
                    <li>Sensibilité maximale (+ d'infos) : 6400 ISO</li>
                    <li>Vitesse d'obturation : 1/4000 à 30 s</li>
                    <li>Stabilisateur : Sur l'objectif</li>
                    <li>Proc. : DIGIC 4+</li>
                </ul>              
                </div>


                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Objectif</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Focale et Ouverture : f18 - 55 mm F / 3,5 - 5,6</li>
                    <li>Diamètre du filtre : 58 mm</li>
                </ul>              
                </div>


                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Mode de visée</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Couverture du viseur : 95 %</li>
                    <li>Viseur optique (+ d'infos) : Pentamiroir</li>
                    <li>Visée à l'écran (Live View) : Oui</li>
                </ul>              
                </div>


                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Ecran</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Taille de l'écran (diagonale) : 7,5 cm</li>
                    <li>Ecran orientable : Non</li>
                    <li>Ecran tactile : Non</li>
                    <li>Ecran inclinable : Non</li>
                    <li>Couverture : 100 %</li>
                    <li>Angle de vue : 170 °C</li>
                </ul>
                </div>


                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Mise au point</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">Mode: Automatique, Manuel</div>

                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Alimentation</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Type d'alimentation : Batterie</li>
                    <li>Référence de la batterie : LP-E10</li>
                    <li>Autonomie annoncée par le constructeur : 500 prises de vue</li>
                </ul>
                </div>

                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Mémoire</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Carte(s) mémoire(s) compatible(s) : : SD, SDHC, SDXC</li>
                    <li><a href='#'>Consultez notre sélection de cartes mémoires</a></li>
                    <li>Autonomie annoncée par le constructeur : 500 prises de vue</li>
                </ul>
                </div>

                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Flash</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Flash intégré : Oui</li>
                    <li>Nombre de guide pour 100 ISO : 9</li>
                    <li>Détail des modes flash : Automatique, flash manuel (activé/désactivé)</li>
                </ul>
                </div>

                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Modes scène</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Mode Macro</li>
                    <li>Mode Paysage : Créer d'impressionnantes photos panoramiques</li>
                </ul>
                </div>

                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Connectiques</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3"> Sortie HDRMI : Oui </div>

                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Connectivité</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Wi-Fi : Oui</li>
                    <li>NFC (+ d'infos) : Oui</li>
                    <li>Bluetooth (+ d'infos) : Non</li>
                </ul>
                </div>

                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Compatibilité image</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">Formats compatibles : JPEG, DCF, RAW</div>

                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Fichier vidéo</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Vidéo : Full HD</li>
                    <li>Durée maximale des vidéos : 29 minutes</li>
                    <li>Résolution : 1920 x 1080p</li>
                    <li>Format de la vidéo : MOV</li>
                </ul>
                </div>

                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Contenu du carton</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">Licré avec : Notice, Batterie, Chargeur, 1 Objectif(s), carte SD 16 Go</div>

                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Dimensions</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Dimensions l x h x p : 41.5 x 32.6 x 33 cm</li>
                    <li>Poids sans accessoires : 475,00 g</li>
                </ul>
                </div>

                <h3 class="fw-bold fs-5 bg-light py-2 px-3 border">Informations et Services</h3>
                <div class="ps-sm-5 ps-3 p-2 pb-3 mb-3">
                <ul>
                    <li>Durée de la garantie (Pièces et main d'oeuvre pour un produit neuf vendu par Boulanger) : 2 ans</li>
                    <li>Disponibilité des pièces détachées (données fournisseur) : Pendant 5 ans, à compter de la date fin de commercialisation</li>
                </ul>
                </div>

            </div> 
        `;
}


let modal = new bootstrap.Modal(document.getElementById('modalAddBasket'));
addHeader(); addFooter();



fetchProductById(getUrlParam('_id'))
.then(jsonProduct => {
    let product = new Product(jsonProduct);
    addProductInnerHTML(product);

    addDescriptionProductHTML();

    setEventAddBasket(product);

    document.getElementById('title').innerHTML = `${ product.name } - Appareil photo - Orinoco`;

})
.catch(errorMessage => {
    console.log('Je passe : ' + errorMessage)
    switch(errorMessage){
        case '_id incorrect' :
            document.querySelector('#container').innerHTML = getTemplateErrorMessage('Oups le produit demandé n\'éxite pas !');
        break;
        default :
            console.error('erreur : ' + errorMessage);
        break;
    }
})






