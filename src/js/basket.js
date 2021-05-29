import config from '../../src/js/config.js';
export default class Basket {

    listProduct = [];

    constructor(listProduct){
        this.listProduct = listProduct;
    }

    add(product){
        if(!this.exist(product) ){
            this.listProduct.push(product);
            this.saveInStorage();
        } 
        else{
            let index = this.getIndex(product); 
            this.update(index, { quantity : this.listProduct[index].quantity + product.quantity })
        }  
    }

    update(index, changes){
        this.listProduct[index] = Object.assign(this.listProduct[index],changes );
        this.saveInStorage();
    }

    remove(index){
        this.listProduct.splice(index,1);
        this.saveInStorage();
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

    saveInStorage(){
        localStorage.setItem(config.storageName.basket, JSON.stringify(this.listProduct));
    }

    areAllSelected(){
        let allSelected = true;
        for (const product of this.listProduct) allSelected &= product.selected;
        return allSelected;
    }

    areAllNotSelected(){
        let allNotSelected = true;
        for (const product of this.listProduct) allNotSelected &= !product.selected;
        return allNotSelected;
    }

    getSelectedTotal(){
        return this.listProduct.reduce((accumulator, product) => { 
            let productTotal = (product.selected) ? product.getTotal() : 0 ;
            return accumulator += productTotal; 
        }, 0);
    }

    getFormatedSelectedTotal(){
        return new Intl.NumberFormat( 
            'fr-FR', { style: 'currency', currency: 'EUR' }
        ).format(
            (this.getSelectedTotal() / 100).toFixed()
        );
    }

}