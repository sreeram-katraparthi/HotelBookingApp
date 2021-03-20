import { LightningElement, track } from 'lwc';
const QUERY_URL = 'https://api.github.com/search/users?q=';
export default class MiscRestCall extends LightningElement {
    @track searchKey = 'Kumaresan';
    @track profiles;
    @track error;
    handleSearchKeyChange(event) {
        this.searchKey = event.target.value;
        fetch(QUERY_URL + this.searchKey)
            .then(response => {                
                console.log('** respone **'+response);
                if (!response.ok) {
                    this.error = response;
                }
                return response.json();
            })
            .then(jsonResponse => {
                console.log('** jsonRespone **'+jsonResponse);
                this.profiles = jsonResponse;
            })
            .catch(error => {
                console.log('** in error catch **');
                this.profiles = error;
                this.profiles = undefined;
            });
    }
}