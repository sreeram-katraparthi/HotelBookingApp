import { api, LightningElement } from 'lwc';
 
export default class hotelDetails extends LightningElement {
 
    @api
    hotelbooking;
 
    bookNowEvent(){
        console.log('Event from Child');
        const msg = new CustomEvent('bookingevt', {detail: this.hotelbooking})
        this.dispatchEvent(msg);
    }
}