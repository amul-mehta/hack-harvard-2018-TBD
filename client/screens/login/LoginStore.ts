
import { computed, observable } from "mobx";
import * as React from "react";
import { NavigationScreenProp } from "react-navigation";
import autobind from "autobind-decorator";
import { observer } from "mobx-react/native";
import { Body, Button, Container, Header, Icon, Left, Right, Spinner, Title } from "native-base";
import { Component } from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { Field, Images } from "../../components";
import { Permissions, Notifications } from 'expo';


export default class LoginStore {

  @observable
  public props: {
    navigation: any;
  };
  @observable error:String;
  @observable user: any;

  @observable
  private _loading: boolean = false;
  @computed get loading(): boolean { return this._loading; }
  set loading(loading: boolean) { this._loading = loading; }

  @observable
  private _email: string = "";
  @computed get email(): string { return this._email; }
  set email(email: string) { this._email = email; }

  @observable
  private _token: string = "";
  @computed get token(): string { return this._token; }
  set token(token: string) { this._token = token; }

  @observable
  private _password: string = "";
  @computed get password(): string { return this._password; }
  set password(password: string) { this._password = password; }


  public async registerForPushNotification(): Promise<any> {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    return (token) ? Promise.resolve(token): Promise.reject()

  }



  public async login(): Promise<Boolean> {
    this.loading = true;
    try {
      if (this.email === "") {
        throw new Error("Please provide email address.");
      }
      if (this.password === "") {
        throw new Error("Please provide password.");
        
      }

      if(this.email && this.password){
        let token = await this.registerForPushNotification();
        if(token){
          this.token = token;
          console.log(this.token);
        }
        const _loginInfo: loginInfo = { username: this.email,password:this.password, token: this.token};

        const url = `http://hackparty.azurewebsites.net/api/user/login`;


        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept':'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(_loginInfo)
        })
        let responseJson = await response.json();
        console.log(responseJson);
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
      
    } catch (e) {
      this.loading = false;
      throw e;
    }
  }
}

export interface loginInfo{
  username: String,
  password: String,
  token: any
}
