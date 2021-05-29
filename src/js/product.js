export default class Product {

    _id = '';
    name = '';
    price = '';
    description = '';
    imageUrl = '';

    constructor(product){
        Object.assign(this, product);
    }

    

}