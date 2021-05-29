export default class Basket {

    listProduct = [];

    constructor(listProduct){
        this.listProduct = listProduct;
    }

    add(product){
        if(!this.exist(product) ) this.listProduct.push(product);
        else this.update(this.getIndex(product), product)
    }

    update(index, product){
        this.listProduct[index].quantity += product.quantity;
    }

    exist(product){
        return this.listProduct.map(product => this.getIdentify(product)).includes(this.getIdentify(product))
    }

    getIdentify(product){
        return JSON.stringify({ id : product._id, version : product.version });
    }

    getIndex(product){
        return this.listProduct.findIndex(p => this.getIdentify(p) == this.getIdentify(product) );
    }


    getTotal(){
        return this.listProduct.reduce(accumulator, product => accumulator += product.getTotal(), 0);
    }

    getFormatedTotal(){
        return new Intl.NumberFormat( 
            'fr-FR', { style: 'currency', currency: 'EUR' }
        ).format(
            (this.getTotal() / 100).toFixed()
        );
    }



}