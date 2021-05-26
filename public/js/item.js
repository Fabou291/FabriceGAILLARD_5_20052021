class Item {
    constructor(jsonItem){
        Object.assign(this, jsonItem);
    }

    getFloatPrice(){
        return  (this.price/100).toFixed(2);
    }

    getParsedPrice(){
        let floatPrice = this.getFloatPrice();
        return new Intl.NumberFormat( 'fr-FR', { style: 'currency', currency: 'EUR' }).format(floatPrice);
    }
}