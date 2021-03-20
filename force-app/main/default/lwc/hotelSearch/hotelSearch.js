import { api, LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import FILTER_MESSAGE from '@salesforce/messageChannel/filterHotelMessage__c';
import filteredHotelList from '@salesforce/apex/hotelControler.filteredHotelList';
 
export default class CarSearchList extends LightningElement {
    location='';
    rating='';
    type='';
   
    isOpen = false;
 
    @api
    searchData;
    error;
 
    @api
    hotelObject;
 
    @wire(MessageContext)
    messageContext;
 
    connectedCallback(){
        console.log('Inside connectedCallback');
        this.subscribeMessageChannel();
    }
 
    subscribeMessageChannel(){
        subscribe(this.messageContext, FILTER_MESSAGE, (result) => this.handleResult(result));
        console.log('Message Subscribed');
    }
 
    handleResult(result){
        if(result.location != undefined){
            this.location = result.location;
        }
        if(result.rating != undefined){
            this.rating = result.rating;
        }
        if(result.type != undefined){
            this.type = result.type;
        }
       
        console.log('Value stored');
    }
 
    @wire(filteredHotelList, {
        location : '$location',
        rating : '$rating',
        type : '$type'
        
    }) 
    wireddata({error, data}){
        if(data){
            this.searchData = data;
            this.error = undefined;
        } else if (error){
            this.searchData = undefined;
            this.error = error;
            console.log('Error is found' , error);
        }
    }
 
    handleBookingEvent(event){
        this.hotelObject = event.detail;
        this.isOpen = true;
 
        const modal = this.template.querySelector('c-hotel-Model');
        modal.show();
    }
}