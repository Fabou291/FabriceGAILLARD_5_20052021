class DeliveryConctact {

    id                  = '';
    firstName           = '';
    lastName            = '';
    adressLine1         = '';
    adressLine2         = '';
    city                = '';
    zipCode             = '';
    phoneNumber         = '';
    email               = '';
    moreInfo            = '';
    secureBuildingCode  = '';

    constructor(DeliveryConctact){
        this.hydrate(DeliveryConctact);
    }

    hydrate(DeliveryConctact){
        Object.assign(this, DeliveryConctact);
    }

    getAdressOneLine(){
        return `${this.adressLine1}, ${this.adressLine2}`;
    }

    get(){
        return {
            'firstName' : this.firstName,
            'lastName' : this.lastName,
            'city' : this.getAdressOneLine(),
            'phoneNumber' : this.getAdressOneLine()
        };
    }



}