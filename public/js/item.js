class Item {
    constructor(jsonItem){
        Object.assign(this, jsonItem);
    }

    getParsedPrice(){
        let floatPrice = (this.price/100).toFixed(2);
        return new Intl.NumberFormat( 'fr-FR', { style: 'currency', currency: 'EUR' }).format(floatPrice);
    }
}