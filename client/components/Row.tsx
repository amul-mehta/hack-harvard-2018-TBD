
import { View, Text, StyleSheet, Image } from 'react-native';
import autobind from "autobind-decorator";
import * as _ from "lodash";
import { action, observable } from "mobx";
import { observer } from "mobx-react/native";
import { Body, Input, Item, Label, ListItem, Right } from "native-base";
import * as React from "react";
import { Component } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

@observer
export default class Row extends Component{

  public render() {
    value:String ;
    return(
      <View style={styles.container}>
    <Text style={styles.text}>
      value
    </Text>
  </View>
    );
  }
}