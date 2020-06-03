import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DateHeader from "./DateHeader";
import { gray } from "../utils/colors";
import { getMetricMetaInfo } from "../utils/helpers";

const MetricCard = ({ date, metrics }) => {
  return (
    <View>
      {date && <DateHeader date={date} />}

      {Object.keys(metrics).map((metric) => {
        const { displayName, unit, getIcon } = getMetricMetaInfo(metric);

        return (
          <View style={styles.metric} key={metric}>
            {getIcon()}
            <View>
              <Text style={{ fontSize: 20 }}>{displayName}</Text>
              <Text style={{ fontSize: 16, color: gray }}>
                {metrics[metric]} {unit}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default MetricCard;

const styles = StyleSheet.create({
  metric: {
    flexDirection: "row",
    marginTop: 12,
  },
});
