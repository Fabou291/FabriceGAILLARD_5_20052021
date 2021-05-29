export default class Product {

    _id = '';
    name = '';
    price = '';
    description = '';
    imageUrl = '';
    lenses = '';

    constructor(product){
        Object.assign(this, product);
    }

    /**
     * Retourne le prix au formaté "fr-FR"
     * @returns string parsePrice 
     */
    getFormatedPrice(){
        return new Intl.NumberFormat( 
            'fr-FR', { style: 'currency', currency: 'EUR' }
        ).format(
            (this.price / 100).toFixed()
        );
    }



}