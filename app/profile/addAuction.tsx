/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "@/components/button";
import Welcome from "@/components/category/welcome";
import Input from "@/components/input";
import { useAuctionCreation } from "@/context/AuctionContex";
import { AuctionItem } from "@/types/type";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const AddAuction = () => {
  const { formatTime, categorys, SetAuctions } = useAuctionCreation();
  const router = useRouter();

  const [inputDate, setInputDate] = useState<string>("");
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startingPrice, setStartingPrice] = useState<string>("");
  const [estimatedPrice, setEstimatedPrice] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const selectedDate = new Date(inputDate);

  const createAuction = () => {
    if (
      !name ||
      !description ||
      !startingPrice ||
      !estimatedPrice ||
      !inputDate ||
      !image ||
      !category
    ) {
      return null;
    }

    if (selectedDate <= new Date()) {
      alert("Please select a future date and time");
      return;
    }

    const timeDiff = Math.floor(
      (selectedDate.getTime() - new Date().getTime()) / 1000
    );

    const data: AuctionItem = {
      name,
      description,
      startingPrice,
      estimatedPrice,
      timeLeft: timeDiff,
      image,
      category,
      by: "wetwan",
      id: String(Math.floor(Math.random() * 3030392083208)),
    };

    // Optionally: setLoading(true);
    console.log("Auction created:", data);
    SetAuctions((prev) => [...prev, data]);

    router.push("/(tabs)/auction");
  };

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((endTime.getTime() - now.getTime()) / 1000); // in seconds

      if (diff <= 0) {
        setTimeLeft(0);
        setEndTime(null); // remove the item
        clearInterval(interval);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <>
      <Welcome title="add your auction" onpress={() => router.back()} />

      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: "outfit", color: "gray" }}>
          Fill thhe form with the details you want in your Auction
        </Text>
        <Pressable style={{ marginTop: 10 }} onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
          ) : (
            <Image
              source={require("../../assets/images/camera.png")}
              style={{ width: 100, height: 100 }}
            />
          )}
        </Pressable>

        <Input
          value={name}
          onChangeText={setName}
          placeholder="Auction Name"
          containerStyle={styles.inputStyle}
          inputStyle={{ color: "black" }}
        />
        <Input
          value={description}
          onChangeText={setDescription}
          placeholder="Auction Description"
          containerStyle={styles.inputStyle}
        />

        <Input
          value={startingPrice}
          onChangeText={setStartingPrice}
          placeholder="Auction Starting Price"
          containerStyle={styles.inputStyle}
          keyboardType="number-pad"
        />
        <Input
          value={estimatedPrice}
          onChangeText={setEstimatedPrice}
          placeholder="Auction Estimated Price"
          containerStyle={styles.inputStyle}
          keyboardType="number-pad"
        />

        <Input
          value={inputDate}
          onChangeText={setInputDate}
          placeholder="Enter end date e.g. 2025-07-20 15:00:00"
          containerStyle={styles.inputStyle}
        />
        <View style={styles.inputStyle}>
          <RNPickerSelect
            value={category}
            onValueChange={(value) => setCategory(value)}
            items={categorys}
          />
        </View>

        <Button
          // disabled={!loading}
          variant="ghost"
          title={loading ? "Uploading Auction" : "Create Auction "}
          onPress={createAuction}
          style={{ borderColor: "#B6CA1B", marginTop: 20 }}
        />
      </View>
    </>
  );
};

export default AddAuction;

const styles = StyleSheet.create({
  containerStyles: {},
  inputStyle: {
    width: Dimensions.get("window").width * 0.9,
    marginTop: 10,
    backgroundColor: "white",
    margin: "auto",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#B6CA1B",
    borderRadius: 8,
    color: "black",
    fontFamily: "outfit",
  },
});
