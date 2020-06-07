import React from "react";
import { View, StyleSheet } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { white, red, orange, lightPurp, pink, blue } from "./colors";
import AsyncStorage from "@react-native-community/async-storage";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "UdaciFitness:notification";

// utils/helpers.js

export function isBetween(num, x, y) {
  if (num >= x && num <= y) {
    return true;
  }

  return false;
}

export function calculateDirection(heading) {
  let direction = "";

  if (isBetween(heading, 0, 22.5)) {
    direction = "North";
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = "North East";
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = "East";
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = "South East";
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = "South";
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = "South West";
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = "West";
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = "North West";
  } else if (isBetween(heading, 337.5, 360)) {
    direction = "North";
  } else {
    direction = "Calculating";
  }

  return direction;
}

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split("T")[0];
}

const style = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    width: 50,
    height: 50,
  },
});

export function getMetricMetaInfo(metric) {
  const info = {
    run: {
      displayName: "Run",
      max: 50,
      unit: "miles",
      step: 1,
      type: "steppers",
      getIcon() {
        return (
          <View style={[style.iconContainer, { backgroundColor: red }]}>
            <MaterialIcons name="directions-run" size={35} color={white} />
          </View>
        );
      },
    },
    bike: {
      displayName: "Bike",
      max: 100,
      unit: "miles",
      step: 1,
      type: "steppers",
      getIcon() {
        return (
          <View style={[style.iconContainer, { backgroundColor: orange }]}>
            <MaterialCommunityIcons name="bike" size={32} color={white} />
          </View>
        );
      },
    },
    swim: {
      displayName: "Swim",
      max: 9900,
      unit: "meters",
      step: 100,
      type: "steppers",
      getIcon() {
        return (
          <View style={[style.iconContainer, { backgroundColor: blue }]}>
            <MaterialCommunityIcons name="swim" size={35} color={white} />
          </View>
        );
      },
    },
    sleep: {
      displayName: "Sleep",
      max: 24,
      unit: "hours",
      step: 1,
      type: "slider",
      getIcon() {
        return (
          <View style={[style.iconContainer, { backgroundColor: lightPurp }]}>
            <FontAwesome name="bed" size={30} color={white} />
          </View>
        );
      },
    },
    eat: {
      displayName: "Eat",
      max: 10,
      unit: "rating",
      step: 1,
      type: "slider",
      getIcon() {
        return (
          <View style={[style.iconContainer, { backgroundColor: pink }]}>
            <MaterialCommunityIcons name="food" size={35} color={white} />
          </View>
        );
      },
    },
  };

  return typeof metric === "undefined" ? info : info[metric];
}

export function getDailyReminderValue() {
  return {
    today: "🖐 Don't forget to log your data today!",
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Log your stats!",
    body: "👋 Don't forget to log your stats for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        // FIXME - no asking popups need to be fix
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            })
              .then(() => {
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              })
              .catch((e) => {
                console.warn("error in set:", e);
              });
          }
        });
      }
    });
}
