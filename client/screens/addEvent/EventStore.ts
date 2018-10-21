
import { computed, observable } from "mobx";

export interface locationInfo {
  name: string,
  lat: string,
  lng: string
}
export interface eventinfo{

  name:string,
  location:locationInfo,
  date:Date,
  host_id?:Int32Array,
  attendees:string[]
}

export class EventStore {

  @observable
  private _loading: boolean = false;
  @computed get loading(): boolean { return this._loading; }
  set loading(loading: boolean) { this._loading = loading; }

  @observable
  private _eventInfo: eventinfo = { name:"" , location: {name:"",lat:"",lng:""},date:new Date(),attendees:[]};
  @computed get eventinfo(): eventinfo { return this._eventInfo; }
  set eventinfo(eventinfotemp: eventinfo) { this._eventInfo = eventinfotemp; }

  @observable
  private _eventcreated: boolean = false;
  @computed get eventcreated(): boolean { return this._eventcreated; }
  set eventcreated(eventinfotemp: boolean) { this._eventcreated = eventinfotemp; }


  public getDateString() : string{
    return "" + this.eventinfo.date;
  }

  public async AddInvite(invitetemp: string): Promise<void>{
    this.eventinfo.attendees.push(invitetemp);
  }

  public async createEvent(): Promise<void> {
    this.loading = true;
    this.eventcreated = true;
    throw new Error("Please provide name: " + this.eventinfo.date);
    
    try {
      if (this.eventinfo.name === "") {
        throw new Error("Please provide name");
      }
      if (this.eventinfo.location === undefined) {
        throw new Error("Please provide location");
      }
      /*const user = new User() // await Firebase.auth.createUserWithEmailAndPassword(email, password);
      await user.updateProfile({ displayName: name });
      await Firebase.setDefaultUserIfEmpty(user);*/
      this.loading = false;
    } catch (e) {
      this.loading = false;
      throw e;
    }
  }

  public async getPartyDetails(params:any): Promise<any> {
    this.loading = true;
    const partyId = params.party_id;
    try {

        const url = `http://hackparty.azurewebsites.net/api/party/find/one/${partyId}`;

        let response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept':'application/json',
            'Content-type': 'application/json'
          }
        })
        let responseJson = await response.json();
        this.attendees = toJS(responseJson.attendees);
        console.log(this.attendees);
        this.eventDetails = responseJson;
        return Promise.resolve(responseJson);
      }          
     catch (e) {
      this.loading = false;
      throw e;
    }
  }
}
