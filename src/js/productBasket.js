import Product from './product.js';
export default class ProductBasket extends Product{

    quantity = '';
    version = '';
    selected = true;

    constructor(ProductBasket){
        super({
            _id           : ProductBasket._id,
            name          : ProductBasket.name,
            description   : ProductBasket.description,
            price         : ProductBasket.price,
            imageUrl      : ProductBasket.imageUrl,
        });
        this.quantity   = ProductBasket.quantity;
        this.version    = ProductBasket.version;
        this.selected   = ProductBasket.selected;
    }
    
    getTotal(){
        return this.price * this.quantity;
    }

}