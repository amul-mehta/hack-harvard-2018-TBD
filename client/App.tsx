import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, DrawerNavigator} from "react-navigation";
import {Login} from "./screens/login"
import {SignUp} from "./screens/sign-up"
import {Home} from "./screens/home"

import {AddEvent} from "./screens/addEvent"
import {action} from "mobx";
import {observer, Provider} from "mobx-react/native";
import {
  Notifications,
} from 'expo';
import Expo from 'expo';
import {PartyLanding} from './screens/partyLanding';


@observer
export default class App extends React.Component<{}> {

        state = {
          notification:{}
        };
        
        private _notificationSubscription:any;

      componentDidMount() {
      // Handle notifications that are received or selected while the app
      // is open. If the app was closed and then opened by tapping the
      // notification (rather than just tapping the app icon to open it),
      // this function will fire on the next tick after the app starts
      // with the notification data.
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
      }

      @action
      _handleNotification = (notification) => {
      this.setState({notification: notification});
      };
  
  render() {
    
    const onNavigationStateChange = () => undefined;
        
        return <Provider>
                {
                  <PrivateNavigator {...{onNavigationStateChange}} />
                }
        </Provider>
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
    Home: { screen: Home },
    SignUp: { screen: SignUp },
    AddEvent:{screen:AddEvent},
    PartyLanding: {screen:PartyLanding}

});