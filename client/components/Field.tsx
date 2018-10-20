import autobind from "autobind-decorator";
import * as _ from "lodash";
import { action, observable } from "mobx";
import { observer } from "mobx-react/native";
import { Body, Input, Item, Label, ListItem, Right } from "native-base";
import * as React from "react";
import { Component } from "react";

interface FieldProps {
  label: string;
  defaultValue?: string;
  last?: boolean;
  autoCorrect?: boolean;
  autoCapitalize?: string;
  keyboardType?: string;
  inverse?: boolean;
  right?: () => any;
  onChange?: any;
  secureTextEntry?: boolean;
  returnKeyType?: string;
  onSubmitEditing?: any;
  disabled:boolean
}

@observer
export default class Field extends Component {

  public props: FieldProps;
  
  @observable
  private value: string;

  public componentWillMount() {
    this.setValue(this.props.defaultValue || "");
  }

  public render() {
    const { label, last, inverse, defaultValue, right,disabled } = this.props;
    const style = inverse ? { color: "black",fontSize:20 } : {};
    const itemStyle = inverse ? { borderColor: "black" } : {};
    const keysToFilter = ["right", "defaultValue", "inverse", "label", "last", "onChange"];
    const props = _.pickBy(this.props, (val, key) => keysToFilter.indexOf(key) === -1);
    const value: any = this.value;
    return (
      <ListItem {...{ last }} style={itemStyle}>
        <Body>
          
            <Label {...{ style }}>{label}</Label>
            <Input disabled={disabled} onChangeText={this.setValue} {...{ value, style }} {...props} />
          
        </Body>{right && <Right>{right()}</Right>}
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
