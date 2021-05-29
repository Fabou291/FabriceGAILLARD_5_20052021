export default class Basket {

    listProduct = [];

    constructor(listProduct){
        this.listProduct = listProduct;
    }

    getTotal(){
        return this.listProduct.reduce(accumulator, Product => accumulator += Product.getTotal(), 0);
    }

    getFormatedTotal(){
        return new Intl.NumberFormat( 
            'fr-FR', { style: 'currency', currency: 'EUR' }
        ).format(
            (this.getTotal() / 100).toFixed()
        );
    }

}