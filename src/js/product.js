/**
 * @Class Product
 * @description Représente un produit
 */
export default class Product {

    _id         = '';
    name        = '';
    price       = 0;
    description = '';
    imageUrl    = '';
    lenses      = {};

    /**
     * @constructor
     * @param {Object} product 
     */
    constructor(product){
        if(!this.isValidProduct(product)) throw "L'objet passé en argument au constructeur de la classe Product n'est pas correct";
        Object.assign(this, product);
    }

    /**
     * @method isValid
     * @description Vérifie si l'objet passé correspond aux attentes. (Renvoie true ou false)
     * @param {Object} product 
     * @returns {bool}
     */
    isValidProduct(product){
        if(!(typeof product === 'object' ) || product === null ) return false;
        return (    typeof product._id          === 'string' &&
                    typeof product.name         === 'string' &&
                    typeof product.price        === 'number' &&
                    typeof product.description  === 'string' &&
                    typeof product.imageUrl     === 'string' &&
                    typeof product.lenses       === 'object' 
                ); 
    }

    /**
     * @method getFormatedPrice
     * @description Récupère le prix et le formate"
     * @returns {string} 
     */
    getFormatedPrice(){
        return new Intl.NumberFormat( 
            'fr-FR', { style: 'currency', currency: 'EUR' }
        ).format(
            (this.price / 100).toFixed()
        );
    }



}