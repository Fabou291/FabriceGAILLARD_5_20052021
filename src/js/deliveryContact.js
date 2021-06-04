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
     * @param {Object} deliveryContact 
     */
    constructor(deliveryContact){
        if(!this.isValidDeliveryContact(deliveryContact)) throw "L'objet passé en argument au constructeur de la classe deliveryContact n'est pas correct";
        Object.assign(this, deliveryContact);
    }

    /**
     * @method isValid
     * @description Vérifie si l'objet passé correspond aux attentes. (Renvoie true ou false)
     * @param {Object} product 
     * @returns {bool}
     */
     isValidDeliveryContact(deliveryContact){
        if(!(typeof deliveryContact === 'object' ) || deliveryContact === null ) return false;
        if(deliveryContact.length == 0) return true;
        return (    typeof deliveryContact.firstName           === 'string' &&
                    typeof deliveryContact.lastName            === 'string' &&
                    typeof deliveryContact.adressLine1         === 'string' &&
                    typeof deliveryContact.adressLine2         === 'string' &&
                    typeof deliveryContact.city                === 'string' &&
                    typeof deliveryContact.zipCode             === 'string' &&
                    typeof deliveryContact.phoneNumber         === 'string' &&
                    typeof deliveryContact.email               === 'string' &&
                    typeof deliveryContact.moreInfo            === 'string' &&
                    typeof deliveryContact.secureBuildingCode  === 'string'
                ); 
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
            address     : this.getAdressOneLine(),
            city        : this.city,
            email       : this.email
        }
    }

}