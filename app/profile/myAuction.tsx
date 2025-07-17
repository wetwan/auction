import Welcome from "@/components/category/welcome";
import { useAuctionCreation } from "@/context/AuctionContex";
import { AuctionItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MyAuction = () => {
  const { auctions } = useAuctionCreation();
  // const [auctions, setAuction] = useState<AuctionItem[]>([]);
  const router = useRouter();
  const { user } = useUser();
  const [myAuction, setMyAuction] = useState<AuctionItem[]>([]);

  useEffect(() => {
    const getMyAuction = async () => {
      const datas = auctions.filter((d) => d.by === user?.firstName);
      setMyAuction(datas);
    };

    getMyAuction();
  }, [auctions]);

  return (
    <View>
      <Welcome title="my auction" onpress={() => router.back()} />
      <View style={{ padding: 20 }}>
        <Text
          style={{
            color: "gray",
            fontFamily: "outfit-medium",
            fontSize: 18,
            textTransform: "uppercase",
          }}
        >
          List of auctions I have posted
        </Text>

        <FlatList
          data={myAuction}
          numColumns={2}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => (
            <Pressable
              style={{ margin: 10, borderRadius: 9, overflow: "hidden" }}
              onPress={() => {
                router.push({
                  pathname: "/(auction)/[auctionId]",
                  params: { auctionId: item.id as string },
                });
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 160, height: 150 }}
              />
              <View style={{ backgroundColor: "white", padding: 10 }}>
                <Text style={[styles.basictext]}>{item.name}</Text>
                <Text
                  style={[
                    styles.basictext,
                    {
                      padding: 5,
                      backgroundColor: "green",
                      width: "70%",
                      marginTop: 5,
                      color: "white",
                      borderRadius: 3,
                      fontSize: 13,
                    },
                  ]}
                >
                  {item.category}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default MyAuction;

const styles = StyleSheet.create({
  basictext: {
    fontFamily: "outfit",
    fontSize: 15,
    textTransform: "capitalize",
  },
});
