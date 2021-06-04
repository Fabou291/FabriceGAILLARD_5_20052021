import Product from './product.js';
/**
 * @class ProductBasket
 * @description Représente un Produit stocké dans le Panier
 */
export default class ProductBasket extends Product{

    quantity    = 0;
    version     = 0;
    selected    = true;

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
            lenses        : ProductBasket.lenses
        });

        if(!this.isValidProductBasket(ProductBasket)) throw "L'objet passé en argument au constructeur de la classe ProductBasket n'est pas correct";

        this.quantity   = ProductBasket.quantity;
        this.version    = ProductBasket.version;
        this.selected   = ProductBasket.selected;
    }
    
    /**
     * @method isValid
     * @description Vérifie si l'objet passé correspond aux attentes. (Renvoie true ou false)
     * @param {Object} product 
     * @returns {bool}
     */
     isValidProductBasket(ProductBasket){
        if(!(typeof ProductBasket === 'object' ) || ProductBasket === null ) return false;
        return (    typeof ProductBasket.quantity        === 'number' &&
                    typeof ProductBasket.version         === 'number' &&
                    typeof ProductBasket.selected        === 'boolean' 
                ); 
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