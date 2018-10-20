import { computed, observable } from "mobx";
import { eventinfo } from '../addEvent/EventStore';

export default class HomeStore {

    @observable
    private _loading: boolean = false;
    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    @observable
    private _eventList: eventinfo[] = [];
    @computed get eventList(): eventinfo[] { return this._eventList; }
    set eventList(eventList: eventinfo[]) { this._eventList = eventList; }

    public async getEventList(): Promise<any> {
        this.loading = true;
        try {
    
            const url = `http://hackparty.azurewebsites.net/api/user/login`;
    
            let response = await fetch(url, {
              method: 'GET',
              headers: {
                'Accept':'application/json',
                'Content-type': 'application/json'
              }
            })
            let responseJson = await response.json();
            return Promise.resolve(responseJson);
          }          
         catch (e) {
          this.loading = false;
          throw e;
        }
      }
}
