import { LightningElement, wire, api, track } from 'lwc';
import getContacts from '@salesforce/apex/AccountRelatedContacts.getContacts';

export default class AccountRelatedContacts extends LightningElement {
    @api recordId;
    @track searchKey = '';

    @wire(getContacts, {searchKey : '$searchKey'})
    contacts;

    connectedCallback(){
        this.searchKey = this.recordId;
    }

}