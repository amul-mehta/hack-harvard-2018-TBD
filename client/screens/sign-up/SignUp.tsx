import autobind from "autobind-decorator";
import { observer } from "mobx-react/native";
import { Body, Button, Container, Header, Icon, Left, Right, Spinner, Title } from "native-base";
import * as React from "react";
import { Component } from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Field, Images } from "../../components";
import SignUpStore from "./SignUpStore";

@observer
export default class SignUp extends Component {

  public props: {
    navigation: any;
  };

  private store = new SignUpStore();

  public render() {
    return (
      <Container>
        <ScrollView style={{ backgroundColor: "white" }} >
          <KeyboardAvoidingView behavior="position">
            <Header noShadow>
              <Left>
                <Button onPress={this.back} transparent>
                  <Icon name="close" />
                </Button>
              </Left>
              <Body>
                <Title>Sign Up</Title>
              </Body>
              <Right />
            </Header>
            <Field
            disabled={false}
              label="FirstName"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChange={this.onNameChanged}
            />
            <Field
            disabled={false}
              label="LastName"
              autoCorrect={false}
              autoCapitalize="none"
              onChange={this.onLastChanged}
              secureTextEntry
            />
            <Field
              disabled={false}
              label="Username"
              autoCorrect={false}
              autoCapitalize="none"
              onChange={this.onUsernameChanged}
              secureTextEntry
            />
            <Field
            disabled={false}
              label="Password"
              autoCorrect={false}
              autoCapitalize="none"
              onChange={this.onPasswordChanged}
              secureTextEntry
            />
            <Field
            disabled={false}
              label="Phone"
              autoCorrect={false}
              autoCapitalize="none"
              onChange={this.onPhoneChanged}
              secureTextEntry
            />
          </KeyboardAvoidingView>
        </ScrollView >
        <Button primary full onPress={this.signIn}>
          {this.store.loading ? <Spinner color="white" /> : <Icon name="md-checkmark" />}
        </Button>
      </Container >
    );
  }
  @autobind
  private onNameChanged(name: string): void {
    this.store.userinfo.first_name = name;
  }
  @autobind
  private onLastChanged(lastname: string): void {
    this.store.userinfo.last_name = lastname;
  }
  @autobind
  private onUsernameChanged(username: string): void {
    this.store.userinfo.username = username;
  }
  @autobind
  private onPhoneChanged(phone: string): void {
    this.store.userinfo.phone = phone;
  }
  @autobind
  private onPasswordChanged(password: string): void {
    this.store.userinfo.password = password;
  }
  @autobind
  private back() {
    this.props.navigation.goBack();
  }

  @autobind
  private async signIn(): Promise<void> {
    try {
      await this.store.signIn();
    } catch (e) {
      alert(e.message);
    }
  }
}

const style = StyleSheet.create({
  circle: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 62.5,
    height: 125,
    justifyContent: "center",
    width: 125,
  },
});
