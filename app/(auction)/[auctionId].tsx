import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Auction = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Auction {id}</Text>
    </View>
  );
};

export default Auction;
