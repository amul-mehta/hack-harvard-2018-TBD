
import { computed, observable } from "mobx";

export interface eventinfo{

  name:string,
  location:string,
  date:Date,
  id?:Int32Array,
  Invite:string[]
}

export class EventStore {

  @observable
  private _loading: boolean = false;
  @computed get loading(): boolean { return this._loading; }
  set loading(loading: boolean) { this._loading = loading; }

  @observable
  private _eventInfo: eventinfo = { name:"" , location:"",date:new Date(),Invite:[]};
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
    this.eventinfo.Invite.push(invitetemp);
  }

  public async createEvent(): Promise<void> {
    this.loading = true;
    this.eventcreated = true;
    throw new Error("Please provide name: " + this.eventinfo.date);
    
    try {
      if (this.eventinfo.name === "") {
        throw new Error("Please provide name");
      }
      if (this.eventinfo.location === "") {
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
}
