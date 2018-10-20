import autobind from "autobind-decorator";
import { observer } from "mobx-react/native";
import { Button, Container, H1, Spinner, Text , Label, Header, Body, Title, Footer, Right} from "native-base";
import * as React from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { List} from "../../components";
import {eventinfo, EventStore} from "../addEvent/EventStore";

@observer
export default class Home extends React.Component {

  initialArr : eventinfo[] = [{name:"Pankti's Party",location:"Havana Club",date:new Date(), Invite:[]},
                              {name:"Amul's Party",location:"Havana Club",date:new Date(), Invite:[]},
                              {name:"Aly's Party",location:"Havana Club",date:new Date(),Invite:[]}];

  public props: {
    navigation: any;
  };

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
           { this.initialArr.map(value => {
             return (
               <List value={value.name}></List>
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

  }