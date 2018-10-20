
import { computed, observable } from "mobx";

export interface userinfo{

  firtname:String,
  lastname:String,
  username:String,
  password:String,
  phone:String,
}

export default class SignUpStore {

  @observable
  private _loading: boolean = false;
  @computed get loading(): boolean { return this._loading; }
  set loading(loading: boolean) { this._loading = loading; }

  private dummy: userinfo = { firtname:"" , lastname:"",username:"",password:"",phone:""};

  @observable
  private _userInfo: userinfo = { firtname:"" , lastname:"",username:"",password:"",phone:""};
  @computed get userinfo(): userinfo { return this._userInfo; }
  set userinfo(userinfotemp: userinfo) { this._userInfo = userinfotemp; }


  public async signIn(): Promise<void> {
    this.loading = true;
    try {
      if (this.userinfo === this.dummy) {
        throw new Error("Please provide name");
      }
      /*const user = new User() // await Firebase.auth.createUserWithEmailAndPassword(email, password);
      await user.updateProfile({ displayName: name });
      await Firebase.setDefaultUserIfEmpty(user);*/
      this.loading = false;

      throw new Error("Please provide name: " + this.userinfo.firtname);
    } catch (e) {
      this.loading = false;
      throw e;
    }
  }
}
