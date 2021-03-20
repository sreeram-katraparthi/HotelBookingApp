import { api, LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi'
import Hotel_OBJECT from '@salesforce/schema/Hotels__c';
import { publish, MessageContext } from 'lightning/messageService';
import FILTER_MESSAGE from '@salesforce/messageChannel/filterHotelMessage__c';
 
export default class CarSearch extends LightningElement {
    @api location;
    @api rating;
    @api type;
    
 
    locationoptions;
    ratingoptions;
    typeoptions;
 
    @wire(getObjectInfo, { objectApiName: Hotel_OBJECT })
    objectInfo;
 
    @wire(getPicklistValuesByRecordType, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        objectApiName: Hotel_OBJECT
    })
    wiredRecordtypeValues({ data, error }) {
        if (data) {
 
            this.locationoptions = data.picklistFieldValues.Location__c.values;
            this.ratingoptions = data.picklistFieldValues.Rating__c.values;
            this.typeoptions = data.picklistFieldValues.Customer_Type__c.values;
 
        }
        if (error) {
            console.log(error);
        }
    }
 
    handleLocationChange(event){
        this.location = event.target.value;
    }
    handleRatingChange(event){
        this.rating = event.target.value;
    }
    handlTypeChange(event){
        this.type = event.target.value;
    }
   
 
    @wire(MessageContext)
    messageContext;
 
    showHotels(){
        const message = {
            location : this.location,
            rating : this.rating,
            type : this.type
            
        };
        
        publish(this.messageContext, FILTER_MESSAGE, message);
        console.log("Message is being published succesfully");
    }
}