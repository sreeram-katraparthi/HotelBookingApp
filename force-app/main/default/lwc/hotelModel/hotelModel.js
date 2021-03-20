import { LightningElement, api } from 'lwc';
import BOOKING_OBJECT from '@salesforce/schema/Room_Booking__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 
export default class ModalCarRental extends LightningElement {
    objectApiName = BOOKING_OBJECT;
    
    @api hotelobject;
   
 
    @api status;
 
    @api show(){
        this.status= true;
    }
 
    closeModal(){
        this.status = false;
    }
 
    onSubmitHandler(event){
        event.preventDefault();
 
        const fields = event.detail.fields;
        fields.Hotel__c = this.hotelobject.Id;
       
        this.template.querySelector('lightning-record-edit-form').submit(fields);
         
        this.status = false;
    }
 
    handleSuccess(event){
        const evt = new ShowToastEvent({
            title: 'Hurray!',
            message: 'Hotel booked successfully from ',
            variant : 'success',
            mode: 'sticky'
        });
        this.dispatchEvent(evt);
    }
}