import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { Button, TextInput, Card, Avatar, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import UserContext from "../contexts/UserContext";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const ucontext = useContext(UserContext);

  const HandleRegister = () => {
    axios
      .post("http://localhost:4444/user/register", { email, password, name })
      .then((reply) => {
        if (reply.data != null) {
          alert("Registration successful");
          props.navigation.navigate("Login");
        } else {
          alert("Registration failed");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome....! {ucontext}</Text>
      <Text style={styles.title}>Register</Text>
      <View>
        <TextInput
          label={"Enter your Name"}
          mode="outlined"
          onChangeText={(text) => {
            setName(text);
          }}
        />

        <TextInput
          label={"Enter your Email"}
          mode="outlined"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />

        <TextInput
          label={"Enter your Password"}
          mode="outlined"
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>

      <View>
        <Button onPress={HandleRegister}>Register</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Register;
