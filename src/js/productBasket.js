import Product from './product.js';
/**
 * @class ProductBasket
 * @description Représente un Produit stocké dans le Panier
 */
export default class ProductBasket extends Product{

    quantity = '';
    version = '';
    selected = true;

    /**
     * @constructor
     * @param {Object} ProductBasket 
     */
    constructor(ProductBasket){
        super({
            _id           : ProductBasket._id,
            name          : ProductBasket.name,
            description   : ProductBasket.description,
            price         : ProductBasket.price,
            imageUrl      : ProductBasket.imageUrl,
            lenses        : ProductBasket.lenses,
        });
        this.quantity   = parseInt(ProductBasket.quantity);
        this.version    = parseInt(ProductBasket.version);
        this.selected   = ProductBasket.selected;
    }
    
    /**
     * @method getTotal
     * @description Récupère le prix du produit
     * @returns {integer}
     */
    getTotal(){
        return this.price * this.quantity;
    }

    /**
     * @method getNameVersionChoosed
     * @description Récupère le nom de la version du produit choisie
     * @returns {string}
     */
    getNameVersionChoosed(){
        return this.lenses[this.version];
    }

}