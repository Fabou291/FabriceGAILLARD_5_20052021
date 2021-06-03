/**
 * @function addHeader
 * @description Ajoute le header au sein de la page HTML
 */
function addHeader(){
    document.querySelector('#mainHeader').innerHTML = 
    `
    <div class="container navbar-dark">
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="../../views/index/index.html">
                <img src="../../public/image/logo2.png" width="110">
            </a>
            <button class="navbar-toggler navbar-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Se connecter</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../../views/basket/basket.html">
                            <i class="bi bi-cart-fill"></i>
                            Panier
                        </a>
                    </li>
                </ul>
            </div>
        </nav>   
    </div>
    `;
}

/**
 * @function addFooter
 * @description Ajoute le footer au sein de la page HTML
 */
function addFooter(){
    document.querySelector('#mainFooter').innerHTML = 
    `
    <div class="container px-5 pt-4">
        <nav>
            <div class="footer__brand h3 text-white pb-3">
                <a href="#" class="text-reset text-decoration-none">
                    <img src="../../public/image/logo2.png" >
                </a>
            </div>
            <div class="d-flex flex-wrap">
                <div class="legal-mention">
                    <div class="legal-mention__title"> Mentions </div>
                    <ul class="legal-mention__list">
                        <li class="legal-mention__list-item"><a href="#">Légal</a> </li>
                        <li class="legal-mention__list-item"><a href="#">Centre de confidentialité</a> </li>
                        <li class="legal-mention__list-item"><a href="#">Protection des données</a> </li>
                        <li class="legal-mention__list-item" ><a href="#">Cookies</a> </li>
                        <li class="legal-mention__list-item"><a href="#">À propos des pubs</a> </li>
                    </ul>
                </div>
                <div class="legal-mention">
                    <div class="legal-mention__title" > Mieux nous connaître </div>
                    <ul class="legal-mention__list">
                        <li class="legal-mention__list-item"><a href="#">A propos d'Orinoco</a> </li>
                        <li class="legal-mention__list-item"><a href="#">Carrières</a> </li>
                        <li class="legal-mention__list-item"><a href="#">Durabilité</a> </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    `;
}

/**
 * @function getDateAWeekLater
 * @description Récupère la date une semaine suivant la date actuel
 * @returns {Date}
 */
function getDateAWeekLater(){
    let date = new Date(Date.now() + (7*24*60*60*1000));
    if(!isAWorkingDay(date)) date = getNextWorkingDay(date);
    return date.toLocaleDateString('fr-FR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
}

/**
 * @function getNextWorkingDay
 * @description Récupère le prochain jour ouvré
 * @param {Date} date 
 * @returns {Date}
 */
function getNextWorkingDay(date){
    if(!isAWorkingDay(date)) return getNextWorkingDay(new Date(date.getTime() + (1*24*60*60*1000)));
    return date;
}

/**
 * @function isAWorkingDay
 * @description Vérifie si le jour fait partie des jour ouvré
 * @param {Date} date 
 * @returns bool
 */
function isAWorkingDay(date){
    return ![6,0].includes(date.getDay());
}

/**
 * @function getTemplateErrorMessage
 * @description Récupère le template du message d'erreur type
 * @param {string} heading 
 * @returns {string}
 */
function getTemplateErrorMessage(heading){
    return `
            <div class="my-5 p-5 bg-white">
                <h1 class="fs-4 fw-bold mb-3">${heading}</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam magni voluptatem cum atque eaque voluptatibus hic porro labore eum iure possimus ab quae impedit voluptates ratione, suscipit sunt ipsum amet!</p>
                <a class="btn btn-outline-dark rounded-pill" href="../index/index.html">Retour à la boutique</a>
            </div>
        `;
}

export {addHeader, addFooter, getDateAWeekLater, getTemplateErrorMessage}