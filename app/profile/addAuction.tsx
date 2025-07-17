/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "@/components/button";
import Welcome from "@/components/category/welcome";
import Input from "@/components/input";
import { db } from "@/config/firebase";
import { useAuctionCreation } from "@/context/AuctionContex";
import { useUser } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const AddAuction = () => {
  const { formatTime, categorys } = useAuctionCreation();
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

  const { user } = useUser();

  const uploadToCloudinary = async (imageUri: string) => {
    const data = new FormData();

    data.append("file", {
      uri: imageUri,
      type: "image/jpeg", // or "image/png"
      name: "upload.jpg",
    } as any);
    data.append("image", imageUri);
    data.append("upload_preset", "martin");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlu80k3sn/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const json = await res.json();
      console.log("✅ Cloudinary upload success:", json);
      return json.secure_url; // This is the URL of the uploaded image
    } catch (err) {
      console.error("❌ Cloudinary upload failed:", err);
      return null;
    }
  };

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
  const createAuction = async () => {
    if (
      !name ||
      !description ||
      !startingPrice ||
      !estimatedPrice ||
      !inputDate ||
      !image ||
      !category
    ) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    const selectedDate = new Date(inputDate);
    if (selectedDate <= new Date()) {
      alert("Please select a future date and time");
      return;
    }

    const timeDiff = Math.floor(
      (selectedDate.getTime() - new Date().getTime()) / 1000
    );

    try {
      setLoading(true);
      const uploadedImageUrl = await uploadToCloudinary(image);
      if (!uploadedImageUrl) {
        Alert.alert("Image upload failed.");
        setLoading(false);
        return;
      }
      await addDoc(collection(db, "auction"), {
        name,
        description,
        startingPrice: Number(startingPrice),
        estimatedPrice: Number(estimatedPrice),
        timeLeft: timeDiff,
        image: uploadedImageUrl,
        category,
        by: user?.firstName,
        createdAt: Timestamp.now(),
      });

      router.push("/(tabs)/auction");
    } catch (error) {
      console.error("Error creating auction:", error);
      Alert.alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
