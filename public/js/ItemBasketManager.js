const LocalStorageBasketName = 'itemListBasket';

/**
 * @class ItemBasketManager
 * @classdesc Manage list of object item basket
 * 
 * example of an item :
 *  { 
 *      id : {integer}, 
 *      quantity : {integer},
 *      version : {integer}
 *  }
 */
class ItemBasketManager {
    
    itemList = [];
    /**
     * @param {string | null} itemStorage 
     */
    constructor(){
        let itemStorage = localStorage.getItem(LocalStorageBasketName);
        if(itemStorage !== null) this.itemList = JSON.parse(itemStorage);

        this.saveInLocalStorage();
    }
    

    saveInLocalStorage(){
        localStorage.setItem(LocalStorageBasketName, JSON.stringify(this.itemList));
    }


    /**
     * @param {object} item 
     */
    addItem(item){
        let index = this.getIndexItem(item);
        if(index === -1) this.itemList.push(item);
        else this.updateItemQuantity(index, item.quantity + this.itemList[index].quantity);

        this.saveInLocalStorage();
    }

    /**
     * @param {integer} index 
     * @param {integer} quantity 
     */
    updateItemQuantity(index, quantity){
        this.itemList[index].quantity = quantity;

        this.saveInLocalStorage();
    }

    /**
     * @param {object} item 
     */
    removeItem(item){
        this.itemList.splice(this.getIndexItem(item),1);
        
        this.saveInLocalStorage();
    }

    /**
     * @param {object} item 
     */
    getIndexItem(item){
        return this.itemList.findIndex( element => (element.id == item.id && element.version == item.version ) )
    }

}


