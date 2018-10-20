
import { computed, observable } from "mobx";

export interface userinfo{

  first_name:String,
  last_name:String,
  username:String,
  password:String,
  phone:String,
}

export default class SignUpStore {

  @observable
  private _loading: boolean = false;
  @computed get loading(): boolean { return this._loading; }
  set loading(loading: boolean) { this._loading = loading; }

  private dummy: userinfo = { first_name:"" , last_name:"",username:"",password:"",phone:""};

  @observable
  private _userInfo: userinfo = { first_name:"" , last_name:"",username:"",password:"",phone:""};
  @computed get userinfo(): userinfo { return this._userInfo; }
  set userinfo(userinfotemp: userinfo) { this._userInfo = userinfotemp; }


  public async signIn(): Promise<void> {
    this.loading = true;
    const url = `http://hackparty.azurewebsites.net/api/user/create`;

    try {
      if (this.userinfo === this.dummy) {
        throw new Error("Please provide name");
      }
      else{
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept':'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(this.userinfo)
        })
        let responseJson = await response.json();
        console.log(responseJson);
      }
      /*const user = new User() // await Firebase.auth.createUserWithEmailAndPassword(email, password);
      await user.updateProfile({ displayName: name });
      await Firebase.setDefaultUserIfEmpty(user);*/
      this.loading = false;

      throw new Error("Please provide name: " + this.userinfo.first_name);
    } catch (e) {
      this.loading = false;
      throw e;
    }
  }
}
