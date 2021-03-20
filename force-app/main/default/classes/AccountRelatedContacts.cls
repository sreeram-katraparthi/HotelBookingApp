public with sharing class AccountRelatedContacts {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id searchKey){
        try {
            return [select Id,Name,Title,Phone,Email from Contact where accountId =:searchKey];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}