import { computed, observable } from "mobx";
import { eventinfo, locationInfo } from '../addEvent/EventStore';


export interface user_response {
  username: string,
  response: any
}

export interface eventDetails {
  _id: string;
  name: string;
  location: locationInfo;
  date: string;
  host_name?: string;
  attendees?:user_response[];
  attending?: boolean;
}


export default class HomeStore {

    @observable
    private _loading: boolean = false;
    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    @observable
    private _eventList: eventDetails[] = [];
    @computed get eventList(): eventDetails[] { return this._eventList; }
    set eventList(eventList: eventDetails[]) { this._eventList = eventList; }

    @observable
    private _expiredEventList: eventDetails[] =[];
    @computed
    get expiredEventList():eventDetails[] {
      return this.eventList.filter(event => new Date(event.date) < new Date());
    }

    public async getEventList(): Promise<any> {
        this.loading = true;
        const username = 'aly';
        try {
    
            const url = `http://hackparty.azurewebsites.net/api/party/find/${username}`;
    
            let response = await fetch(url, {
              method: 'GET',
              headers: {
                'Accept':'application/json',
                'Content-type': 'application/json'
              }
            })
            let responseJson = await response.json();
            this.eventList = responseJson;
            return Promise.resolve(responseJson);
          }          
         catch (e) {
          this.loading = false;
          throw e;
        }
      }
}
