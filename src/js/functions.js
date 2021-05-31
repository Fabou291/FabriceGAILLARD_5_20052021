let addHeader = function addHeader(){
    document.querySelector('#mainHeader').innerHTML = 
    `
        <div class="container">
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="../../views/index/index.html">Orinoco</a>
                <button class="navbar-toggler navbar-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">S'inscrire</a>
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

let addFooter = function addFooter(){
    document.querySelector('#mainFooter').innerHTML = 
    `
        <div class="container">
            <span class="text-muted">Place sticky footer content here.</span>
        </div>
    `;
}

export {addHeader, addFooter}