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
        this.itemList[index].quantity = parseInt(quantity);

        this.saveInLocalStorage();
    }

    updateSelected(index, isSelected){
        this.itemList[index].selected = isSelected;

        this.saveInLocalStorage();
    }

    /**
     * @param {object} item 
     */
    removeItem(index){
        this.itemList.splice(index,1);
        
        this.saveInLocalStorage();
    }

    /**
     * @param {object} item 
     */
    getIndexItem(item){
        return this.itemList.findIndex( element => (element.id == item.id && element.version == item.version ) )
    }

    getParsedTotal(){
        let floatPrice = this.itemList.reduce((accumulator, item) => accumulator + item.quantity * (item.price/100).toFixed(2), 0 );
        return new Intl.NumberFormat( 'fr-FR', { style: 'currency', currency: 'EUR' }).format(floatPrice);
    }

    isSelected(index){
        return this.itemList[index].selected;
    }

    areAllSelected(){
        let allSelected = true;
        for (let i = 0; i< this.itemList.length; i++) allSelected &= this.isSelected(i);
        return allSelected;
    }

    areAllNotSelected(){
        let allNotSelected = true;
        for (let i = 0; i< this.itemList.length; i++) allNotSelected &= !this.isSelected(i);
        return allNotSelected;
    }


}


