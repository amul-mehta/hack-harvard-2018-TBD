
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

  public login(): Promise<Boolean> {
    this.loading = true;
    try {
      if (this.email === "") {
        throw new Error("Please provide email address.");
      }
      if (this.password === "") {
        throw new Error("Please provide password.");
        
      }

      if(this.email === "hello" && this.password === "hello"){
        this.loading = false;
        return Promise.resolve(true);
      }
      this.loading = false;
      
      // await Firebase.auth.signInWithEmailAndPassword(email, password);
      return Promise.resolve(false);
      
    } catch (e) {
      this.loading = false;
      throw e;
    }
  }
}
