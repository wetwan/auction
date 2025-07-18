import Button from "@/components/button";
import Input from "@/components/input";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";

const LogIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const { width } = Dimensions.get("window");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      <View style={{ marginTop: 150 }}>
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 30, marginLeft: 40 }}
        >
          Welcome back
        </Text>
        <View style={{ marginTop: 20, alignItems: "center" }}>
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
              padding: 20,
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
              padding: 20,
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
            title="sign in"
            style={{
              width: Dimensions.get("window").width * 0.8,
              marginInline: "auto",
              marginTop: 20,
              backgroundColor: "#B6CA1B",
            }}
            textStyle={{ color: "#fff", fontSize: 18 }}
            onPress={onSignInPress}
          />
          <Button
            variant="ghost"
            title="sign up"
            style={{
              width: Dimensions.get("window").width * 0.8,
              marginInline: "auto",
              marginTop: 20,
            }}
            textStyle={{ color: "#000", fontSize: 18 }}
            onPress={() => router.push("/signup")}
          />
        </View>
      </View>
    </View>
  );
};

export default LogIn;
