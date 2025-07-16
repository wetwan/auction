import { auction } from "@/assets/constant/auction";
import Welcome from "@/components/category/welcome";
import { AuctionItem } from "@/types/type";
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
  // const { auctions } = useAuctionCreation();
  const [auctions, setAuction] = useState<AuctionItem[]>([]);
  const router = useRouter();

  const [myAuction, setMyAuction] = useState<AuctionItem[]>([]);
  useEffect(() => {
    const getAuction = async () => {
      setAuction(auction);
    };

    getAuction();
  }, [auctions]);
  console.log(myAuction);
  useEffect(() => {
    const getMyAuction = async () => {
      const datas = auctions.filter((d) => d.by === "ridwan");
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
              <Image source={item.image} style={{ width: 160, height: 150 }} />
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
