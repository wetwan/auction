import Button from "@/components/button";
import Input from "@/components/input";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";

const SignUp = () => {
  const { width } = Dimensions.get("window");
  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: firstname,
        lastName: lastname,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };


  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={{ padding: 20, margin: 20, marginTop: 100 }}>
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 25, marginLeft: 40 }}
        >
          Verify your email
        </Text>
        <Input
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
          containerStyle={{
            width: width * 0.8,
            marginInline: "auto",
          }}
          label="verification code"
          labelStye={{ marginInline: 10 }}
          inputStyle={{
            borderWidth: 1,
            padding: 16,
            marginTop: 10,
            fontSize: 18,
            borderRadius: 20,
          }}
        />
        <Button
          onPress={onVerifyPress}
          title="verfiy"
          style={{
            width: Dimensions.get("window").width * 0.8,
            marginInline: "auto",
            marginTop: 20,
            backgroundColor: "#B6CA1B",
          }}
          textStyle={{ color: "#fff", fontSize: 18 }}
        />
      </View>
    );
  }

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
            placeholder="First name"
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
            placeholder="Last name"
            label="Last name"
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
            onPress={onSignUpPress}
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
