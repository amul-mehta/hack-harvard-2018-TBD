
import { computed, observable } from "mobx";
import * as React from "react";
import { NavigationScreenProp } from "react-navigation";
import autobind from "autobind-decorator";
import { observer } from "mobx-react/native";
import { Body, Button, Container, Header, Icon, Left, Right, Spinner, Title } from "native-base";
import { Component } from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { Field, Images } from "../../components";

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
  private _password: string = "";
  @computed get password(): string { return this._password; }
  set password(password: string) { this._password = password; }

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
        const _loginInfo: loginInfo = { username: this.email,password:this.password};

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
  password: String
}
