import autobind from "autobind-decorator";
import * as _ from "lodash";
import { View, ListView, StyleSheet, Text } from 'react-native';
import { action, observable } from "mobx";
import { observer } from "mobx-react/native";
import { Body, Input, Item, Label, ListItem, Right } from "native-base";
import * as React from "react";
import { Component } from "react";


interface ListViewProps {
  id?: string
  value: string;
  defaultValue?: string;
  onChange?: any;
  attending?:boolean;
  onClick?(id:any):void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});


@observer
export default class List extends Component {

  public props: ListViewProps;

  @observable
  private value: string;

  public componentWillMount() {
    this.setValue(this.props.defaultValue || "");
  }

  

  render() {
    console.log(this.props.attending);
    const itemStyle = { borderColor: "black" }
    const labelcolor = this.props.attending ?{ color: "black" }: {color: "red"};
    const { value } = this.props;
    return (
      <ListItem onPress={this.props.onClick} style={itemStyle}>
        <Body>
            <Label style={labelcolor}>{value}</Label>
        </Body>
      </ListItem>
    );
  }

  @autobind @action
  private setValue(value: string) {
    const { onChange } = this.props;
    this.value = value;
    if (onChange) {
      onChange(value);
    }
  }
}