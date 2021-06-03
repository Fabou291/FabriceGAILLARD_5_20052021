/**
 * @Class DeliveryContact
 * @description Représente l'utilisateur 
 * regroupant l'ensemble des informations pour la livraison
 */
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

    /**
     * @constructor
     * @param {Object[]} listDeliveryContact 
     */
    constructor(listDeliveryContact){
        Object.assign(this, listDeliveryContact);
    }

    /**
     * @method getAdressOneLine
     * @description Récupère les 2 lignes représantant l'addresse du client, les fusionne
     * @returns {string}
     */
    getAdressOneLine(){
        return (this.adressLine2 == '') 
        ? this.adressLine1 
        : [this.adressLine1,this.adressLine2].join(', ');
    }

    /**
     * @method getPostObject
     * @description Retourne l'ensemble des elements necessaire à l'API pour la requete 
     * d'envoie du formulaire de prise de contact
     * @returns {Object}
     */
    getPostObject(){
        return {
            firstName   : this.firstName,
            lastName    : this.firstName,
            address      : this.getAdressOneLine(),
            city        : this.city,
            email       : this.email
        }
    }

}