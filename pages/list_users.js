import React, { useState, useEffect, createContext, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Button,
  Switch,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const url = "https://randomuser.me/api/?results=20";

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

const UserContext = createContext();
const ThemeContext = createContext();

export default function Themes() {
  const [filter, setFilter] = useState([]);
  const [list, setList] = useState([]);

  const getRandomUser = async () => {
    const res = await fetch(url);
    const randUser = await res.json();
    setList(randUser.results);
    setFilter(randUser.results);
  };

  useEffect(() => {
    getRandomUser();
  }, []);

  const setfilter = (gender) => {
    let filter = [];
    if (gender === "male") {
      list.map((user) => {
        if (user.gender === gender) {
          filter.push(user);
        }
      });
    } else if (gender === "female") {
      list.map((user) => {
        if (user.gender === gender) {
          filter.push(user);
        }
      });
    } else {
      list.map((user) => {
        filter.push(user);
      });
    }
    setFilter(filter);
  };

  const [theme, setTheme] = useState(themes.light);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <UserContext.Provider value={filter}>
      <ThemeContext.Provider value={theme}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.foreground }]}>
              Users
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View
            style={[styles.listbutton, { backgroundColor: theme.background }]}
          >
            <View style={styles.button}>
              <Button
                onPress={() => setfilter("all")}
                title="all"
                color="#5B4B8A"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={() => setfilter("male")}
                title="male"
                color="#5B4B8A"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={() => setfilter("female")}
                title="female"
                color="#5B4B8A"
              />
            </View>
          </View>
          <ListUsers />
          <StatusBar style="auto" />
        </View>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

function ListUsers() {
  return <ListUser />;
}

function ListUser() {
  const theme = useContext(ThemeContext);
  const list = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={[styles.scroll, { backgroundColor: theme.background }]}
      >
        {/* <Text>{list.length && JSON.stringify(list[0])}</Text> */}
        {list.map((data) => {
          const {
            name: { title, first, last },
            location: {
              street: { number, name },
              city,
              country,
            },
            email,
            login: { uuid },
            picture: { medium },
          } = data;
          return (
            <View key={uuid} style={styles.box}>
              <Image
                style={styles.image}
                source={{
                  uri: medium,
                }}
              />
              <View>
                <Text style={styles.name}>
                  {title}. {first}
                  {last}
                </Text>
                <Text>
                  {number} {name}, {city}, {country}
                </Text>
                <Text style={styles.email}>{email}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#5F4E31",
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  scroll: {
    backgroundColor: "#C2B8A3",
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  image: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 5,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  email: {
    color: "blue",
  },

  box: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  listbutton: {
    flexDirection: "row",
    paddingBottom: 5,
    paddingTop: 5,
  },

  button: {
    flex: 4,
    padding: 5,
  },
});
