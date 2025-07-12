import { AuctionItem } from "@/types/type";
import React from "react";
import { Image, Text, View } from "react-native";
import Button from "../button";

interface AuctionItemProp {
  formatTime: (time: any) => string;
  auction: AuctionItem;
}

const AuctionItems = ({ formatTime, auction }: AuctionItemProp) => {
  return (
    <View
      style={{
        padding: 15,
        borderWidth: 1,
        borderColor: "#A2C570",
        margin: 10,
        backgroundColor: "#A2C570",
        borderRadius: 10,
      }}
    >
      <Image
        source={auction.image}
        style={{ height: 150, width: 150, borderRadius: 30 }}
      />
      <View>
        <Text style={{ color: "pink" }}></Text>
        <Button
          title={formatTime(auction.timeLeft)}
          onPress={() => null}
          //   variant="white"
          style={{
            alignItems: "flex-start",
            paddingBlock: 10,
          }}
        />
        <Text
          style={{
            color: "white",
            fontFamily: "outfit-medium",
            textTransform: "uppercase",
          }}
        >
          {auction.name}
        </Text>
      </View>
      <Button
        title="Bid"
        variant="white"
        style={{ borderColor: "#A2C570" }}
        textStyle={{ color: " #A2C570" }}
        onPress={() => console.log("press Bid")}
      />
    </View>
  );
};

export default AuctionItems;
