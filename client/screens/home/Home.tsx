import autobind from "autobind-decorator";
import { observer } from "mobx-react/native";
import { Button, Container, H1, Spinner, Text , Label, Header, Body, Title, Footer, Right} from "native-base";
import * as React from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { List} from "../../components";
import {eventinfo, EventStore} from "../addEvent/EventStore";
import HomeStore from './HomeStore';

@observer
export default class Home extends React.Component {

  private store = new HomeStore();

  public props: {
    navigation: any;
  };


  componentDidMount() {
    this.store.getEventList();
  }

  styles = StyleSheet.create({
  btn : {
    width:'100%' ,
    backgroundColor:'black',
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 0,
  },
  headline: {
    
    
    alignItems:"center",
    justifyContent: 'center',
    color:'white',
    fontSize:30,
  }
});

  public render() {
    
    
    return (
      <View style={{flex: 4}}>
        
          <Header noShadow>
              <Body>
                <Title>Upcoming Events</Title>
              </Body>
            </Header>
          <ScrollView>
          <KeyboardAvoidingView behavior="position">
           { this.store.eventList.map(value => {
             return (
               <List id={value._id}value={value.name} attending={value.attending} onClick={value_id => this.getPartyDetails(value._id)}></List>
             );
          })}
           </KeyboardAvoidingView>

           <Body>
                <Title>Expired Events</Title>
            </Body>

            <KeyboardAvoidingView behavior="position">
           { this.store.expiredEventList.map(value => {
             return (
               <List id={value._id}value={value.name}></List>
             );
          })}
           </KeyboardAvoidingView>
         </ScrollView>
        
         <View>
             <Button info full onPress={this.addEvent}>
                       <Text>Add Event</Text>
                    </Button>
         </View>
       
     </View>
    );
  }

   @autobind
  private addEvent() {
    
    this.props.navigation.navigate("AddEvent");
      
  }

  @autobind
  private getPartyDetails(id: any) {
    this.props.navigation.navigate("PartyLanding", {
    party_id:id
    });
  }

  }