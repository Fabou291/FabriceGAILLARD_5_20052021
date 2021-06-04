import config from '../../src/js/config.js';
import ProductBasket from './productBasket.js';

/**
 * @Class Basket
 * @description Représente le panier de l'utilisateur, 
 * regroupant l'ensemble des produit ajouté
 */
export default class Basket {

    listProduct = [];

    /**
     * @constructor
     * @param {ProductBasket[]} listProduct 
     */
    constructor(listProduct){
        if(!(typeof listProduct === 'object' ) || listProduct === null ) return false;
        if(!this.isValidBasket(listProduct)) throw "L'argument au constructeur de la classe Basket n'est pas correct";
        this.listProduct = listProduct;
    }

    /**
     * @method isValid
     * @description Vérifie si l'array passé en argument est valide
     * @param {Object} product 
     * @returns {bool}
     */
     isValidBasket(listProduct){
        let valid = true;
        if(typeof listProduct !== 'object') return false;
        listProduct.forEach(product => {
            if(!(product instanceof  ProductBasket)) valid = false;
        });
        return valid;
    }


    /**
     * @method add
     * @description Ajoute un produit au panier 
     * @param {ProductBasket} product 
     */
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

    /**
     * @method update
     * @description Met à jours les donné d'un produit déja ajouté au panier 
     * @param {integer} index 
     * @param {Object} changes 
     */
    update(index, changes){
        this.listProduct[index] = Object.assign(this.listProduct[index],changes );
        this.saveInStorage();
    }

    /**
     * @method remove
     * @description Supprime un element de la liste de produit
     * @param {integer} index 
     */
    remove(index){
        this.listProduct.splice(index,1);
        this.saveInStorage();
    }

    /**
     * @method exist
     * @description Vérifie l'existance d'un produit au sein de la liste 
     * @param {ProductBasket} product 
     * @returns {bool}
     */
    exist(product){
        return this.listProduct.map(product => this.getIdentify(product)).includes(this.getIdentify(product))
    }

    /**
     * @method identify
     * @description Récupère les elements permettant d'identifier/distinguer un produit  
     * @param {ProductBasket} product 
     * @returns {string} 
     */
    getIdentify(product){
        return JSON.stringify({ id : product._id, version : product.version });
    }

    /**
     * @method getIndex
     * @description Récupère l'index du produit au sein de la liste 
     * @param {ProductBasket} product 
     * @returns {number}
     */
    getIndex(product){
        return this.listProduct.findIndex(p => this.getIdentify(p) == this.getIdentify(product) );
    }

    /**
     * @method saveInStorage
     * @description Sauvegarde la liste de produit au sein du localStorage
     */
    saveInStorage(){
        localStorage.setItem(config.storageName.basket, JSON.stringify(this.listProduct));
    }

    /**
     * @method areAllSelected
     * @description Vérifie si tous les produits sont sélectionnés 
     * @returns {bool}
     */
    areAllSelected(){
        let allSelected = true;
        for (const product of this.listProduct) allSelected &= product.selected;
        return allSelected;
    }

    /**
     * @method areAllNotSelected
     * @description Vérifie si tous les produits sont insélectionnés  
     * @returns {bool}
     */
    areAllNotSelected(){
        let allNotSelected = true;
        for (const product of this.listProduct) allNotSelected &= !product.selected;
        return allNotSelected;
    }

    /**
     * @method getSelectedProduct
     * @description Retourne tous les produits selectionnés 
     * @returns 
     */
    getSelectedProduct(){
        return this.listProduct.filter(product => product.selected);
    }

    /**
     * @method getSelectedTotal
     * @description Récupère le prix total des produits selectionné 
     * @returns {integer}
     */
    getSelectedTotal(){
        return this.getSelectedProduct().reduce( (accumulator, product) =>  accumulator += product.getTotal() , 0);
    }

    /**
     * @method getFormatedSelectedTotal
     * @description Récupère le prix total formaté des produits selectionnés
     * @returns {string}
     */
    getFormatedSelectedTotal(){
        return new Intl.NumberFormat( 
            'fr-FR', { style: 'currency', currency: 'EUR' }
        ).format(
            (this.getSelectedTotal() / 100).toFixed()
        );
    }

}