import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";

const SignUp = () => {
  const { width } = Dimensions.get("window");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
      <View style={{ marginTop: 100 }}>
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 25, marginLeft: 40 }}
        >
          Thanks for joining us
        </Text>
        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Input
            containerStyle={{
              width: width * 0.8,
              marginInline: "auto",
            }}
            placeholder="first name"
            label="First Name"
            labelStye={{ marginInline: 10 }}
            inputStyle={{
              borderWidth: 1,
              padding: 16,
              marginTop: 10,
              fontSize: 18,
              borderRadius: 20,
            }}
            keyboardType="default"
            value={firstname}
            onChangeText={(text) => setFirstname(text)}
          />
          <Input
            containerStyle={{
              width: width * 0.8,
              marginInline: "auto",
            }}
            placeholder="Email"
            label="Email"
            labelStye={{ marginInline: 10 }}
            inputStyle={{
              borderWidth: 1,
              padding: 16,
              marginTop: 10,
              fontSize: 18,
              borderRadius: 20,
            }}
            keyboardType="default"
            value={lastname}
            onChangeText={(text) => setLastname(text)}
          />
          <Input
            containerStyle={{
              width: width * 0.8,
              marginInline: "auto",
            }}
            placeholder="Email"
            label="Email"
            labelStye={{ marginInline: 10 }}
            inputStyle={{
              borderWidth: 1,
              padding: 16,
              marginTop: 10,
              fontSize: 18,
              borderRadius: 20,
            }}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            containerStyle={{
              width: Dimensions.get("window").width * 0.8,
              marginInline: "auto",
            }}
            placeholder="password"
            label="password"
            labelStye={{ marginInline: 10 }}
            inputStyle={{
              borderWidth: 1,
              padding: 16,
              marginTop: 10,
              fontSize: 18,
              borderRadius: 20,
            }}
            keyboardType="default"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button
            variant="regular"
            title="sign up"
            style={{
              width: Dimensions.get("window").width * 0.8,
              marginInline: "auto",
              marginTop: 20,
              backgroundColor: "#B6CA1B",
            }}
            textStyle={{ color: "#fff", fontSize: 18 }}
            onPress={() => console.log("signin")}
          />
          <Button
            variant="ghost"
            title="sign in"
            style={{
              width: Dimensions.get("window").width * 0.8,
              marginInline: "auto",
              marginTop: 20,
            }}
            textStyle={{ color: "#000", fontSize: 18 }}
            onPress={() => router.push("/")}
          />
        </View>
      </View>
    </View>
  );
};

export default SignUp;
