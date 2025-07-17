import { db } from "@/config/firebase";
import { AuctionItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import Button from "../button";
import Input from "../input";

interface BiddingButtonProp {
  bidding: boolean;
  setBidding: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  auction: AuctionItem | undefined;
}
const BiddingButton = ({
  bidding,
  setBidding,
  auction,
  setSuccess,
}: BiddingButtonProp) => {
  const { width } = Dimensions.get("window");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const addBid = async () => {
    if (!auction?.id) {
      Alert.alert("Food item ID is missing.");
      return;
    }
    setLoading(true);
    try {
      const docRef = doc(db, "auction", auction.id);
      await updateDoc(docRef, {
        bids: arrayUnion({
          bid: Number(value),
          userId: user?.id,
          userName: user?.fullName,
          time: Timestamp.now(),
        }),
      });

      setBidding(false);
      setValue("");
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      Alert.alert(JSON.stringify(error));
      console.log(error);
    }
  };

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
      <Text
        style={[
          styles.basicText,
          {
            textTransform: "capitalize",
            fontFamily: "outfit-bold",
            textAlign: "center",
            fontSize: 20,
            marginBlock: 20,
          },
        ]}
      >
        place your bid
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBlock: 10,
        }}
      >
        <Text
          style={[
            styles.basicText,
            { textTransform: "capitalize", fontFamily: "outfit-medium" },
          ]}
        >
          starting bid
        </Text>
        <Text
          style={[
            styles.basicText,
            { textTransform: "capitalize", fontFamily: "outfit-bold" },
          ]}
        >
          $ {auction?.startingPrice}
        </Text>
      </View>
      <View
        style={{
          width: "80%",
          borderWidth: 0.6,
          borderColor: "gray",
          marginHorizontal: "auto",
          marginBlock: 10,
        }}
      />
      <Text style={[styles.basicText, { textTransform: "capitalize" }]}>
        place your bid
      </Text>
      <Input
        placeholder="Enter your bid"
        inputStyle={{
          borderWidth: 1,
          padding: 15,
          textTransform: "capitalize",
          borderRadius: 200,
          borderBlockColor: "green",
        }}
        keyboardType="numeric"
        value={value}
        onChangeText={(t) => setValue(t)}
        containerStyle={{
          width: "90%",
          marginHorizontal: "auto",
          marginVertical: 10,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          title="cancel"
          onPress={() => setBidding(false)}
          variant="ghost"
        />
        {loading ? (
          <Button
            title="Bidding"
            onPress={() => null}
            disabled={loading}
            variant="block"
            style={{ backgroundColor: "#B6CaaB", width: "60%" }}
          />
        ) : (
          <Button
            title="bid"
            onPress={addBid}
            disabled={!value || loading}
            variant="block"
            style={{
              backgroundColor: "#B6CA1B",
              width: "60%",
            }}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  basicText: { fontFamily: "outfit" },
  basicView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default BiddingButton;
