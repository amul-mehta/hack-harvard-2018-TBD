import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, DrawerNavigator} from "react-navigation";
import {Login} from "./screens/login"
import {SignUp} from "./screens/sign-up"
import {observable, computed} from "mobx";
import {observer, Provider} from "mobx-react/native";

@observer
export default class App extends React.Component<{}> {
  render() {
    
    const onNavigationStateChange = () => undefined;
        return <Provider>
                {
                  <PrivateNavigator {...{onNavigationStateChange}} />
                }
        </Provider>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const PrivateNavigator = createStackNavigator({
    Login: { screen: Login },
    SignUp: { screen: SignUp },
});
