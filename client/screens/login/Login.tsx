import autobind from "autobind-decorator";
import { observer } from "mobx-react/native";
import { Button, Container, H1, Spinner, Text } from "native-base";
import * as React from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { Field, Images, Small, WindowDimensions } from "../../components";
import LoginStore from "./LoginStore";
import Mark from "./Mark";

@observer
export default class Login extends React.Component {

  public props: {
    navigation: any;
  };

  private store = new LoginStore();

  public render() {
    return (
      
          <ScrollView contentContainerStyle={style.content}>
            <KeyboardAvoidingView behavior="position">
              
              <View style={style.blur}>
                <Field
                disabled={false}
                  label="Email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  onChange={this.onEmailChanged}
                  inverse
                />
                <Field
                disabled={false}
                  label="Password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="go"
                  onChange={this.onPasswordChanged}
                  onSubmitEditing={this.signIn}
                  last
                  inverse
                />
                <View>
                  <View>
                    <Button primary full onPress={this.signIn}>
                      {this.store.loading ? <Spinner color="white" /> : <Text>Sign In</Text>}
                    </Button>
                  </View>
                  <View>
                    <Button transparent full onPress={this.signUp}>
                      <Small>Don't have an account? Sign Up</Small>
                    </Button>
                  </View>
                  <View>
                    <Button transparent full onPress={this.forgotPassword}>
                      <Small>Forgot password?</Small>
                    </Button>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        
    );
  }

  @autobind
  private signIn() {

      try{
        this.store.login().then((x) => {
            this.props.navigation.navigate("Home");
        });
      }
    catch(e){
      alert(e);
    }
  }


  @autobind
  private signUp() {
    this.props.navigation.navigate("SignUp");
  }

  @autobind
  private forgotPassword() {
    this.props.navigation.navigate("ForgotPassword");
  }
  @autobind
  private onEmailChanged(email: string): void {
    this.store.email = email;
  }
  @autobind
  private onPasswordChanged(password: string): void {
    this.store.password = password;
  }
}

const style = StyleSheet.create({
  blur: {
    backgroundColor: "rgba(255, 255, 255, .2)",
  },
  content: {
    justifyContent: "flex-end",
  },
  img: {
    resizeMode: "cover",
    ...WindowDimensions,
  },
  logo: {
    alignSelf: "center",
    // marginBottom: variables.contentPadding * 2
  },
  title: {
    // marginTop: variables.contentPadding * 2,
    color: "white",
    textAlign: "center",
  },
});
