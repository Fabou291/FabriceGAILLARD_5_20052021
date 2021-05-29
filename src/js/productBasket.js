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
            lenses        : ProductBasket.lenses,
        });
        this.quantity   = parseInt(ProductBasket.quantity);
        this.version    = parseInt(ProductBasket.version);
        this.selected   = ProductBasket.selected;
    }
    
    getTotal(){
        return this.price * this.quantity;
    }

}