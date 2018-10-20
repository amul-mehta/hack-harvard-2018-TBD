import autobind from "autobind-decorator";
import { observer } from "mobx-react/native";
import { Button, Container, H1, Spinner, Text , Label, Header, Body, Title} from "native-base";
import * as React from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { List} from "../../components";

@observer
export default class Home extends React.Component {

  initialArr = [{key:1,value:"cdcd"},{key:2,value:"cdcdvnkdvn"},{key:3,value:"cdcd"},{key:4,value:"cdcdvnkdvn"}];

  public props: {
    navigation: any;
  };

  public render() {
    
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <Header noShadow>
              <Body>
                <Title>Upcoming Events</Title>
              </Body>
            </Header>
          <View>
           { this.initialArr.map(value => {
             return (
               <List value={value.value}></List>
             );
          })}
         </View>
       </KeyboardAvoidingView>
     </ScrollView>
    );
  }

  }