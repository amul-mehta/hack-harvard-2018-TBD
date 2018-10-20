import autobind from "autobind-decorator";
import { observer} from "mobx-react/native";
import { action } from "mobx";
import { Body, Button, Container, Header,Text,Input, Icon, Left, Right, Spinner, Title } from "native-base";
import * as React from "react";
import { Component } from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, View , DatePickerIOS} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Field, Images, List } from "../../components";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import {EventStore, locationInfo} from "./EventStore";
import { AnyARecord } from 'dns';




@observer
export default class AddEvent extends Component {

  styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 62.5,
    height: 125,
    justifyContent: "center",
    width: 125,
  },
  inputContainer: {
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderTopWidth:1,
  borderBottomWidth:1,
  flex: 1, 
  flexDirection: 'row',
  height:50,
},
input: {
  backgroundColor: '#ffffff',
  paddingLeft: 15,
  paddingRight: 15,
  flex:0.7,  
  height: 40,
  borderColor:'black',
}
});

  public props: {
    navigation: any;
  };

  value:string = "";

  state = {chosenDate:new Date()};

  constructor(props:any) {
    super(props);
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate:any) {
    this.store.eventinfo.date = newDate;
    this.setState({chosenDate: newDate})
  }

  private store = new EventStore();

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
                <Title>Add Event</Title>
              </Body>
              <Right />
            </Header>
            <Field
            disabled={this.store.eventcreated}
              label="Name"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="event name"
              onChange={this.onNameChanged}
            />
           
            <Field
            disabled={this.store.eventcreated}
              label="Location"
              autoCorrect={false}
              autoCapitalize="none"
              onChange={this.onLocationChanged}
            />
            <GooglePlacesAutocomplete
              placeholder='Enter Location'
              minLength={2}
              autoFocus={false}
              returnKeyType={'default'}
              fetchDetails={true}
              onPress={(data = null, details = null) => {
                this.onLocationChanged(data,details.geometry.location)
              }}              
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyCh69ovgVezbPI96xbWE7ZSv_57PTG1CW0',
                language: 'en', // language of the results
                // types: '(cities)' // default: 'geocode'
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth:0
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
              }}
              currentLocation={false}
            />
            {this.store.eventcreated ? 

              <Field
                disabled={true}
                  label="Date"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  defaultValue={this.store.getDateString()}
                  inverse
                />

             :
              <DatePickerIOS
              date={this.state.chosenDate}
              onDateChange={this.setDate}
            />}
            
            <Text>Total Invites:</Text>
            {this.store.eventcreated ? 
              this.store.eventinfo.Invite.map(value1 => {
                 return (
                   <List value = {value1}></List>
                 );
               })
              : 
              <Button primary full onPress={this.createEvent}><Text>Add Event</Text></Button>} 
              {this.store.eventcreated ? <View style={this.styles.inputContainer}>
        <View style={this.styles.input}><Input onChangeText={this.setValue} /></View>
        <View style={{flex:0.3 , height: 120,borderColor:'black'}}><Button info full onPress={this.addInvite}><Text>Add Invite</Text></Button></View>
        </View> : <View></View>}
          </KeyboardAvoidingView>
        </ScrollView >
      </Container >
    );
  }
  @autobind
  private onNameChanged(name: string): void {
    this.store.eventinfo.name = name;
  }
  
  @autobind
  private onLocationChanged(data: any,location: any): void {
    const locationInfo: locationInfo = {
      name: data.name,
      lat: location.lat,
      lng: location.lng
    }
    this.store.eventinfo.location = locationInfo;
  }
  @autobind
  private back() {
    this.props.navigation.goBack();
  }

  @autobind
  private async createEvent(): Promise<void> {
    try {
      await this.store.createEvent();
    } catch (e) {
      alert(e.message);
    }
  }

  @autobind
  private async addInvite() : Promise<void> {
    await this.store.AddInvite(this.value);
  }

  @autobind @action
  private setValue(value: string) {
    this.value = value;
  }
}
