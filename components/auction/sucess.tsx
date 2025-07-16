import { images } from "@/assets/images";
import { AuctionItem } from "@/types/type";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Button from "../button";

interface BiddingButtonProp {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  auction: AuctionItem;
}
const Sucess = ({ setSuccess, auction }: BiddingButtonProp) => {
  const { width } = Dimensions.get("window");

  const router = useRouter();
  return (
    <View
      style={{
        position: "absolute",
        top: "40%",
        // left: "15%",
        transform: [{ translateX: 50 }, { translateY: -50 }],
        zIndex: 200,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: width * 0.8,
        borderColor: "#B6CA1B",
        borderWidth: 0.4,
        elevation: 10,
      }}
    >
      <Image
        source={images.success}
        style={{ width: 100, height: 100, marginHorizontal: "auto" }}
      />
      <Text
        style={[
          styles.basicText,
          {
            textTransform: "capitalize",
            fontFamily: " outfit-bold",
            textAlign: "center",
            fontSize: 20,
            marginBlock: 10,
          },
        ]}
      >
        successfull
      </Text>

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 15,
          width: "80%",
          textAlign: "center",
        }}
      >
        You have successful bid on{" "}
        <Text style={{ fontFamily: "outfit-bold" }}>item {auction.id} </Text>{" "}
        name {""}
        {auction.name} posted by {auction.by}, if you win the bid you will be
        contacted.
      </Text>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Button
          title="bid"
          onPress={() => {
            setSuccess(false);
            router.replace("/(tabs)/auction");
          }}
          variant="block"
          style={{ backgroundColor: "#B6CA1B", width: "80%" }}
        />
        <Button
          title="go back home"
          onPress={() => {
            setSuccess(false);
            router.replace("/(tabs)");
          }}
          variant="ghost"
          style={{ backgroundColor: "", width: "80%", borderWidth: 0 }}
        />
      </View>
    </View>
  );
};

export default Sucess;

const styles = StyleSheet.create({
  basicText: { fontFamily: "outfit" },
  basicView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
