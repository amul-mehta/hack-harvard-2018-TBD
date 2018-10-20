import autobind from "autobind-decorator";
import * as _ from "lodash";
import { View, ListView, StyleSheet, Text } from 'react-native';
import { action, observable } from "mobx";
import { observer } from "mobx-react/native";
import { Body, Input, Item, Label, ListItem, Right } from "native-base";
import * as React from "react";
import { Component } from "react";


interface ListViewProps {
  value: string;
  defaultValue?: string;
  onChange?: any;
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
    const itemStyle = { borderColor: "black" };
    const labelcolor = { color: "black" };
    const { value } = this.props;
    return (
      <ListItem style={itemStyle}>
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