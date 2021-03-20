public with sharing class hotelControler {
    public hotelControler() {
 
    }
    @AuraEnabled(cacheable = true)
    public static List<Hotels__c> filteredHotelList(String location, string rating, String type
                                                       ){
 
    if(location == 'None' || location == ''){
        location = '%';
    }
    if(rating == 'None' || rating == ''){
        rating = '%';
    }
    if(type == 'None' || type == ''){
        type = '%';
    } 
    return [SELECT Id, Name, Location__c, Price__c, Rating__c, Customer_Type__c
                        FROM Hotels__c
                        WHERE Id NOT IN 
                        (SELECT Hotel__c 
                          FROM Room_Booking__c
                          )
                        AND Location__c LIKE :location
                        AND Rating__c LIKE :rating
                        AND Customer_Type__c LIKE :type
                        ]; 
    }
}