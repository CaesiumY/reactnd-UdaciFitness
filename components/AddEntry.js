import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciStepper from "./UdaciStepper";
import DateHeader from "./DateHeader";
import TextButton from "./TextButton";
import { submitEntry, removeEntry } from "../utils/api";

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState((state) => {
      const count = state[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count,
      };
    });
  };

  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step;

      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      };
    });
  };

  slide = (metric, value) => {
    this.setState({
      [metric]: value,
    });
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });

    // Update Redux

    // Route to Home

    // save to "DB"
    submitEntry(entry, key);

    // claer local notification
  };

  reset = () => {
    const key = timeToString();

    // Update Redux

    // Route to Home

    // Update "DB"
    removeEntry(key);
  };

  render() {
    const metaInfo = getMetricMetaInfo();

    if (this.state.alreadyLogged) {
      return (
        <View>
          <Ionicons name="md-happy" size={100} />
          <Text>You already logged you information for today.</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      );
    }

    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()}></DateHeader>
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
              {getIcon()}
              {type === "slider" ? (
                <UdaciSlider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest}
                ></UdaciSlider>
              ) : (
                <UdaciStepper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                ></UdaciStepper>
              )}
            </View>
          );
        })}
        <TouchableOpacity onPress={this.submit}>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
