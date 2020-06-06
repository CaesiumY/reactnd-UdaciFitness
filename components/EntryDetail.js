import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import MetricCard from "./MetricCard";
import { white } from "../utils/colors";
import { addEntry } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { removeEntry } from "../utils/api";
import TextButton from "./TextButton";

export class EntryDetail extends Component {
  reset = () => {
    const { goBack, remove, entryId } = this.props;

    remove();
    goBack();
    removeEntry(entryId);
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }

  render() {
    const { metrics } = this.props;
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics}></MetricCard>
        <TextButton onPress={this.reset} style={{ margin: 20 }}>
          RESET
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
});

function mapStateToProps(state, { route }) {
  const { entryId } = route.params;
  return {
    entryId,
    metrics: state[entryId],
  };
}

function mapDispatchToProps(dispatch, { route, navigation }) {
  const { entryId } = route.params;
  return {
    goBack: () => navigation.goBack(),
    remove: () =>
      dispatch(
        addEntry({
          [entryId]:
            timeToString() === entryId ? getDailyReminderValue() : null,
        })
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
