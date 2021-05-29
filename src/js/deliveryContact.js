export default class DeliveryContact{

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

    constructor(listDeliveryContact){
        Object.assign(this, listDeliveryContact);
    }

    getAdressOneLine(){
        return (this.adressLine2 == '') 
        ? this.adressLine1 
        : [this.adressLine1,this.adressLine2].join(', ');
    }

    getPostObject(){
        return {
            firstName   : this.firstName,
            lastName    : this.firstName,
            adress      : this.getAdressOneLine(),
            city        : this.city,
            email       : email,
        }
    }

}