/**
 * @Class Product
 * @description Représente un produit
 */
export default class Product {

    _id = '';
    name = '';
    price = '';
    description = '';
    imageUrl = '';
    lenses = '';

    /**
     * @constructor
     * @param {Object} product 
     */
    constructor(product){
        Object.assign(this, product);
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